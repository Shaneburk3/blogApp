const User = require('../models/userModel');
//const db = require('../db');
const { validationResult } = require('express-validator');
const enCrypt = require('bcrypt');
//const { emit } = require('node:process');

exports.register = (req, res) => { res.render('register', { errors: null }); };

exports.registerValidate = async (req, res) => {
    //use validator on request sent from user.
    const errors = validationResult(req);
    //if validator finds error, redirect back to register.
    if (!errors.isEmpty()) { 
        console.log('[SECURITY]: Register Validation Errors:', errors.array());
        return res.render('register', { errors: errors.array() }); }
    const { first_name, last_name, username, email, password, passwordTwo } = req.body;
    if (password !== passwordTwo) {
        console.log('[ERROR]: Passwords does not match.');
        return res.send('Passwords do not match.');
    }
    //hash user password, with salt.
    const hashedPword = await enCrypt.hash(password, 10)
    User.create(first_name, last_name, username, email, hashedPword, (err) => {
        if (err) return console.log(`[ERROR]: could not create user: ${username}`), res.send('Error creating user');
        res.redirect('/login');
    });
};

exports.login = (req, res) => { res.render('login', { errors: null }); };

exports.loginValidate = async (req, res) => {
    const { username, password } = req.body;
    console.log('[INFO]: Validating User log in:', username);
    //Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        console.log('[ERROR]: Validation Failed:', errors.array());
        return res.render('login', { errors: errors.array() });  }
    console.log('[INFO]: User Validated.');
    // Find user
    User.findByUsername(username, async (err, user) => {
        if (err) {
            console.log('[ERROR]: Could not find user.');
            return res.send('Error.', err.message);
        } else if (!user) {
            console.log('[ERROR]: User does not exist.');
            return res.send('User not found.');
        }
        //compare hashed password against user entry:
        console.log(`[INFO]: checking password: entered: ${password}`)
        const checked = await enCrypt.compare(password, user.password)
        // if credentials matched, user will be signed in.
        if (checked) {
            const session_id = req.session.userId = user.id;
            console.log('[INFO]: User logged in, user:', user.username)
            console.log('[INFO] Session ID:', session_id);
            res.redirect('/blogs');
        } else {
            return res.send('[ERROR]: Invalid password entered.');
        }
    });
};
