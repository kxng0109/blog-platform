const { StatusCodes } = require("http-status-codes");
const Blog = require("../models/blog.model");

const blogAuthentication = async (req, res, next) => {
	const { userID } = req.user;
	const { id: blogId } = req.params;
	req.user.blogId = blogId;
	const requestType = req.method === "PATCH" ? "update" : req.method;
	if (!blogId) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: `Provide an id for the blog` });
	}

	const blogPost = await Blog.findById(blogId).select("userID");
	if (!blogPost) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: `Could not find blog with id: ${blogId}` });
	}
	if (blogPost.userID !== userID) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			msg: `You do not have the permission to ${requestType.toLowerCase()} this post`,
		});
	}
	next();
};

module.exports = blogAuthentication;
