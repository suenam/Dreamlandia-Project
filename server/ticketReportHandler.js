const pool = require('./database');
const getPostData = require('./postDataParser');

async function ticketReportHandler(req, res) {
  try {
    const { startDate, endDate, ticketType, ticketType1, ticketType2, ticketType3 } = await getPostData(req);

    let query = 'SELECT ';
    let queryParams = [];

    if (ticketType) {
      query += '(SELECT COUNT(*) FROM ticket WHERE DATE(TPurchaseDate) BETWEEN ? AND ? AND TType = ?) AS `ticketType`';
      queryParams = [startDate, endDate, ticketType];
    } else if (ticketType1 && ticketType2) {
      query += '(SELECT COUNT(*) FROM ticket WHERE DATE(TPurchaseDate) BETWEEN ? AND ? AND TType = ?) AS `ticketType1`, ' +
               '(SELECT COUNT(*) FROM ticket WHERE DATE(TPurchaseDate) BETWEEN ? AND ? AND TType = ?) AS `ticketType2`';
      queryParams = [startDate, endDate, ticketType1, startDate, endDate, ticketType2];
    } else if (ticketType1 && ticketType2 && ticketType3) {
      query += '(SELECT COUNT(*) FROM ticket WHERE DATE(TPurchaseDate) BETWEEN ? AND ? AND TType = ?) AS `ticketType1`, ' +
               '(SELECT COUNT(*) FROM ticket WHERE DATE(TPurchaseDate) BETWEEN ? AND ? AND TType = ?) AS `ticketType2`, ' +
               '(SELECT COUNT(*) FROM ticket WHERE DATE(TPurchaseDate) BETWEEN ? AND ? AND TType = ?) AS `ticketType3`';
      queryParams = [startDate, endDate, ticketType1, startDate, endDate, ticketType2, startDate, endDate, ticketType3];
    }

    const [ticketCountData] = await pool.execute(query, queryParams);
    const ticketCounts = ticketCountData[0];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(ticketCounts));
  } catch (error) {
    console.error('Error retrieving ticket counts:', error.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}

module.exports = ticketReportHandler;