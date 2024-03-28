const pool = require('./database');
const getPostData = require('./postDataParser');

async function financeDataHandler(req, res) {
  try {
    const { startDate, endDate, category, ticketType, financeType, diningType} = await getPostData(req);

    console.log('Received request:', { startDate, endDate, category, ticketType, financeType, diningType });

    let financeData = {};

    if (category === 'tickets') {
      let ticketQuery = `
        SELECT
          DATE_FORMAT(TPurchaseDate, '%Y-%m-%d') AS Date,
          COUNT(*) AS Number_Tickets,
          TType AS Ticket_Type,
          SUM(TPrice) AS Ticket_Price
        FROM
          ticket
        WHERE
          TPurchaseDate BETWEEN ? AND ?
      `;

      const ticketQueryParams = [startDate, endDate];

      if (ticketType !== 'allTicket') {
        ticketQuery += ' AND TType = ?';
        ticketQueryParams.push(ticketType);
      }
      ticketQuery += ' GROUP BY TPurchaseDate, TType';
      const [ticketData] = await pool.execute(ticketQuery, ticketQueryParams);
      financeData.TicketData = ticketData;
      const totalRevenue = ticketData.reduce((sum, ticket) => sum + parseFloat(ticket.Ticket_Price), 0);
      financeData.TotalRevenue = totalRevenue.toFixed(2);

    } else if (category === 'dining') {
      if(financeType === 'diningExpense'){
        let diningExpenseQuery = `
        SELECT DATE_FORMAT(ExpenseDate, '%Y-%m-%d') AS Date, 
        RestaurantName, ExpenseType, ExpenseAmt, RestaurantType
        from restaurant, restaurant_expense
        where restaurant.RestaurantID= restaurant_expense.RestaurantID 
        AND ExpenseDate between ? AND ?
      `;

      const diningExpenseQueryParams = [startDate, endDate];

      if (diningType !== 'allDining') {
        diningExpenseQuery += ' AND RestaurantType = ?';
        diningExpenseQueryParams.push(diningType);
      }
      diningExpenseQuery += ' ORDER BY ExpenseDate';
      const [diningData] = await pool.execute(diningExpenseQuery, diningExpenseQueryParams);
      financeData.diningData = diningData;
      }else{
        let diningRevenueQuery = `
        SELECT DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') AS Date, 
       RestaurantType, 
       RestaurantName, 
       COUNT(*) AS QuantitySold,
       SUM(Amount) AS TotalRevenue
      FROM restaurant
      JOIN restaurant_transaction ON restaurant.RestaurantID = restaurant_transaction.RestaurantID
      WHERE TransactionTimeStamp BETWEEN ? AND ?
      `;

      const diningRevenueQueryParams = [startDate, endDate];

      if (diningType !== 'allDining') {
        diningRevenueQuery += ' AND RestaurantType = ?';
        diningRevenueQueryParams.push(diningType);
      }
      diningRevenueQuery += ' GROUP BY Date, RestaurantType, RestaurantName ORDER BY Date;';
      const [diningData] = await pool.execute(diningRevenueQuery, diningRevenueQueryParams);
      financeData.diningData = diningData;
      }
     
    } else if (category === 'merch') {
      if(financeType === 'merchExpense'){
        let merchExpenseQuery = `
        SELECT 
    DATE_FORMAT(merchandise_order_detail.TransactionDate, '%Y-%m-%d') AS Date,
    merchandise.MType AS ItemType,
    merchandise.MName AS ItemName,
    COUNT(*) AS QuantitySold,
    SUM(merchandise.SupplierCost) AS ExpenseAmt
  FROM merchandise
  JOIN merchandise_order_detail ON merchandise.ItemID = merchandise_order_detail.ItemID
  WHERE merchandise_order_detail.TransactionDate BETWEEN ? AND ?
  GROUP BY Date, ItemType,ItemName
  ORDER BY Date;
      `;

      const merchExpenseQueryParams = [startDate, endDate];

        
      const [merchData] = await pool.execute(merchExpenseQuery, merchExpenseQueryParams);
      financeData.merchData = merchData;
      }else{
        let merchRevenueQuery = `
  SELECT 
    DATE_FORMAT(merchandise_order_detail.TransactionDate, '%Y-%m-%d') AS Date,
    merchandise.MType AS ItemType,
    merchandise.MName AS ItemName,
    COUNT(*) AS QuantitySold,
    SUM(merchandise.SellingCost) AS TotalRevenue
  FROM merchandise
  JOIN merchandise_order_detail ON merchandise.ItemID = merchandise_order_detail.ItemID
  WHERE merchandise_order_detail.TransactionDate BETWEEN ? AND ?
  GROUP BY Date, ItemType,ItemName
  ORDER BY Date;
`;
      const merchRevenueQueryParams = [startDate, endDate];

      
      const [merchData] = await pool.execute(merchRevenueQuery, merchRevenueQueryParams);
      financeData.merchData = merchData;
      }
     
    } else if (category === 'maintenance') {
      let maintQuery = `
      SELECT DATE_FORMAT(MRDateSubmitted, '%Y-%m-%d') AS Date, 
      MRSubject AS Subject, 
      AName AS AttractionN,
      MRCost AS Cost
    FROM maintenance_request
    JOIN attraction ON attraction.AttractionID = maintenance_request.AttractionID 
    WHERE MRDateSubmitted BETWEEN ? AND ? ORDER BY Date;
`;
      const maintQueryParams = [startDate, endDate];

      
      const [maintData] = await pool.execute(maintQuery, maintQueryParams);
      financeData.maintData = maintData;
    }
    else if(category === 'all') {
      let profitQuery = `
      SELECT 
    Date,
    Department,
    SUM(Expense) AS Expense,
    SUM(Revenue) AS Revenue,
    SUM(Revenue) - SUM(Expense) AS Profit
FROM (
    SELECT 
        DATE_FORMAT(TPurchaseDate, '%Y-%m-%d') AS Date,
        'Tickets' AS Department,
        0 AS Expense,
        SUM(TPrice) AS Revenue
    FROM ticket
    WHERE TPurchaseDate BETWEEN ? AND ?
    GROUP BY Date
    
    UNION ALL
    
    SELECT 
        DATE_FORMAT(ExpenseDate, '%Y-%m-%d') AS Date,
        'Dining' AS Department,
        SUM(ExpenseAmt) AS Expense,
        SUM(Amount) AS Revenue
    FROM restaurant, restaurant_expense
    WHERE restaurant.RestaurantID= restaurant_expense.RestaurantID 
    AND ExpenseDate between ? AND ?
    GROUP BY Date
    
    UNION ALL
    
    SELECT 
        DATE_FORMAT(merchandise_order_detail.TransactionDate, '%Y-%m-%d') AS Date,
        'Merchandise' AS Department,
        SUM(SupplierCost) AS Expense,
        SUM(SellingCost) AS Revenue
    FROM merchandise
    JOIN merchandise_order_detail ON merchandise.ItemID = merchandise_order_detail.ItemID
    WHERE merchandise_order_detail.TransactionDate BETWEEN ? AND ?
    GROUP BY Date
    
    UNION ALL
    
    SELECT 
        DATE_FORMAT(MRDateSubmitted, '%Y-%m-%d') AS Date,
        'Maintenance' AS Department,
        SUM(MRCost) AS Expense,
        0 AS Revenue
    FROM maintenance_request
    JOIN attraction ON attraction.AttractionID = maintenance_request.AttractionID 
    WHERE MRDateSubmitted BETWEEN ? AND ?
    GROUP BY Date
) AS ProfitData
GROUP BY Date, Department;

`;
      const profitQueryParams = [startDate, endDate,startDate, endDate,startDate, endDate,startDate, endDate];

      
      const [profitData] = await pool.execute(profitQuery, profitQueryParams);
      financeData.profitData = profitData;
    }


    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(financeData));
  } catch (error) {
    console.error('Error retrieving finance data:', error.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}

module.exports = financeDataHandler;