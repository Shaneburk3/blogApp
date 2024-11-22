const User = require('../models/userModel');
const db = require('../db');
const { validationResult } = require('express-validator');
const enCrypt = require('bcrypt');


exports.register = (req, res) => { res.render('register', { errors: null }); };

exports.registerValidate = async (req, res) => {
    //use validator on request sent from user.
    const errors = validationResult(req);
    //check all errors.
    console.log(errors.array());;
    if (!errors.isEmpty()) { return res.render('register', { errors: errors.array() }); }
    const { first_name, last_name, username, email, password } = req.body;
    //hash user password, with salt.
    const hashedPword = await enCrypt.hash(password, 10)
    console.log('hashed password: ', hashedPword, username)
    User.create(first_name, last_name, username, email, hashedPword, (err) => {
        if (err) return res.send('Error creating user');
        console.log('User created: ', username);
        res.redirect('/login');
    });
};

exports.login = (req, res) => { res.render('login', { errors: null }); };

exports.loginValidate = async (req, res) => {
    const { username, password } = req.body;
    console.log('Username entered:', username);
    //Validate inputs
    const errors = validationResult(req);
    console.log(errors.array())
    if (!errors.isEmpty()) { return res.render('login', { errors: errors.array() }); }
    // Find user
    User.findByUsername(username, async (err, user) => {
        if (err) {
            return res.send('Error.', err.message);
        } else if (!user) {
            return res.send('User not found.');
        }
        //compare hashed password against user entry:
        console.log("Checking:", password, "against:", user.password)
        const checked = await enCrypt.compare(password, user.password)
        // if credentials matched, user will be signed in.
        if (checked) {
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
