const getAllBlogs = async (req, res) => {
	res.send("Get all blogs");
};

const getSingleBlog = async (req, res) => {
	res.send("Get single blog");
};

const updateBlog = async (req, res) => {
	res.send("Update blog");
};

const createBlog = async (req, res) => {
	res.send("Psot blog");
};

const deleteBlog = async (req, res) => {
	res.send("Delete blog");
};

module.exports = {
	getAllBlogs,
	getSingleBlog,
	updateBlog,
	createBlog,
	deleteBlog,
};
