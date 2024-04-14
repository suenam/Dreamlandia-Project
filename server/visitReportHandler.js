const pool = require('./database');
const getPostData = require('./postDataParser');

async function visitReportHandler(req, res) {
  try {
    const { startDate, endDate, category, attractionName, diningName } = await getPostData(req);

    let query;
    let queryParams;

    if (category === 'attractions') {
        if (attractionName === 'all') {
          // Retrieve all attraction names from the database
          const attractions = await pool.query('SELECT AName FROM attraction');
        console.log("Attractions", attractions);

        // Construct the SUM(CASE ...) expressions dynamically
        const sumExpressions = attractions[0].map(attraction => `SUM(CASE WHEN a.AName = '${attraction.AName}' THEN 1 ELSE 0 END) AS "${attraction.AName}"`).join(',');
        console.log("Sum Expressions", sumExpressions); // Add this line to check the value of sumExpressions

        query = `
          SELECT 
              DATE_FORMAT(TPurchaseDate, '%Y-%m-%d') AS PurchaseDate,
              ${sumExpressions},
              SUM(1) AS Total
          FROM 
              ticket t
          INNER JOIN 
              attraction_joint aj ON t.TicketID = aj.TicketID
          INNER JOIN 
              attraction a ON aj.AttractionID = a.AttractionID
          WHERE 
              DATE_FORMAT(TPurchaseDate, '%Y-%m-%d') BETWEEN ? AND ?
          GROUP BY 
              DATE_FORMAT(TPurchaseDate, '%Y-%m-%d');
        `;
        queryParams = [startDate, endDate];

        }else {
        query = `
          SELECT 
              DATE_FORMAT(TPurchaseDate, '%Y-%m-%d') AS PurchaseDate,
              COUNT(aj.AttractionJointID) AS VisitorsCount,
              a.AName AS AttractionName
          FROM 
              attraction_joint aj 
          INNER JOIN 
              ticket t ON aj.TicketID = t.TicketID 
          INNER JOIN 
              attraction a ON aj.AttractionID = a.AttractionID 
          WHERE 
              a.AName = ? AND DATE(TPurchaseDate) BETWEEN ? AND ? 
          GROUP BY 
              DATE_FORMAT(TPurchaseDate, '%Y-%m-%d'), a.AName;
        `;
        queryParams = [attractionName, startDate, endDate];
      }
    } else if (category === 'dining') {
      if (diningName === 'all') {
        // Retrieve all restaurant names from the database
        const restaurants = await pool.query('SELECT DISTINCT RestaurantName FROM view_restaurant_transaction_extended');

        // Construct the SUM(CASE ...) expressions dynamically
        const sumExpressions = restaurants[0].map(restaurant => `SUM(CASE WHEN rt.RestaurantName = '${restaurant.RestaurantName}' THEN rt.quantity ELSE 0 END) AS "${restaurant.RestaurantName}"`).join(',');

        query = `
          SELECT
              DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') AS TransactionDate,
              ${sumExpressions},
              SUM(rt.quantity) AS Total
          FROM view_restaurant_transaction_extended rt
          WHERE DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') BETWEEN ? AND ?
          GROUP BY DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d');
        `;
        queryParams = [startDate, endDate];
      } else {
        query = `
          SELECT
              DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') AS TransactionDate,
              COUNT(DISTINCT rt.UserID) AS Quantity,
              SUM(rt.quantity) AS Visitors,
              rt.RestaurantName AS DiningName
          FROM view_restaurant_transaction_extended rt
          WHERE rt.RestaurantName = ?
            AND DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') BETWEEN ? AND ?
          GROUP BY DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d'), rt.RestaurantName;
        `;
        queryParams = [diningName, startDate, endDate];
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid category' }));
      return;
    }

    const [reportData] = await pool.execute(query, queryParams);
    console.log("Report Data", reportData);


    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(reportData));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error generating visit report', error: error.toString() }));
  }
}


module.exports = visitReportHandler;
