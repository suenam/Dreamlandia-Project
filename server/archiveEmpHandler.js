const pool = require('./database');
const getPostData = require('./postDataParser');

async function archiveEmpHandler(req, res) {
  try {
    const { employeeToArchive } = await getPostData(req);

    // Check if employeeToArchive is provided
    if (employeeToArchive) {
      // Handle archiving an employee
      const [result] = await pool.execute(
        'UPDATE staff SET archive = 1 WHERE StaffID = ?',
        [employeeToArchive]
      );

      if (result.affectedRows === 1) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Employee archived successfully' }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Employee not found' }));
      }
    } else {
      // Fetch the list of active employees
      const [result] = await pool.execute(
        'SELECT StaffID, SName FROM staff WHERE archive = 0'
      );

      if (result.length > 0) {
        const employees1 = result.map(({ StaffID, SName }) => ({ id: StaffID, name: SName }));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ employees1 }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'No active employees found' }));
      }
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error handling request', error: error.toString() }));
  }
}

module.exports = archiveEmpHandler;