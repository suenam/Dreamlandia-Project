const pool = require('./database');

async function getEmployeesHandler(req, res) {
  try {
    const [result] = await pool.execute(
      'SELECT StaffID, SName FROM staff WHERE archive = 0'
    );

    if (result.length > 0) {
      const employees = result.map(({ StaffID, SName }) => ({ id: StaffID, name: SName }));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ employees }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'No active employees found' }));
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error handling request', error: error.toString() }));
  }
}

module.exports = getEmployeesHandler;