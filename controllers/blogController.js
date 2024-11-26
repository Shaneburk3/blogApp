const Blog = require('../models/blogModel');
const db = require('../db');
const { validationResult } = require('express-validator');


//if there is a valid session key, blogModel is called to get all blogs with user ID.
exports.renderBlogs = (req, res) => {
  const errors = validationResult(req);

  const userId = req.session.userId;
  if (!userId) {
    console.log('[ERROR]: no session id sent.')
    return res.redirect('/login');
  }
  Blog.findAll(userId, (err, blogs) => {
    if (err) {
      console.log(`[ERROR]: Could not retrieve blog:`, err.message);
      return res.status(500).send('error loading users blogs.');
    }
    //success
    console.log(`[INFO]: Blogs retrieved for user with ID: ${userId}`)
    res.render('blogs', { blogs, user_id: req.session.userId });
  })
}

//Validator checks new blog, if OK, blog is created.
exports.createBlog = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    console.log('[SECURITY]: Create Validation Errors:', errors.array());
    return res.render('blogs', { errors: errors.array() }); }
  let userId = req.session.userId;

  if (!userId) {
    console.log('[ERROR]: No active session, cannot create blog.')
    return res.redirect('/login');
  }
  const { title, body } = req.body;
  Blog.create(title, body, userId, (err) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    console.log('[SECURITY]: Create Validation Errors:', errors.array());
    return res.render('[INFO] Creare blog errors:', { errors: errors.array() }); }
    if (err) {
      console.log(`[ERROR]: Cannot create blog: ${title}`)
      return res.send(err);
    }
    console.log('[INFO]: Blog Created.')
    res.redirect('/blogs');
  });
};

exports.getBlog = (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err || !blog) {
      console.log(`[ERROR]: Cannot get blogs for ID: ${req.params.id}`)
      return res.send('blog not found.');
    }  
    res.render('/blog');
  })
}

exports.updateBlog = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    console.log('[SECURITY]: Update Request Validation Errors:', errors.array());
    return res.render('blogs', { errors: errors.array() }); }
  Blog.update(req.params, req.body, (err) => {
    if (err) return res.send('error updating blog.');
    res.redirect('/blogs');
  });
};

exports.deleteBlog = (req, res) => {
  const { id, title } = req.body
  Blog.delete(id, (err) => {
    console.log('Deleting blog with id:', id)
    if (err) return res.send('Could not delete blog');
    res.redirect('/blogs');
  });
};