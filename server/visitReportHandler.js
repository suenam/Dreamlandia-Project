const pool = require('./database');
const getPostData = require('./postDataParser');

async function visitReportHandler(req, res) {
  try {
    const { startDate, endDate, category } = await getPostData(req);

    let query;
    let queryParams;

    if (category === 'attractions') {
      query =
        'SELECT a.AName AS AttractionName, COUNT(aj.AttractionJointID) AS VisitorsCount FROM attraction_joint aj INNER JOIN ticket t ON aj.TicketID = t.TicketID INNER JOIN attraction a ON aj.AttractionID = a.AttractionID WHERE t.TPurchaseDate BETWEEN ? AND ? GROUP BY a.AName;';
      queryParams = [startDate, endDate];
    } else if (category === 'dining') {
      query =
        'SELECT r.RestaurantName, COUNT(rt.UserID) AS Visitors FROM restaurant r LEFT JOIN restaurant_transaction rt ON r.RestaurantID = rt.RestaurantID WHERE rt.TransactionTimeStamp >= ? AND rt.TransactionTimeStamp <= ? GROUP BY r.RestaurantName;';
      queryParams = [
        `${startDate} 00:00:00`,
        `${endDate} 23:59:59`,
      ];
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid category' }));
      return;
    }

    const [reportData] = await pool.execute(query, queryParams);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(reportData));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error generating visit report', error: error.toString() }));
  }
}

module.exports = visitReportHandler;