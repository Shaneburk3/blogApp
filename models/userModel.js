const db = require('../db');

const User = {
    create: (data, callback) => {
        const {first_name, last_name, username, email, password} = data;
        console.log('Creating user for:', first_name);

        db.run('INSERT INTO users (first_name, last_name, username, email, password) VALUES (' + "'"+ first_name + "', " + "'" + last_name + "', "+ "'" +username + "', " + "'" + email + "', " + "'" + password + "')", callback );
    },
    findByUsername: (username, callback) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], callback);

},
};

module.exports = User;