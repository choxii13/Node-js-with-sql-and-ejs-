const express = require("express");
const router = express.Router();
const db = require("../data/database");
router.get("/", function (req, res) {
  res.redirect("posts");
});

router.get("/posts", async function (req, res) {
  const query = `SELECT posts.*, 
  authors.name FROM posts INNER JOIN authors 
  ON posts.author_id = authors.id`;
  const [blogs] = await db.query(query);
  res.render("posts-list", { blogs: blogs });
});

router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("SELECT * FROM blog.authors");
  res.render("create-post", { authors: authors });
});

router.post("/new-post", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(
    "INSERT INTO blog.posts (title, summary, body, author_id) VALUES (?)",
    [data]
  );
  res.redirect("/posts");
});

router.get("/posts/:id", async function (req, res) {
  const params = req.params.id;
  const query = `SELECT posts.*, 
    authors.name FROM posts INNER JOIN authors 
    ON posts.author_id = authors.id WHERE posts.id = ${params}`;

  const [blogs] = await db.query(query);

  const newBlogs = {
    ...blogs[0],
    date: blogs[0].date.toISOString,
    newDate: blogs[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  if (blogs.length === 0 || !blogs) {
    return res.render("404");
  }
  res.render("post-detail", { blog: newBlogs });
});

router.get("/posts/:id/edit", async function (req, res) {
  const params = req.params.id;
  const query = `SELECT posts.*, authors.name
   FROM posts INNER JOIN authors 
      ON posts.author_id = authors.id WHERE posts.id = ${params}`;
  const [blogs] = await db.query(query);
  if (blogs.length === 0 || !blogs) {
    return res.render("404");
  }
  res.render("update-post", { blog: blogs[0] });
});

router.post("/posts/:id/edit", async function (req, res) {
  const query = `UPDATE posts SET title = ?, summary = ?, body = ? WHERE id = ?`;
  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id,
  ]);
  res.redirect("/posts");
});

router.post("/posts/:id/delete", async function (req, res) {
  const query = `DELETE FROM posts WHERE id = ?`;
  await db.query(query, [req.params.id]);
  res.redirect("/posts");
});

module.exports = router;
