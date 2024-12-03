const db = require('../db');


const User = {
    create: (first_name, last_name, username, email, hashedPWord, callback) => {
        console.log(`[INFO]: Creating user for ${first_name} : Username: ${username}, Email: ${email}` )
        db.run('INSERT INTO users (first_name, last_name, username, email, password) VALUES (?,?,?,?,?)', [first_name, last_name, username, email, hashedPWord], callback);
    },
    findByUsername: (username, callback) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], callback);
    },
    failed_logins: (type, username_entered, password_entered, message, callback) => {
        db.run('INSERT INTO failed_logins (type, username_entered, password_entered, message) VALUES (?,?,?,?)', [type, username_entered, password_entered, message], callback);
    },
    success_logins: (type, session_id, username, password, message, callback) => {
        db.run('INSERT INTO success_logins (type, session_id, username, password, message) VALUES (?,?,?,?,?)', [type, session_id, username, password, message], callback);
    },
};

module.exports = User;
