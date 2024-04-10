const pool = require('./database');

async function maintenanceGetterEditHandler(req, res) {
  try {
    const [result] = await pool.execute(
      'SELECT * FROM maintenance_request WHERE MRStatus != "Completed"'
    );

    const requests = result.map((row) => ({
      id: row.RequestID,
      attraction: row.AttractionID, 
      status: row.MRStatus,
      comment: row.MRDescription,
      cost: row.MRCost,
      subject: row.MRSubject
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ requests }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error fetching maintenance requests', error: error.toString() }));
  }
}

module.exports = maintenanceGetterEditHandler;