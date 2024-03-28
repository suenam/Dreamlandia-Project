const pool = require('./database');
const getPostData = require('./postDataParser');

async function visitReportHandler(req, res) {
  try {
    const { startDate, endDate, category, attractionName, diningName } = await getPostData(req);

    let query;
    let queryParams;

    if (category === 'attractions') {
      if (attractionName === 'all') {
        query = `
          SELECT 
              DATE_FORMAT(TPurchaseDate, '%Y-%m-%d') AS PurchaseDate,
              SUM(CASE WHEN a.AName = 'Roller Coaster' THEN 1 ELSE 0 END) AS "Roller Coaster",
              SUM(CASE WHEN a.AName = 'Carousel' THEN 1 ELSE 0 END) AS "Carousel",
              SUM(CASE WHEN a.AName = 'Ferris Wheel' THEN 1 ELSE 0 END) AS "Ferris Wheel",
              SUM(CASE WHEN a.AName = 'Themed Rides' THEN 1 ELSE 0 END) AS "Themed Rides",
              SUM(CASE WHEN a.AName = 'Water Rides' THEN 1 ELSE 0 END) AS "Water Rides",
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
      } else {
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
        query = `
          SELECT 
          DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') AS TransactionDate, 
              SUM(CASE WHEN r.RestaurantName = "Bella\\'s Fairy Tale Feast" THEN 1 ELSE 0 END) AS "Bella\'s Fairy Tale Feast",
              SUM(CASE WHEN r.RestaurantName = 'Burger Castle' THEN 1 ELSE 0 END) AS 'Burger Castle',
              SUM(CASE WHEN r.RestaurantName = 'HerHarmony Eatery' THEN 1 ELSE 0 END) AS "HerHarmony Eatery",
              SUM(CASE WHEN r.RestaurantName = 'Silver Spoon Serenade' THEN 1 ELSE 0 END) AS "Silver Spoon Serenade",
              SUM(CASE WHEN r.RestaurantName = 'The Velvet Vineyard' THEN 1 ELSE 0 END) AS "The Velvet Vineyard",
              SUM(CASE WHEN r.RestaurantName = 'WhataSandwich' THEN 1 ELSE 0 END) AS "WhataSandwich",
              SUM(1) AS Total
          FROM 
          restaurant_transaction t
          INNER JOIN 
            restaurant r ON t.RestaurantID = r.RestaurantID
          WHERE 
          DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') BETWEEN ? AND ?
          GROUP BY 
          DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d');
        `;
        queryParams = [startDate, endDate];
      } else {
        query = `
          SELECT 
          DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') AS TransactionDate, 
              COUNT(rt.UserID) AS Visitors,
              RestaurantName AS DiningName
          FROM 
              restaurant_transaction rt
          INNER JOIN 
              restaurant r ON rt.RestaurantID = r.RestaurantID
          WHERE 
              r.RestaurantName = ? AND DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') BETWEEN ? AND ?
          GROUP BY 
          DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d'), DiningName;
        `;
        queryParams = [diningName, startDate, endDate];
      }
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
