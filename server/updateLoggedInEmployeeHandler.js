// updateLoggedInEmployeeHandler.js
const pool = require('./database');
const getPostData = require('./postDataParser');

async function updateLoggedInEmployeeHandler(req, res) {
  try {
    const { name, address, phoneNumber, email } = await getPostData(req);

    const staffId = 2; 

    const [result] = await pool.execute(
      'UPDATE staff SET SName = ?, SAddress = ?, SPhoneNumber = ?, SEmail = ? WHERE StaffID = ?',
      [name, address, phoneNumber, email, staffId]
    );

    if (result.affectedRows > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Employee updated successfully' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Employee not found' }));
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error updating employee', error: error.toString() }));
  }
}

module.exports = updateLoggedInEmployeeHandler;