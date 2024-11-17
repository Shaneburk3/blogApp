const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.renderBlogs);
router.get('/blogs', blogController.getAllBlogs);


router.post('/create', blogController.createBlog);

router.get('/:id', blogController.getBlog);
router.post('/:id/edit', blogController.updateBlog);
router.post('/:id/deleteBlog', blogController.deleteBLog);

module.exports = router;