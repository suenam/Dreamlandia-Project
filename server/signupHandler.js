// signupHandler.js
const pool = require('./database');
const getPostData = require('./postDataParser');

async function signupHandler(req, res) {
    try {
      const { username, fullname, email, password } = await getPostData(req);

      const [result] = await pool.execute(
        'INSERT INTO user (UUsername, UName, UEmail, UPassword) VALUES (?,?,?,?)',
        [username, fullname, email, password]
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
