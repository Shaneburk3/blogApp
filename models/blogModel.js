const db = require('../db');

const Blog = {
    create: (title, body, user_id, callback) => {
        console.log(`[INFO]: Creating blog for user_Id: ${user_id}. `)
        //const {title, body, user_id} = data;
        db.run('INSERT INTO blogs (title, body, user_id) VALUES (?,?,?)', [title, body, user_id], callback);
    },
    findAll: (id, callback) => {
        db.all('Select blogs.*, users.username FROM blogs JOIN users ON blogs.user_id = ?', [id], callback)
    },
    findById: (userId, callback) => {
        db.all('SELECT * FROM blogs WHERE user_id = ?', [userId], callback);
    },
    update: (id, data, callback) => {
        console.log(`[INFO]: Updating blog for user_Id: ${id}. `)
        const { title, body } = data;
        db.run('UPDATE blogs SET title = ?, body = ? WHERE id = ?', [title, body, id], callback);
    },
    delete: (id, callback) => {
        console.log(`[INFO]: deleting blog with id: ${id}. `)
        db.run('DELETE FROM blogs WHERE id = ?', [id], callback);
    },
};

module.exports = Blog;