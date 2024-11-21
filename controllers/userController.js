const User = require('../models/userModel');
const db = require('../db');
const { body, validationResult } = require('express-validator');

exports.register = ([body('first_name').notEmpty(), body('last_name').notEmpty(), body('usernname').notEmpty(), body('email').isEmail().withMessage('Must be an email.'), body('password').isLength({ min: 6 }).withMessage('Must be min 6 chars.')], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.render('/register', { errors: errors.array() } );
    }
    User.create(req.body, (err) => {
        if (err) return res.send('Error creating user');
        console.log('User created: ', req.body);
        res.redirect('/login');
    });

});

exports.login = (req, res) => {
    const {username, password} = req.body; 
    console.log('Username:', req.body)
    User.findByUsername(username, (err, user) => {
        if (err) {
            return res.send('Error.', err.message);
        } else if (!user) {
            return res.send('User not found.');
        } else if (user.password !== password) {
            return res.send('Invalid password.');
        }
        const session_id = req.session.userId = user.id;
        console.log('Found user:', user)
        console.log('Match, logged in');
        console.log('Session ID:', session_id);
        res.redirect('/blogs');
    });
};