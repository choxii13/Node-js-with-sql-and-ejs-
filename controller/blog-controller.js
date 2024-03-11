const Blog = require("../model/blog-model");

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
  const [myBlog] = await blogs.getBlog();

  const newBlogs = {
    ...myBlog[0],
    date: myBlog[0].date.toISOString,
    newDate: myBlog[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  if (myBlog.length === 0 || !myBlog) {
    return res.render("404");
  }
  res.render("post-detail", { blog: newBlogs });
}

async function getBlogUpdate(req, res) {
  const blogs = new Blog(null, null, null, null, req.params.id);
  const getBlogUpdate = await blogs.getBlogUpdate();

  if (getBlogUpdate.length === 0 || !getBlogUpdate) {
    return res.render("404");
  }

  res.render("update-post", { blog: getBlogUpdate[0] });
}

async function postBlogUpdate(req, res) {
  const blogs = new Blog(null, null, null, null, req.params.id);
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
