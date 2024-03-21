// employeeLoginHandler.js
const pool = require('../database');
const getPostData = require('../postDataParser');
const jwt = require('jsonwebtoken');

async function employeeLoginHandler(req, res) {
  try {
    const { email, password } = await getPostData(req);
    const query = 'SELECT * FROM staff WHERE SEmail = ? AND SPassword = ?';
    const [employees] = await pool.execute(query, [email, password]);
    const employee = employees[0];
    console.log('employee:', employee);
    if (employee) {
      const token = jwt.sign({ employeeId: employee.StaffID, userType: 'employee' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/;`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Login successful', employee, token }));
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

module.exports = employeeLoginHandler;