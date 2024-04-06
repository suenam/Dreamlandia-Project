const pool = require('./database');

async function getAttractionStatusHandler(req, res) {
  try {
    const [result] = await pool.execute(
      'SELECT Aname, AStatus FROM attraction'
    );

    const requests = result.map((row) => ({
      attractionName: row.Aname,
      attractionStatus: row.AStatus, 
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ requests }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error fetching attraction statuses', error: error.toString() }));
  }
}

module.exports = getAttractionStatusHandler;