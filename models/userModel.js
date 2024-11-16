const db = require('../DB/database');

const getUserByUsername = (username, callback) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], callback);
};

//create a user
const createUser = (userData, callback) => {
    const { first_name, last_name, username, password, email } = userData;
    db.run('INSERT INTO users (first_name, last_name, username, password, email) VALUES (?,?,?,?,?)', [first_name, last_name, username, password, email], callback
    );
};

module.exports = {getUserByUsername, createUser};