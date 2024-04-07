const bcrypt = require('bcrypt'); 
const pool = require('./database'); 
const getPostData = require('./postDataParser');

async function signupHandler(req, res) {
  try {
    const { username, fullname, email, password, address, city, state, zipcode } = await getPostData(req);

    // Check if the email already exists
    const [emailCheckResult] = await pool.execute('SELECT * FROM user WHERE UEmail = ?', [email]);
    if (emailCheckResult.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Email already exists' }));
      return;
    }

    // Check if the username already exists
    const [usernameCheckResult] = await pool.execute('SELECT * FROM user WHERE UUsername = ?', [username]);
    if (usernameCheckResult.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Username already exists' }));
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [result] = await pool.execute(
      'INSERT INTO user (UUsername, UName, UEmail, UPassword, address, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [username, fullname, email, hashedPassword, address, city, state, zipcode]
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