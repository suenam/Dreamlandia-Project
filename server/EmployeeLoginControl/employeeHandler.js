// employeeLoginHandler.js
const pool = require('../database');
const getPostData = require('../postDataParser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function employeeLoginHandler(req, res) {
  try {
    const { email, password } = await getPostData(req);
    const query = 'SELECT * FROM staff WHERE SEmail = ? AND archive = 0';
    const [employees] = await pool.execute(query, [email]);
    const employee = employees[0];
    console.log('employee:', employee);
    if (employee) {
      const isPasswordValid = await bcrypt.compare(password, employee.SPassword);

      if (isPasswordValid) {
        res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'); // logout regular user if exist in cookies
        const token = jwt.sign({ employeeId: employee.StaffID, userType: 'employee' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const isProduction = process.env.NODE_ENV === 'production';
        const cookieAttributes = `token=${token}; HttpOnly; Path=/; Max-Age=3600;` +
          (isProduction ? ' Secure; SameSite=None' : '');

        res.setHeader('Set-Cookie', cookieAttributes);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Login successful', employee, token }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invaid Email address' }));
      }

    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Password is incorrect' }));
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error logging in', error: error.toString() }));
  }
}

module.exports = employeeLoginHandler;