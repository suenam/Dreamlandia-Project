const pool = require('./database');
const getPostData = require('./postDataParser');

async function unresolvedMaintenanceHandler(req, res) {
  try {
    const { date, subject } = await getPostData(req);

    const [rows] = await pool.execute(
      `
      SELECT 
        MRSubject,
        MRDescription,
        MRDateSubmitted,
        RequestID
      FROM maintenance_request
      WHERE MRStatus = 'Pending'
        AND MRSubject = ?
        AND DATE(MRDateSubmitted) = ?
      `,
      [subject, date]
    );

    const unresolvedRequests = rows.map((row) => ({
      id: row.RequestID,
      subject: row.MRSubject,
      description: row.MRDescription,
      dateSubmitted: row.MRDateSubmitted,
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ requests: unresolvedRequests }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: 'Error fetching unresolved maintenance requests', error: error.toString() })
    );
  }
}

module.exports = unresolvedMaintenanceHandler;