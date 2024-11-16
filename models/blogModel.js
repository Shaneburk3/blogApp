const db = require('../DB/database');
let sqlCreateBlog;

//sqlCreateBlog = 'INSERT INTO blogs (title, body, user_id) VALUES (?,?,?)';

const getBlogsByUserId = (userId, callback) => {
    db.all('SELECT * FROM blogs WHERE user_id = ?', [userId], callback);
};

const createBlog = (blogData, callback) => {
    const { title, body, user_id} = blogData;
    db.run('INSERT INTO blogs (title, body, user_id) VALUES (?,?,?)', [title, body, user_id], callback);
}

const getBlogByID = (id, callback) => {
    db.get('SELECT * FROM blogs WHERE id = ?', [id], callback);
}

const updateBlog = (id, blogData, callback) => {
    const { title, body } = blogData;
    db.run('UPDATE blogs SET title = ?, body = ? WHERE id = ?', [title, body, id], callback);
};

const deleteBlog = (id, callback) => {
    db.run('DELETE FROM blogs WHERE id = ?', [id], callback);
};

module.exports = {getBlogsByUserId, createBlog, getBlogByID, updateBlog, deleteBlog};