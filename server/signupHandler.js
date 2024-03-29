// signupHandler.js
const bcrypt = require('bcrypt');
const pool = require('./database');
const getPostData = require('./postDataParser');

async function signupHandler(req, res) {
  try {
    const { username, fullname, email, password } = await getPostData(req);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.execute(
      'INSERT INTO user (UUsername, UName, UEmail, UPassword) VALUES (?,?,?,?)',
      [username, fullname, email, hashedPassword]
    );

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User created successfully' }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error creating user', error: error.toString() }));
  }
}

module.exports = signupHandler;
