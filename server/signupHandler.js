const bcrypt = require('bcrypt'); 
const pool = require('./database'); 
const getPostData = require('./postDataParser');

async function signupHandler(req, res) {
  try {
    const {fullname, email, password } = await getPostData(req);

    // Check if the email already exists
    const [emailCheckResult] = await pool.execute('SELECT * FROM user WHERE UEmail = ?', [email]);
    if (emailCheckResult.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Email already exists' }));
      return;
    }

 

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [result] = await pool.execute(
      'INSERT INTO user (UName, UEmail, UPassword) VALUES (?, ?, ?)',
      [fullname, email, hashedPassword]
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