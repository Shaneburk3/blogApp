const db = require('../db');


const User = {
    create: (first_name, last_name, username, email, hashedPWord, callback) => {
        console.log('Creating user...')
        const {first_name, last_name, username, email, hashedPWord} = data;
        console.log(data);
        db.run('INSERT INTO users (first_name, last_name, username, password, email) VALUES (?,?,?,?,?)', [first_name, last_name, username, hashedPWord, email], callback);
    },
    findByUsername: (username, callback) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], callback);
},
};

module.exports = User;
