const sqlite3 = require('sqlite3').verbose();
const db =  new sqlite3.Database('database.db');
const path = require('path');

const dbPath = path.resolve(__dirname, './database.db');
//let admin_user = 'admin'
//let user_user = 'user'



db.serialize(() => {

    db.run('DROP TABLE IF EXISTS users');
    db.run('DROP TABLE IF EXISTS blogs');

    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, username TEXT UNIQUE NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, role TEXT DEFAULT' + 'user'+' )');

    db.run('CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT null, body TEXT NOT null, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users (id))');

    //db.run('DELETE FROM users WHERE username = (?)', [admin_user]);
    //db.run('DELETE FROM users WHERE username = (?)', [admin_user]);

    //Mock data
    db.run('INSERT INTO users (first_name, last_name, username, email, password) VALUES (?,?,?,?,?)', ["admin", "admin", "admin", "admin@email.com", "password"]);
    //db.run('INSERT INTO users (first_name, last_name, username, email, password) VALUES (?,?,?,?,?)', ["user", "user", "user", "user@email.com", "123"]);
    //Mock data
    db.run('INSERT INTO blogs (title, body, user_id) VALUES (?,?,?)', ["my secret blog", "body", 1])
    });

module.exports = db;
