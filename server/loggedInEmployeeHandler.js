const pool = require('./database');

async function loggedInEmployeeHandler(req, res, staffId) {
  try {
    const [result] = await pool.execute(
      'SELECT StaffID, SName, SAddress, SCity, SState, SZipcode, SPhoneNumber, SEmail FROM staff WHERE StaffID = ?',
      [staffId]
    );

    if (result.length > 0) {
      const employee = {
        id: result[0].StaffID,
        name: result[0].SName,
        address: result[0].SAddress,
        city: result[0].SCity,
        state: result[0].SState,
        zipcode: result[0].SZipcode,
        phoneNumber: result[0].SPhoneNumber,
        email: result[0].SEmail,
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ employee }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Employee not found' }));
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error handling request', error: error.toString() }));
  }
}

module.exports = loggedInEmployeeHandler;