//authenticateToken.js
const jwt = require('jsonwebtoken');
const pool = require('./database');


async function authenticateToken(req, res, next) {
  try {
    const token = req.headers.cookie?.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (!token) {
      // throw new Error('No token provided');
      return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;
    if (decoded.userType === 'user') {
      const [results] = await pool.execute('SELECT * FROM user WHERE UserID = ?', [decoded.userId]);
      user = results[0];
    } else if (decoded.userType === 'employee') {
      const [results] = await pool.execute('SELECT * FROM staff WHERE StaffID = ?', [decoded.employeeId]);
      user = results[0];
    }

    if (!user) {
      throw new Error('User/Employee not found in database');
    }
    req.user = { ...user, userType: decoded.userType };
    next();
  } catch (error) {
    console.error(error);
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: error.message }));
  }
}


module.exports = authenticateToken;