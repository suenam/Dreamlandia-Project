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
          SUM(TPrice) AS Ticket_Price,
          (
            SELECT COUNT(*) 
            FROM ticket 
            WHERE DATE(TPurchaseDate) BETWEEN ? AND ?
            ${ticketType !== 'allTicket' ? 'AND TType = ?' : 'AND TType IN ("Standard", "Express", "Child")'}
            ) / DATEDIFF(?, ?) AS AvgDailyTickets,
          (
            SELECT SUM(TPrice)
            FROM ticket
            WHERE DATE(TPurchaseDate) BETWEEN ? AND ?
            ${ticketType !== 'allTicket' ? 'AND TType = ?' : 'AND TType IN ("Standard", "Express", "Child")'}
          ) / DATEDIFF(?, ?) AS AvgDailyRevenue,
          (
            SELECT SUM(TPrice)
            FROM ticket
            WHERE DATE(TPurchaseDate) BETWEEN ? AND ?
            ${ticketType !== 'allTicket' ? 'AND TType = ?' : 'AND TType IN ("Standard", "Express", "Child")'}
          ) AS TotalRevenue
        FROM
          ticket
        WHERE
          TPurchaseDate BETWEEN ? AND ?
      `;

        let ticketQueryParams;
      if (ticketType !== 'allTicket') {
        ticketQuery += ' AND TType = ?';
         ticketQueryParams = [startDate, endDate, ticketType, endDate, startDate, startDate, endDate, ticketType,endDate, startDate, startDate, endDate, ticketType, startDate, endDate, ticketType];
      }else{
         ticketQueryParams = [startDate, endDate, endDate, startDate, startDate, endDate, endDate, startDate,startDate, endDate, startDate, endDate];
      }
      ticketQuery += ' GROUP BY TPurchaseDate, TType';
      const [ticketData] = await pool.execute(ticketQuery, ticketQueryParams);
      financeData.TicketData = ticketData;
      

    } else if (category === 'dining') {
      if (financeType === 'diningExpense') {
        let diningExpenseQuery = `
          SELECT
            DATE_FORMAT(ExpenseDate, '%Y-%m-%d') AS Date,
            RestaurantType,
            RestaurantName,
            ExpenseType,
            ExpenseAmt AS Total_Expense,
            (
              SELECT COUNT(*)
              FROM restaurant_expense
              WHERE DATE(ExpenseDate) BETWEEN ? AND ?
              ${diningType !== 'allDining' ? ' AND RestaurantType = ?' : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'}
            ) / DATEDIFF(?, ?) AS AvgDailyExpenses,
            (
              SELECT SUM(ExpenseAmt)
              FROM restaurant_expense
              WHERE DATE(ExpenseDate) BETWEEN ? AND ?
              ${diningType !== 'allDining' ? ' AND RestaurantType = ?' : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'}
            ) / DATEDIFF(?, ?) AS AvgDailyExpenseAmt,
            (
              SELECT SUM(ExpenseAmt)
              FROM restaurant_expense
              WHERE DATE(ExpenseDate) BETWEEN ? AND ?
              ${diningType !== 'allDining' ? 'AND RestaurantType = ?' : ' AND RestaurantType IN ("Standard", "Deluxe", "Special")'}
            ) AS TotalExpense
          FROM
            restaurant_expense
          JOIN restaurant ON restaurant.RestaurantID = restaurant_expense.RestaurantID
          WHERE DATE(ExpenseDate) BETWEEN ? AND ?
          `;
    
        let diningExpenseQueryParams;
        if (diningType !== 'allDining') {
          diningExpenseQuery += ' AND RestaurantType = ?';
          diningExpenseQueryParams = [startDate, endDate, diningType, endDate, startDate, startDate, endDate, diningType, endDate, startDate, startDate, endDate, diningType, startDate, endDate, diningType];
        } else {
          diningExpenseQueryParams = [startDate, endDate, endDate, startDate, startDate, endDate, endDate, startDate, ,startDate, endDate,startDate, endDate];
        }
        diningExpenseQuery += ' GROUP BY ExpenseDate, RestaurantType, RestaurantName, ExpenseType, ExpenseAmt ORDER BY ExpenseDate DESC';
        const [diningData] = await pool.execute(diningExpenseQuery, diningExpenseQueryParams);
        financeData.diningData = diningData;

      } else {
        let diningRevenueQuery = `
        SELECT
        DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') AS Date,
        COUNT(*) AS Number_Transactions,
        RestaurantType,
        RestaurantName,
        SUM(Amount) AS Total_Revenue,
        (SELECT COUNT(*) 
         FROM restaurant_transaction
         JOIN restaurant ON restaurant.RestaurantID = restaurant_transaction.RestaurantID
         WHERE DATE(TransactionTimeStamp) BETWEEN ? AND ?
         ${diningType !== 'allDining' ? 'AND RestaurantType = ?' : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'}) / DATEDIFF(?, ?) AS AvgDailySales,
        (SELECT SUM(Amount) 
         FROM restaurant_transaction
         JOIN restaurant ON restaurant.RestaurantID = restaurant_transaction.RestaurantID
         WHERE DATE(TransactionTimeStamp) BETWEEN ? AND ?
         ${diningType !== 'allDining' ? 'AND RestaurantType = ?' : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'}) / DATEDIFF(?, ?) AS AvgDailyRevenue,
        (SELECT SUM(Amount)
         FROM restaurant_transaction
         JOIN restaurant ON restaurant.RestaurantID = restaurant_transaction.RestaurantID
         WHERE DATE(TransactionTimeStamp) BETWEEN ? AND ?
         ${diningType !== 'allDining' ? 'AND RestaurantType = ?' : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'}) AS TotalRevenue
      FROM
        restaurant_transaction
        JOIN restaurant ON restaurant.RestaurantID = restaurant_transaction.RestaurantID
      WHERE
        TransactionTimeStamp BETWEEN ? AND ?
        `;
    
        let diningRevenueQueryParams;
        if (diningType !== 'allDining') {
          diningRevenueQuery += ' AND RestaurantType = ?';
          diningRevenueQueryParams = [startDate, endDate, diningType, endDate, startDate,startDate, endDate, diningType, endDate, startDate, startDate, endDate, diningType, startDate, endDate,diningType];
        } else {
          diningRevenueQueryParams = [startDate, endDate, endDate, startDate,startDate, endDate, endDate, startDate, startDate, endDate, startDate, endDate];
        }
        diningRevenueQuery += ' GROUP BY Date, RestaurantType, RestaurantName';

        const [diningData] = await pool.execute(diningRevenueQuery, diningRevenueQueryParams);
        financeData.diningData = diningData;
      }
      }else if (category === 'merch') {
      if (financeType === 'merchExpense') {
        let merchExpenseQuery = `
          SELECT 
            DATE_FORMAT(DATE(merchandise_order_detail.TransactionDate), '%Y-%m-%d') AS Date,
            merchandise.MType AS ItemType,
            merchandise.MName AS ItemName,
            COUNT(*) AS QuantitySold,
            SUM(merchandise.SupplierCost) AS ExpenseAmt,
            (
              SELECT SUM(merchandise.SupplierCost)
              FROM merchandise_order_detail
              JOIN merchandise ON merchandise.ItemID = merchandise_order_detail.ItemID
              WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
            ) / DATEDIFF(?, ?) AS AvgCost,
            (
              SELECT SUM(merchandise.SupplierCost)
              FROM merchandise_order_detail
              JOIN merchandise ON merchandise.ItemID = merchandise_order_detail.ItemID
              WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
            ) AS TotalExpense
          FROM merchandise
          JOIN merchandise_order_detail ON merchandise.ItemID = merchandise_order_detail.ItemID
          WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
          GROUP BY Date, ItemType, ItemName
          ORDER BY Date;
        `;
    
        const merchExpenseQueryParams = [startDate, endDate, endDate, startDate, startDate, endDate, startDate, endDate];
    
        const [merchData] = await pool.execute(merchExpenseQuery, merchExpenseQueryParams);
        financeData.merchData = merchData;
      } else {
        let merchRevenueQuery = `
          SELECT 
            DATE_FORMAT(DATE(merchandise_order_detail.TransactionDate), '%Y-%m-%d') AS Date,
            merchandise.MType AS ItemType,
            merchandise.MName AS ItemName,
            COUNT(*) AS QuantitySold,
            SUM(merchandise.SellingCost) AS TotalRevenue,
            (
              SELECT COUNT(*)
              FROM merchandise_order_detail
              WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
            ) / DATEDIFF(?, ?) AS AvgDailyTransactions,
            (
              SELECT SUM(merchandise.SellingCost)
              FROM merchandise_order_detail
              JOIN merchandise ON merchandise.ItemID = merchandise_order_detail.ItemID
              WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
            ) / DATEDIFF(?, ?) AS AvgRevenue,
            (
              SELECT SUM(merchandise.SellingCost)
              FROM merchandise_order_detail
              JOIN merchandise ON merchandise.ItemID = merchandise_order_detail.ItemID
              WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
            ) AS TotalRevenuePeriod
          FROM merchandise
          JOIN merchandise_order_detail ON merchandise.ItemID = merchandise_order_detail.ItemID
          WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
          GROUP BY Date, ItemType, ItemName
          ORDER BY Date;
        `;
        const merchRevenueQueryParams = [startDate, endDate, endDate, startDate, startDate, endDate, endDate, startDate, startDate, endDate, startDate, endDate];
    
        const [merchData] = await pool.execute(merchRevenueQuery, merchRevenueQueryParams);
        financeData.merchData = merchData;
      }
    } else if (category === 'maintenance') {
      let maintQuery = `
        SELECT 
          DATE_FORMAT(MRDateSubmitted, '%Y-%m-%d') AS Date,
          MRSubject AS Subject,
          AName AS AttractionN,
          MRCost AS Cost,
          (
            SELECT COUNT(*)
            FROM maintenance_request
            WHERE DATE(MRDateSubmitted) BETWEEN ? AND ?
          ) / DATEDIFF(?, ?) AS AvgDailySubmits,
          (
            SELECT SUM(MRCost)
            FROM maintenance_request
            WHERE DATE(MRDateSubmitted) BETWEEN ? AND ?
          ) / DATEDIFF(?, ?) AS AvgCost,
          (
            SELECT SUM(MRCost)
            FROM maintenance_request
            WHERE DATE(MRDateSubmitted) BETWEEN ? AND ?
          ) AS TotalCost
        FROM maintenance_request
        JOIN attraction ON attraction.AttractionID = maintenance_request.AttractionID
        WHERE MRDateSubmitted BETWEEN ? AND ?
        ORDER BY Date;
      `;
      const maintQueryParams = [startDate, endDate, endDate, startDate, startDate, endDate, endDate, startDate, startDate, endDate, startDate, endDate];
    
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
      let totalProfit = 0;
      let totalRevenue = 0;
      let totalExpense = 0;
      
      
      
      const [profitData] = await pool.execute(profitQuery, profitQueryParams);
      financeData.profitData = profitData;
      for (const entry of financeData.profitData) {
        totalProfit += parseFloat(entry.Profit);
        totalRevenue += parseFloat(entry.Revenue);
        totalExpense += parseFloat(entry.Expense);
      }
      
      console.log(`Total Profit: ${totalProfit}`);
      console.log(`Total Revenue: ${totalRevenue}`);
      console.log(`Total Expense: ${totalExpense}`);
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