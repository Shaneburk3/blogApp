const {getUserByUsername, createUser } = require('../models/userModel');

const registerUser = (req, res) => {
    const { first_name, last_name, username, password, email } = req.body;
    createUser({first_name, last_name, username, password, email}, (err) => {
        if (err) return res.status(500).send('Error registering');
        res.redirect('/login');
    })
} ;

const loginUser = (req, res) => {
    const {username, password } = req.body;

    getUserByUsername(username, (err, user) => {
        if (err || !user || password !== user.password) {
            return res.status(401).send('invalid.');
        }
        req.session.user = user;
        res.redirect('/blogs');
    })
}

module.exports = { registerUser, loginUser };