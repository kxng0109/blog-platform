const express = require("express");
const {
	getAllBlogs,
	getSingleBlog,
	updateBlog,
	createBlog,
	deleteBlog,
} = require("../controllers/blog.controller");
const router = express.Router();

router.route("/").get(getAllBlogs);
router
	.route("/:id")
	.get(getSingleBlog)
	.patch(updateBlog)
	.post(createBlog)
	.delete(deleteBlog);

module.exports = router;
