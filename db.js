const sqlite3 = require('sqlite3').verbose();
const db =  new sqlite3.Database('database.db');
const path = require('path');

const dbPath = path.resolve(__dirname, './database.db');


db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, username TEXT UNIQUE NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, role TEXT DEFAULT' + 'user'+' )');

    db.run('CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT null, body TEXT NOT null, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users (id))');

    db.run('INSERT INTO blogs (title, body, user_id) VALUES (?,?,?)', ["my first blog", "body", 1])
    db.run('INSERT INTO blogs (title, body, user_id) VALUES (?,?,?)', ["my first blog", "body", 2])
    db.run('INSERT INTO blogs (title, body, user_id) VALUES (?,?,?)', ["my first blog", "body", 3])
    db.run('INSERT INTO blogs (title, body, user_id) VALUES (?,?,?)', ["my first blog", "body", 4])});


module.exports = db;
