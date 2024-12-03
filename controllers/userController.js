const User = require('../models/userModel');
//const db = require('../db');
const { validationResult } = require('express-validator');
const enCrypt = require('bcrypt');

const type_error = "ERROR";
const type_info = "INFO";

exports.register = (req, res) => { res.render('register', { errors: null }); };

//register request from user starts here, if successfull, runs User.create.
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

// If inputs are valid, controller runs User.findByUsername, then redirects to blogs. 
//Blogs open checking DB for blogs with users ID
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
            User.failed_logins(type_error, username, password, message);
            console.log('[ERROR]: Could not find user.');
            return res.send('Error.', err.message);
        } else if (!user) {
            const message = "User not found.";
            User.failed_logins(type_error, username, password, message);
            console.log('[ERROR]: User does not exist.');
            return res.redirect('/login');
        }
        //compare hashed password against user entry:
        console.log(`[INFO]: checking password: entered: ${password}`)
        const checked = await enCrypt.compare(password, user.password)
        // if credentials matched, user will be signed in.
        if (checked) {
            const session_id = req.session.userId = user.id;
            const message = "User logged in";
            User.success_logins(type_info, session_id, user.username, user.password, message)
            //console.log('[INFO]: User logged in, user:', user.username)
            //console.log('[INFO] Session ID:', session_id);
            res.redirect('/blogs');
        } else {
            const message = "[ERROR] Incorrect Password";
            User.failed_logins(type_error, username, password, message);
            //console.log('[ERROR]: Incorrect Password.');
            return res.redirect('/login');
        }
    });
};
