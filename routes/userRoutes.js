const express = require('express');
const router = express.Router()
const db = require('../DB/database.js');

router.get('/', (req, res) => {
    res.send('Send in users');
});

router.post('/register', async (req, res) => {
    const { first_name, last_name, username, password, email} = req.body;
})

module.exports = router