const express = require("express");
const {
	getAllBlogs,
	getSingleBlog,
	updateBlog,
	createBlog,
	deleteBlog,
	getPersonalBlog,
} = require("../controllers/blog.controller");
const userAuthenticationMiddleware = require("../middlewares/auth.middleware");
const blogAuthenticationMiddleware = require("../middlewares/blogAuth.middleware");
const router = express.Router();

router
	.route("/")
	.get(getAllBlogs)
	.post(userAuthenticationMiddleware, createBlog);
router.route("/personal").get(userAuthenticationMiddleware, getPersonalBlog);
router
	.route("/:id")
	.get(getSingleBlog)
	.patch(
		userAuthenticationMiddleware,
		blogAuthenticationMiddleware,
		updateBlog,
	)
	.delete(
		userAuthenticationMiddleware,
		blogAuthenticationMiddleware,
		deleteBlog,
	);

module.exports = router;
