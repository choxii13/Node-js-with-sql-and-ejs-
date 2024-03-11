const db = require("../data/database");

class Blog {
  constructor(title, author, summary, content, id) {
    (this.title = title),
      (this.author = author),
      (this.summary = summary),
      (this.content = content);
    if (id) {
      this.id = id;
    }
  }

  static async fetchAll() {
    const query = `SELECT posts.*, 
        authors.name FROM posts INNER JOIN authors 
        ON posts.author_id = authors.id`;
    const [blogs] = await db.query(query);
    return blogs;
  }

  static async fetchAuthors() {
    const query = `SELECT * FROM blog.authors`;
    const [authors] = await db.query(query);
    return authors;
  }

  async postBlog() {
    const data = [this.title, this.author, this.summary, this.content];
    const query = `INSERT INTO blog.posts (title, summary, body, author_id) VALUES (?)`;
    const postBlogData = await db.query(query, [data]);
    return postBlogData; // not necessary
  }

  async getBlog() {
    const query = `SELECT posts.*, 
    authors.name FROM posts INNER JOIN authors 
    ON posts.author_id = authors.id WHERE posts.id = ?`;
    const blogData = await db.query(query, [this.id]);
    return blogData;
  }

  async getBlogUpdate() {
    const query = `SELECT posts.*, 
    authors.name FROM posts INNER JOIN authors 
    ON posts.author_id = authors.id WHERE posts.id = ?`;
    const getBlogUpdate = await db.query(query, [this.id]);
    return getBlogUpdate;
  }

  async postBlogUpdate() {
    const data = [this.title, this.summary, this.content, this.id];
    const query = `UPDATE posts SET title = ?, summary = ?, body = ? WHERE id = ?`;
    const postBlogUpdate = await db.query(query, data);
    return postBlogUpdate;
  }

  async deleteBlog() {
    const query = `DELETE FROM posts WHERE id = ?`;
    const deletedData = await db.query(query, [this.id]);
    return deletedData;
  }
}

module.exports = Blog;
