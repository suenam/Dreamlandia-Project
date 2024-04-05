const pool = require('./database');

async function updateLoggedInEmployeeHandler(req, res) {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const { id, name, address, phoneNumber, email } = JSON.parse(body);
        const [result] = await pool.execute(
          'UPDATE staff SET SName = ?, SAddress = ?, SPhoneNumber = ?, SEmail = ? WHERE StaffID = ?',
          [name, address, phoneNumber, email, id]
        );

        if (result.affectedRows > 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Employee updated successfully' }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Employee not found' }));
        }
      } catch (error) {
        console.error('Error in updateLoggedInEmployeeHandler:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'Error updating employee',
            error: error.message
          })
        );
      }
    });
  } catch (error) {
    console.error('Error in updateLoggedInEmployeeHandler:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Error updating employee',
        error: error.message
      })
    );
  }
}

module.exports = updateLoggedInEmployeeHandler;