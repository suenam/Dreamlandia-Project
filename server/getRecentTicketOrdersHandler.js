const pool = require('./database');
const authenticateToken = require('./authenticateToken');
const getPostData = require('./postDataParser');

async function getRecentTicketOrdersHandler(req, res, userId, months, orderType) {
  try {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    let results = [];

    if (orderType === 'tickets') {
      const ticketQuery = `
        SELECT
          t.TicketID, t.TType, t.TPurchaseDate, t.TPrice
        FROM ticket t
        WHERE t.UserID = ? AND t.TPurchaseDate >= ?
        ORDER BY t.TPurchaseDate DESC
      `;
      const [ticketResults] = await pool.execute(ticketQuery, [userId, startDate]);
      results = ticketResults;
    } else if (orderType === 'merchandise') {
      const merchandiseQuery = `
        SELECT
          mo.MerchandiseTransactionID, m.ItemID, m.MName, m.MType, m.SupplierCost, m.SellingCost, mo.TotalCost, mo.TransactionDate, mo.Size, mo.Quantity
        FROM merchandise_order_detail mo
        JOIN merchandise m ON mo.ItemID = m.ItemID
        WHERE mo.UserID = ? AND mo.TransactionDate >= ?
        ORDER BY mo.TransactionDate DESC
      `;
      const [merchandiseResults] = await pool.execute(merchandiseQuery, [userId, startDate]);
      results = merchandiseResults;
    } else if (orderType === 'restaurant') {
      const restaurantQuery = `
        SELECT
          rt.RestaurantTransactionID, r.RestaurantID, r.RestaurantName, r.RestaurantType, r.Amount, rt.TransactionTimeStamp
        FROM restaurant_transaction rt
        JOIN restaurant r ON rt.RestaurantID = r.RestaurantID
        WHERE rt.UserID = ? AND rt.TransactionTimeStamp >= ?
        ORDER BY rt.TransactionTimeStamp DESC
      `;
      const [restaurantResults] = await pool.execute(restaurantQuery, [userId, startDate]);
      results = restaurantResults;
    } else {
      const ticketQuery = `
        SELECT
          t.TicketID, t.TType, t.TPurchaseDate, t.TExpiryDate, t.TPrice
        FROM ticket t
        WHERE t.UserID = ? AND t.TPurchaseDate >= ?
        ORDER BY t.TPurchaseDate DESC
      `;
      const [ticketResults] = await pool.execute(ticketQuery, [userId, startDate]);

      const merchandiseQuery = `
        SELECT
          mo.MerchandiseTransactionID, m.ItemID, m.MName, m.MType, m.SupplierCost, m.SellingCost, mo.TotalCost, mo.TransactionDate, mo.Size, mo.Quantity
        FROM merchandise_order_detail mo
        JOIN merchandise m ON mo.ItemID = m.ItemID
        WHERE mo.UserID = ? AND mo.TransactionDate >= ?
        ORDER BY mo.TransactionDate DESC
      `;
      const [merchandiseResults] = await pool.execute(merchandiseQuery, [userId, startDate]);

      const restaurantQuery = `
        SELECT
          rt.RestaurantTransactionID, r.RestaurantID, r.RestaurantName, r.RestaurantType, r.Amount, rt.TransactionTimeStamp
        FROM restaurant_transaction rt
        JOIN restaurant r ON rt.RestaurantID = r.RestaurantID
        WHERE rt.UserID = ? AND rt.TransactionTimeStamp >= ?
        ORDER BY rt.TransactionTimeStamp DESC
      `;
      const [restaurantResults] = await pool.execute(restaurantQuery, [userId, startDate]);

      results = [...ticketResults, ...merchandiseResults, ...restaurantResults];
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error retrieving recent orders', error: error.toString() }));
  }
}

module.exports = getRecentTicketOrdersHandler;

