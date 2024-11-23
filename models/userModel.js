const db = require('../db');


const User = {
    create: (first_name, last_name, username, email, hashedPWord, callback) => {
        console.log('Creating user...', username)
        db.run('INSERT INTO users (first_name, last_name, username, email, password) VALUES (?,?,?,?,?)', [first_name, last_name, username, email, hashedPWord], callback);
    },
    findByUsername: (username, callback) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], callback);
    },
};

module.exports = User;
