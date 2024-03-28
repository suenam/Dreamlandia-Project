const pool = require('./database');

async function loadMaintenanceRequestHandler(req, res) {
  try {
    const { RequestID } = req.query;

    const [rows] = await pool.execute('SELECT * FROM maintenance_request WHERE RequestID = ?', [RequestID]);

    if (rows.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Maintenance request not found' }));
      return;
    }

    const maintenanceRequest = rows[0];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(maintenanceRequest));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error loading maintenance request', error: error.toString() }));
  }
}

module.exports = loadMaintenanceRequestHandler;