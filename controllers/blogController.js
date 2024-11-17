const Blog = require('../models/blogModel');
const db = require('../db');

exports.renderBlogs = (req, res) => {
  const userId = req.session.userId;
  if(!userId) {
    console.log('no sessions id sent.')
    return res.redirect('/login');
  }
  Blog.findAll(userId, (err, blogs) => {
    if (err) {
      console.log('error retreiving blogs', err.message);
      return res.status(500).send('error loading users blogs.');
    }
    //success
    console.log('Blogs found.');

    res.render('blogs', {blogs, user_id: req.session.userId });
  })
}

exports.getAllBlogs = (req, res) => {
  Blog.findAll((err, blogs) => {
    if (err) return res.send('Error getting blogs');
    res.render('/blogs,', {blogs});
  });
};

exports.createBlog = (req, res) => {
  const userId = req.session.userId;
  if(!userId){
    console.log('No active session.')
    return res.redirect('/login');
  }
  const { title, body } = req.body;
  Blog.create(title, body, userId, (err) => {
    if (err) { 
      return res.send('Error creating blog');
  }
  res.redirect('/blogs');
  });
};

exports.getBlog = (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err || !blog) return res.send('blog not found.');
    res.render('/blog');
  })
}

exports.updateBlog = (req, res) => {
  Blog.update(req.params, req.body, (err) => {
    if (err) return res.send('error updating blog.');
    res.redirect('/blogs');
  });
};

exports.deleteBLog = (req, res) => {
  Blog.delete(req.params.id, (err) => {
    if (err) return res.send('Could not delete blog');
    res.redirect('/blogs');
  });
};