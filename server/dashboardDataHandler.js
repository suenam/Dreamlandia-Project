const pool = require('./database');
const getPostData = require('./postDataParser');

async function dashboardDataHandler(req, res) {
    try {
        const { startDate, endDate } = await getPostData(req);

        // Fetch ticket data
        const ticketQuery = `
  SELECT
    SUM(TPrice) AS TotalTicketRevenue,
    COUNT(*) AS TotalTicketTransactions,
    (SELECT COUNT(*) FROM ticket WHERE TType = 'Standard' AND DATE(TPurchaseDate) BETWEEN ? AND ?) AS TotalStandardTickets,
    (SELECT COUNT(*) FROM ticket WHERE TType = 'Child' AND DATE(TPurchaseDate) BETWEEN ? AND ?) AS TotalChildTickets,
    (SELECT COUNT(*) FROM ticket WHERE TType = 'Express' AND DATE(TPurchaseDate) BETWEEN ? AND ?) AS TotalExpressTickets
  FROM ticket
  WHERE DATE(TPurchaseDate) BETWEEN ? AND ?;
`;
        const [ticketData] = await pool.execute(ticketQuery, [
            startDate, endDate, startDate, endDate, startDate, endDate, startDate, endDate,
        ]);

        // Fetch restaurant data
        const restaurantQuery = `
            SELECT
                SUM(Amount) AS TotalRestaurantRevenue,
                COUNT(*) AS TotalRestaurantTransactions,
                (SELECT COUNT(*) FROM restaurant_transaction WHERE RestaurantID IN (SELECT RestaurantID FROM restaurant WHERE RestaurantType = 'Standard') AND DATE(TransactionTimeStamp) BETWEEN ? AND ?) AS TotalStandardRestaurantTransactions,
                (SELECT COUNT(*) FROM restaurant_transaction WHERE RestaurantID IN (SELECT RestaurantID FROM restaurant WHERE RestaurantType = 'Deluxe') AND DATE(TransactionTimeStamp) BETWEEN ? AND ?) AS TotalDeluxeRestaurantTransactions,
                (SELECT COUNT(*) FROM restaurant_transaction WHERE RestaurantID IN (SELECT RestaurantID FROM restaurant WHERE RestaurantType = 'Special') AND DATE(TransactionTimeStamp) BETWEEN ? AND ?) AS TotalSpecialRestaurantTransactions,
                (SELECT SUM(ExpenseAmt) FROM restaurant_expense WHERE DATE(ExpenseDate) BETWEEN ? AND ?) AS restaurantExpense
            FROM restaurant_transaction
            WHERE DATE(TransactionTimeStamp) BETWEEN ? AND ?;
        `;
        const [restaurantData] = await pool.execute(restaurantQuery, [
            startDate, endDate, startDate, endDate, startDate, endDate, startDate, endDate, startDate, endDate
        ]);

        // Fetch merchandise data
        const merchandiseQuery = `
            SELECT
                SUM(TotalCost) AS TotalMerchandiseRevenue,
                COUNT(*) AS TotalMerchandiseTransactions,
                (SELECT SUM(M.SupplierCost) FROM merchandise_order_detail AS MO JOIN merchandise AS M ON MO.ItemID = M.ItemID WHERE DATE(MO.TransactionDate) BETWEEN ? AND ?) AS TotalMerchandiseExpenses
            FROM merchandise_order_detail
            WHERE DATE(TransactionDate) BETWEEN ? AND ?;
        `;
        const [merchandiseData] = await pool.execute(merchandiseQuery, [
            startDate, endDate, startDate, endDate,
        ]);

        // Fetch maintenance data
        const maintenanceQuery = `
            SELECT
                SUM(MRCost) AS TotalMaintenanceExpenses,
                COUNT(*) AS TotalActiveMaintenanceRequests
            FROM maintenance_request
            WHERE MRStatus = 'Pending' AND DATE(MRDateSubmitted) BETWEEN ? AND ?;
        `;
        const [maintenanceData] = await pool.execute(maintenanceQuery, [startDate, endDate]);

        // Combine all data
        const dashboardData = {
            ...ticketData[0],
            ...restaurantData[0],
            ...merchandiseData[0],
            ...maintenanceData[0],
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dashboardData));
    } catch (error) {
        console.error('Error retrieving dashboard data:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}

module.exports = dashboardDataHandler;