const User = require('../models/userModel');
const db = require('../db');

exports.register = (req, res) => {
    User.create(req.body, (err) => {
        if (err) return res.send('Error creating user');
        res.redirect('/login');
    });
};

exports.login = (req, res) => {
    const {username, password} = req.body;
    console.log('Username:', req.body)
    User.findByUsername(username, (err, user) => {
        console.log('Found user:', user)
        if (err) {
            return res.send('Error.');
        } else if (!user) {
            return res.send('Not a user.');
        } else if (user.password !== password) {
            return res.send('Invalid password.');
        }
        console.log('Match, logged in');
        req.session.userId = user.id;
        //console.log('Session ID:', req.session);
        res.redirect('/blogs');
    });
};