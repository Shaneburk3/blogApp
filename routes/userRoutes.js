const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');


//get register, send message that will be altered to display an error when registering.
router.get('/register', (req, res) => res.render('users/register', { errors: null }));

router.post('/register', [ body('first_name').notEmpty().escape().withMessage('can not input special characters.'),
    body('last_name').notEmpty().escape().withMessage('can not input special characters.'),
    body('username').notEmpty().escape().withMessage('can not input special characters.'),
    body('email').isEmail().withMessage('Must be an email.').escape(),
    body('password').isLength({ min: 6 }).withMessage('Must be min 6 chars.').isLength({ max: 70 }).withMessage("Too Long.")], userController.registerValidate);

router.get('/login', (req, res) => res.render('users/login', { errors: null }));

router.post('/login', [body('username').escape().isLength({ max: 20 }),
body('password').isLength({ min: 6 }).withMessage('Must be min 6 chars.').isLength({ max: 70 }).withMessage("Too Long.")
], userController.loginValidate);

module.exports = router;