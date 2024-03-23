const pool = require('./database');
const getPostData = require('./postDataParser');

async function maintenanceHandler(req, res) {
  try {
    const { MRSubject, MRDescription, MRCost, AttractionID } = await getPostData(req);
    const MRStatus = 'Pending';
    const MRDateSubmitted = new Date();

    const [result] = await pool.execute(
      'INSERT INTO maintenance_request (MRSubject, MRDescription, MRDateSubmitted, MRCost, MRStatus, AttractionID) VALUES (?, ?, ?, ?, ?, ?)',
      [MRSubject, MRDescription, MRDateSubmitted, MRCost, MRStatus, AttractionID]
    );

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Maintenance request submitted successfully' }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error submitting maintenance request', error: error.toString() }));
  }
}

module.exports = maintenanceHandler;