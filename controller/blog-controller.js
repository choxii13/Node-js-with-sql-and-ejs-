const Blog = require("../model/blog-model");
const dateFormat = require("../utils/data-format");

function getHome(req, res) {
  res.redirect("posts");
}

async function getBlogs(req, res) {
  const blogs = await Blog.fetchAll();
  res.render("posts-list", { blogs });
}

async function getAuthors(req, res) {
  const authors = await Blog.fetchAuthors();
  res.render("create-post", { authors });
}

async function postBlog(req, res) {
  const blogs = new Blog(
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
    null
  );
  await blogs.postBlog();
  res.redirect("/posts");
}

async function getBlog(req, res) {
  const blogs = new Blog(null, null, null, null, req.params.id);
  const myBlog = await blogs.getBlog();
  let newBlog = myBlog;
  if (newBlog) {
    newBlog = dateFormat(myBlog);
  }
  res.render("post-detail", { blog: newBlog });
}

async function getBlogUpdate(req, res) {
  const blogs = new Blog(null, null, null, null, req.params.id);
  const getBlogUpdate = await blogs.getBlogUpdate();
  res.render("update-post", { blog: getBlogUpdate });
}

async function postBlogUpdate(req, res) {
  const { title, summary, content } = req.body;
  const blogs = new Blog(title, null, summary, content, req.params.id);
  await blogs.postBlogUpdate();
  res.redirect("/posts");
}

async function deleteBlog(req, res) {
  const blogs = new Blog(null, null, null, null, req.params.id);
  await blogs.deleteBlog();
  res.redirect("/posts");
}

module.exports = {
  getHome,
  getBlogs,
  getAuthors,
  postBlog,
  getBlog,
  getBlogUpdate,
  postBlogUpdate,
  deleteBlog,
};
