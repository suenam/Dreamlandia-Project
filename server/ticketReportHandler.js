const pool = require('./database');
const getPostData = require('./postDataParser');

async function ticketReportHandler(req, res) {
  try {
    const { startDate, endDate, ticketTypes } = await getPostData(req);

    let query =
      'SELECT t.TType, COUNT(t.TicketID) AS TicketsSold FROM ticket t WHERE t.TPurchaseDate BETWEEN ? AND ?';

    let queryParams = [startDate, endDate];

    if (ticketTypes.length > 0) {
      query += ' AND t.TType IN (?)';
      queryParams.push(ticketTypes);
    }

    query += ' GROUP BY t.TType';

    const [reportData] = await pool.execute(query, queryParams);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(reportData));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error generating ticket report', error: error.toString() }));
  }
}

module.exports = ticketReportHandler;