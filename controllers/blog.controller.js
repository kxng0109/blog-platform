const { StatusCodes } = require("http-status-codes");
const Blog = require("../models/blog.model");

const getAllBlogs = async (req, res) => {
	const blog = await Blog.find({});
	res.status(StatusCodes.OK).json({ blog });
};

const getSingleBlog = async (req, res) => {
	//Note random people can get the blog id just by randomly generating an id that just happens to be the id of the post, fix it
	const { id: blogId } = req.params;
	if (!blogId) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: `Provide an id for the blog` });
	}

	const blog = await Blog.findById(blogId);
	if (!blog) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: `Could not find blog with id: ${blogId}` });
	}
	res.status(StatusCodes.OK).json({ blog });
};

const updateBlog = async (req, res) => {
	const { id: blogId } = req.params;
	if (!blogId) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: `Provide an id for the blog` });
	}

	const blog = await Blog.findByIdAndUpdate(blogId, {...req.body}, {
		new: true,
		runValidators: true
	});

	if (!blog) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: `Could not find blog with id: ${blogId}` });
	}
	res.status(StatusCodes.OK).json({ blog });
};

const createBlog = async (req, res) => {
	//I want to add a feature that the users id or user email is also part of the response to create the blog
	try {
		const blog = await Blog.create({ ...req.body });
		res.status(StatusCodes.CREATED).json({ blog});
	} catch (err) {
		console.log(err);
		if (err.name === "ValidationError") {
			const errorMessage = Object.keys(err.errors).map(
				(item) => `The ${item} cannot be less than 3 characters`,
			);
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: errorMessage });
		}
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
		console.log(err);
	}
};

const deleteBlog = async (req, res) => {
	//Don't forget to do it such that people can't just randomly delete someone else's post just by using a random id that just happens to be the id of the blog
	const { id: blogId } = req.params;
	if (!blogId) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: `Provide an id for the blog` });
	}

	const blog = await Blog.findByIdAndDelete(blogId);
	if (!blog) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: `Could not find blog with id: ${blogId}` });
	}
	res.status(StatusCodes.OK).json({ msg: "Blog post has been deleted" });
};

module.exports = {
	getAllBlogs,
	getSingleBlog,
	updateBlog,
	createBlog,
	deleteBlog,
};
