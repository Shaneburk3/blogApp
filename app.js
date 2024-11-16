//express library for the server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// require database for sqlite3
const sqlite3 = require('sqlite3').verbose();


//connect to db
const dbPath = path.resolve(__dirname, './database.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log('Error: ', err.message)
    } else {
        console.log('Connected to DB.')
    }
});

module.exports = db;





//const session = require('express-session');

//routes to blog and user.
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const { KeyObject } = require('crypto');


app.listen(3000);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: false}))

app.use('/blogs', blogRouter);

app.use('/users', userRouter);

app.use(express.static(path.join(__dirname, 'public')));

/*
app.use(
    session({
        secret: 'secret_key', 
        resave: false, 
        saveUninitialized: false,
    })
);
*/

app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/signin', (req, res) => {
    res.render('signin.ejs')
});

app.get('/register', (req, res) => {
    res.render('register.ejs')
});

app.get('/blogs', (req, res) => {
    res.render('blogs.ejs')
})

