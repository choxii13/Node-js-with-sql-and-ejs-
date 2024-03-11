const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog-controller");

router.get("/", blogController.getHome);

router.get("/posts", blogController.getBlogs);

router.get("/new-post", blogController.getAuthors);

router.post("/new-post", blogController.postBlog);

router.get("/posts/:id", blogController.getBlog);

router.get("/posts/:id/update-post", blogController.getBlogUpdate);

router.post("/posts/:id/update-post", blogController.postBlogUpdate);

router.post("/posts/:id/delete", blogController.deleteBlog);

module.exports = router;
