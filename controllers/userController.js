const User = require('../models/userModel');
const db = require('../db');
const { body, validationResult } = require('express-validator');
const enCrypt = require('bcrypt');


exports.register = (req, res) => {
    res.render('register', { errors: null });
};
    

exports.registerValidate = async (req, res) => {
    const errors = validationResult(req);
    const { first_name, last_name, username, email, password } = req.body;
    const hashedPword = await enCrypt.hash(password, 10);
    console.log('hashed password: ', hashedPword)
    console.log(errors.array())
    if (!errors.isEmpty()) { return res.render('register', { errors: errors.array()});
    }
    User.create(first_name, last_name, username, email, hashedPword, (err) => {
        if (err) return res.send('Error creating user');
        console.log('User created: ', req.body);
        res.redirect('/login');
    });

};

exports.login = (req, res) => {
    const {username, password} = req.body; 
    console.log('Username entered:', req.body)

    // Find user
    User.findByUsername(username, (err, user) => {
        if (err) {
            return res.send('Error.', err.message);
        } else if (!user) {
            return res.send('User not found.');
        } 
        //compared hashed password
        const checked = enCyrpt.compare(password, hashedPword)
        if(checked) {
            const session_id = req.session.userId = user.id;
            console.log('Found user:', user)
            console.log('Match, logged in');
            console.log('Session ID:', session_id);
            res.redirect('/blogs');            
        } else {
            return res.send('Invalid password.');
        }
    });
};

exports.loginValidate = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors.array())
    if (!errors.isEmpty()) { return res.render('login', { errors: errors.array()});
    }
    User.create(req.body, (err) => {
        if (err) return res.send('Error signing in user');
        console.log('User logged in: ', req.body);
        res.redirect('/login');
    });

};
