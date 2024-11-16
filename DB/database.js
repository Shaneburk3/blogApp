const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log('Error: ', err.message)
    } else {
        console.log('Connected to DB.')
    }
});

module.exports = db;

//users
/*
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT null,
    last_name TEXT NOT null,
    username TEXT NOT null,
    password TEXT NOT null,
    email TEXT UNIQUE NOT null,
    role TEXT NOT NULL DEFAULT 'user'
)
*/

//Start DB
//const db = new sqlite3.Database()