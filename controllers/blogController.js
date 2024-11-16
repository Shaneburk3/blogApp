const { getBlogsByUserId, createBlog, getBlogById, updateBlog, deleteBlog } = require('../models/blogModel');

// List blogs for the logged-in user
const listBlogs = (req, res) => {
  const userId = req.session.user.id;

  getBlogsByUserId(userId, (err, blogs) => {
    if (err) return res.status(500).send('Error getting blogs.');
    res.render('index', { blogs });
  });
};

// Other CRUD methods here...

module.exports = { listBlogs };