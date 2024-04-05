const pool = require('./database');
const authenticateToken = require('./authenticateToken');
const getPostData = require('./postDataParser');

async function getRecentTicketOrdersHandler(req, res, userId, months) {
  try {
    // console.log('Request Body:', req.body);
    // const userId = req.body.userId;
    // const months = req.body.months;

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    // Querying the database for recent orders
    const [results] = await pool.execute(
      'SELECT TicketID, TType, TPurchaseDate, TExpiryDate, TPrice FROM ticket WHERE UserID = ? AND TPurchaseDate >= ? ORDER BY TPurchaseDate DESC',
      [userId, startDate]
    );

    // Sending the recent orders as a response
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results));
  } catch (error) {
    // Handling errors
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: 'Error retrieving recent orders', error: error.toString() })
    );
  }
}

module.exports = getRecentTicketOrdersHandler;