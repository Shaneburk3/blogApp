const db = require('./database');
let sql;
let sql2;

//create table
sql = 'CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT null, password TEXT NOT null, email TEXT NOT NULL )';

sql2 = 'CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT null, body TEXT NOT null, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users (id))'

db.run(sql);
db.run(sql2);

db.close((err) => {
    if (err) console.error('error closing DB:', err.message);
    else console.log('DB Closed.');
});
