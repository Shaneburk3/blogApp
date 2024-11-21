const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { body, validationResult } = require('express-validator');

// trim input, .escape() special characters eliminates XSS attacks
router.get('/', blogController.renderBlogs);
router.get('/blogs', blogController.renderBlogs);


router.post('/create', blogController.createBlog);

router.get('/update', (req, res) => res.render('users/update'));
router.post('/update', blogController.updateBlog);

router.get('/delete', (req, res) => res.render('users/delete'));
router.post('/delete', blogController.deleteBlog)



router.get('/:id', blogController.getBlog);
router.post('/:id/edit', blogController.updateBlog);
router.post('/:id/deleteBlog', blogController.deleteBlog);

module.exports = router;