const User = require('../models/userModel');
const db = require('../db');

exports.register = (req, res) => {
    User.create(req.body, (err) => {
        if (err) return res.send('Error creating user');
        console.log('User created: ', req.body);
        res.redirect('/login');
    });
};

exports.login = (req, res) => {
    const {username, password} = req.body; 
    console.log('User:', req.body)
    User.findByUsername(username, (err, user) => {
        if (err) {
            return res.send('Error.');
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