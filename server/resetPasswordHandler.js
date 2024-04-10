const bcrypt = require('bcrypt'); 
const pool = require('./database'); 
const getPostData = require('./postDataParser');

async function resetPasswordHandler(req, res) {
  try {
    const {email, password } = await getPostData(req);

    // Check if the email exists
    const [emailCheckResult] = await pool.execute('SELECT * FROM user WHERE UEmail = ?', [email]);
    if (emailCheckResult.length == 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Email does not exist' }));
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await pool.execute(
      'UPDATE user SET UPassword = ? WHERE UEmail = ?',
      [hashedPassword, email]
    );

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Password updated successfully!' }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error creating user', error: error.toString() }));
  }
}

module.exports = resetPasswordHandler;