const express = require("express");
const {
	getAllBlogs,
	getSingleBlog,
	updateBlog,
	createBlog,
	deleteBlog,
} = require("../controllers/blog.controller");
const authenticationMiddleware = require("../middlewares/auth.middleware");
const blogAuthentication = require("../middlewares/blogAuth.middleware");
const router = express.Router();


router.route("/").get(getAllBlogs).post(authenticationMiddleware, createBlog);
router.route("/:id").get(getSingleBlog).patch(authenticationMiddleware, blogAuthentication, updateBlog).delete(authenticationMiddleware, blogAuthentication,deleteBlog);

module.exports = router;
