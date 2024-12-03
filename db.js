const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const path = require('path');

//const dbPath = path.resolve(__dirname, './database.db');
let admin_user = 'admin'


// Run these SQL commands when db starts.
db.serialize(() => {

    //clear all entries.
    db.run('DROP TABLE IF EXISTS users');
    db.run('DROP TABLE IF EXISTS blogs');
    db.run('DROP TABLE IF EXISTS failed_logins');
    db.run('DROP TABLE IF EXISTS success_logins');

    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, username TEXT UNIQUE NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, role TEXT DEFAULT' + 'user' + ' )');

    db.run('CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT null, body TEXT NOT null, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users (id))');

    //LOG for failed sign in attempts
    db.run('CREATE TABLE IF NOT EXISTS failed_logins (type, id INTEGER PRIMARY KEY AUTOINCREMENT, username_entered, password_entered, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, message TEXT)');

    //LOG for successful sign in attempts
    db.run('CREATE TABLE IF NOT EXISTS success_logins (type, id INTEGER PRIMARY KEY AUTOINCREMENT, session_id, username, password, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, message TEXT)');

    //LOG for blog posts
  


    db.run('DELETE FROM users WHERE username = (?)', [admin_user]);
    //hashed password: Password12
    db.run('INSERT INTO users (first_name, last_name, username, email, password) VALUES (?,?,?,?,?)', ["admin", "admin", "admin", "admin@email.com", "$2b$10$22TnFkO8rYI7xCWNAWcfTO2TF3yasArmsdCKHUYtFCXrhehQelCza"]);

    db.run('INSERT INTO blogs (title, body, user_id) VALUES (?,?,?)', ["my first blog", "body", 1])
});

module.exports = db;
