// loginHandler.js
const pool = require('./database');
const getPostData = require('./postDataParser');
const jwt = require('jsonwebtoken');

async function loginHandler(req, res) {
    try {
        const { email, password } = await getPostData(req);
        const query = 'SELECT * FROM user WHERE UEmail = ? AND UPassword = ?';
        const [users] = await pool.execute(query, [email, password]);
        const user = users[0];
        const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });

        if (users.length > 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Login successful', user, token }));
        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Email or password is incorrect' }));
        }
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error logging in', error: error.toString() }));
    }
}

module.exports = loginHandler;
