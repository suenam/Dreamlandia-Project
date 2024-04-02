const pool = require('./database');

async function updateMaintenanceHandler(req, res) {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { RequestID, status, comment, cost, dateResolved } = JSON.parse(body);
        if (!RequestID) {
          console.log("!!!!!!"); // You can remove this line if not needed
        }

        let resolvedDate = null;
        if (status === 'Completed') {
          resolvedDate = dateResolved;
        }

        const [result] = await pool.execute(
          'UPDATE maintenance_request SET MRStatus = ?, MRDescription = ?, MRCost = ?, MRDateResolved = ? WHERE RequestID = ?',
          [status, comment, cost, resolvedDate, RequestID]
        );

        if (result.affectedRows > 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Maintenance request updated successfully' }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Maintenance request not found' }));
        }
      } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error updating maintenance request', error: error.toString() }));
      }
    });
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error updating maintenance request', error: error.toString() }));
  }
}

module.exports = updateMaintenanceHandler;