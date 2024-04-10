const pool = require('./database');
const getPostData = require('./postDataParser');

async function maintenanceReportHandler(req, res) {
  try {
    const { startDate, endDate, maintenanceStatus, maintenanceKeyword, attractionName } = await getPostData(req);

    console.log('Received request:', { startDate, endDate, maintenanceStatus, maintenanceKeyword, attractionName });

    let maintenanceQuery = `
      SELECT mr.*, DATE_FORMAT(MRDateSubmitted, '%Y-%m-%d') AS Date,  a.AName
      FROM maintenance_request mr
      INNER JOIN attraction a ON mr.AttractionID = a.AttractionID
      WHERE DATE(MRDateSubmitted) BETWEEN ? AND ?
    `;

    const maintenanceQueryParams = [startDate, endDate];

    if (maintenanceKeyword) {
      maintenanceQuery += ' AND (MRSubject LIKE ? OR MRDescription LIKE ?)';
      maintenanceQueryParams.push(`%${maintenanceKeyword}%`, `%${maintenanceKeyword}%`);
    }

    if (maintenanceStatus) {
      maintenanceQuery += ' AND MRStatus = ?';
      maintenanceQueryParams.push(maintenanceStatus);
    }

    if (attractionName !== 'all') {
      maintenanceQuery += ' AND a.AName = ?';
      maintenanceQueryParams.push(attractionName);
    }

    maintenanceQuery += ' ORDER BY MRDateSubmitted';

    const [maintenanceData] = await pool.execute(maintenanceQuery, maintenanceQueryParams);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(maintenanceData));
  } catch (error) {
    console.error('Error retrieving maintenance report data:', error.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}

module.exports = maintenanceReportHandler;