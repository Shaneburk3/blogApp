//express library for the server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const session = require('express-session');
//session keys to track user activity
app.use(session({
        secret: 'secret_key', 
        resave: false, 
        saveUninitialized: false,
    })
);

app.use(express.static(__dirname + '/'));


// parse application
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// require database for sqlite3
const sqlite3 = require('sqlite3').verbose();

const userRoutes = require('../blogApp/routes/userRoutes');
const blogRoutes = require('../blogApp/routes/blogRoutes');

app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);



//connect to db

const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log('Error: ', err.message)
    } else {
        console.log('Connected to DB.')
    }
});

module.exports = db;

//routes to blog and user.
//const blogRouter = require('./routes/blogRoutes');
//const userRouter = require('./routes/userRoutes');

//const { KeyObject } = require('crypto');


app.listen(3000);

app.set('view engine', 'ejs');

app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.render('index.ejs')
});
app.get('/register', (req, res) => {
    res.render('register.ejs')
});

app.get('/login', (req, res) => {
    res.render('login.ejs')
});
app.get('/blogs', (req, res) => {
    res.render('blogs.ejs')
})
app.get('/blog', (req, res) => {
    res.render('blog.ejs')
})

