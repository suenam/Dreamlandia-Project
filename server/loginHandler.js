// loginHandler.js
const pool = require('./database');
const bcrypt = require('bcrypt');
const getPostData = require('./postDataParser');
const jwt = require('jsonwebtoken');


async function loginHandler(req, res) {
    try {
        const { email, password } = await getPostData(req);
        const query = 'SELECT * FROM user WHERE UEmail = ?';
        const [users] = await pool.execute(query, [email]);
        const user = users[0];

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.UPassword);
            if (isPasswordValid) {
                res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
                const token = jwt.sign({ userId: user.UserID, userType: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
                console.log('token is initiated in loginHandler.js : ', token);
                console.log('user is initiated in loginHandler.js : ', user);
                const isProduction = process.env.NODE_ENV === 'production';
                const cookieSettings = `token=${token}; HttpOnly; Path=/;` + (isProduction ? ' SameSite=None; Secure' : '');
                res.setHeader('Set-Cookie', cookieSettings);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Login successful', user, token }));
            } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Password is incorrect' }));
            }

        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'invalid email address' }));
        }
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error logging in', error: error.toString() }));
    }
}

module.exports = loginHandler;

