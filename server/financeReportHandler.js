const pool = require("./database");
const getPostData = require("./postDataParser");

async function financeDataHandler(req, res) {
  try {
    const {
      startDate,
      endDate,
      category,
      ticketType,
      financeType,
      diningType,

    } = await getPostData(req);

    console.log("Received request:", {
      startDate,
      endDate,
      category,
      ticketType,
      financeType,
      diningType,

    });

    let financeData = {};

    if (category === "tickets") {
      let ticketQuery = `
  SELECT 
  DATE_FORMAT(TPurchaseDate, '%Y-%m-%d') AS Date,
    SUM(CASE WHEN TType = 'Standard' THEN 1 ELSE 0 END) AS Standard_Tickets,
    SUM(CASE WHEN TType = 'Child' THEN 1 ELSE 0 END) AS Child_Tickets,
    SUM(CASE WHEN TType = 'Express' THEN 1 ELSE 0 END) AS Express_Tickets,
    SUM(CASE WHEN TType = 'Standard' THEN TPrice ELSE 0 END) AS Standard_Ticket_Price,
    SUM(CASE WHEN TType = 'Child' THEN TPrice ELSE 0 END) AS Child_Ticket_Price,
    SUM(CASE WHEN TType = 'Express' THEN TPrice ELSE 0 END) AS Express_Ticket_Price,
    (
      SELECT COUNT(*) 
      FROM ticket 
      WHERE DATE(TPurchaseDate) BETWEEN ? AND ?
      ${ticketType !== "allTicket" ? "AND TType = ?" : 'AND TType IN ("Standard", "Express", "Child")'}
    ) / DATEDIFF(?, ?) AS AvgDailyTickets,
    (
      SELECT SUM(TPrice)
      FROM ticket
      WHERE DATE(TPurchaseDate) BETWEEN ? AND ?
      ${ticketType !== "allTicket" ? "AND TType = ?" : 'AND TType IN ("Standard", "Express", "Child")'}
    ) / DATEDIFF(?, ?) AS AvgDailyRevenue,
    (
      SELECT SUM(TPrice)
      FROM ticket
      WHERE DATE(TPurchaseDate) BETWEEN ? AND ?
      ${ticketType !== "allTicket" ? "AND TType = ?" : 'AND TType IN ("Standard", "Express", "Child")'}
    ) AS TotalRevenue
  FROM ticket
  WHERE DATE(TPurchaseDate) BETWEEN ? AND ?
 
`;

      let ticketQueryParams;
      if (ticketType !== "allTicket") {
        ticketQuery += " AND TType = ?";
        ticketQueryParams = [
          startDate,
          endDate,
          ticketType,
          endDate,
          startDate,
          startDate,
          endDate,
          ticketType,
          endDate,
          startDate,
          startDate,
          endDate,
          ticketType,
          startDate,
          endDate,
          ticketType,
        ];
      } else {
        ticketQueryParams = [
          startDate,
          endDate,
          endDate,
          startDate,
          startDate,
          endDate,
          endDate,
          startDate,
          startDate,
          endDate,
          startDate,
          endDate,
        ];
      }
      ticketQuery += "  GROUP BY Date ORDER BY Date;";

      const [ticketData] = await pool.execute(ticketQuery, ticketQueryParams);
      financeData.TicketData = ticketData;
    } else if (category === "dining") {
      if (financeType === "diningExpense") {
        let diningExpenseQuery = `
SELECT
    DATE_FORMAT(ExpenseDate, '%Y-%m-%d') AS Date,
    RestaurantType AS rtype,
    SUM(CASE WHEN ExpenseType = 'Produce'  THEN ExpenseAmt ELSE 0 END) AS Produce_Expense,
    SUM(CASE WHEN ExpenseType = 'Supplies'  THEN ExpenseAmt ELSE 0 END) AS Supplies_Expense,
    SUM(CASE WHEN ExpenseType = 'Utilities' THEN ExpenseAmt ELSE 0 END) AS Utilities_Expense,
    SUM(CASE WHEN RestaurantType = 'Standard' THEN ExpenseAmt ELSE 0 END) AS Standard_Expense,
    SUM(CASE WHEN RestaurantType = 'Deluxe' THEN ExpenseAmt ELSE 0 END) AS Deluxe_Expense,
    SUM(CASE WHEN RestaurantType = 'Special' THEN ExpenseAmt ELSE 0 END) AS Special_Expense,
    SUM(ExpenseAmt) AS Total_Expense,
    (
      SELECT SUM(re.ExpenseAmt)
      FROM restaurant_expense re
      JOIN restaurant r ON r.RestaurantID = re.RestaurantID
      WHERE DATE(re.ExpenseDate) BETWEEN ? AND ?
      
      ${diningType !== 'allDining' ? 'AND r.RestaurantType = ?' : 'AND r.RestaurantType IN ("Standard", "Deluxe", "Special")'}
      
  ) / DATEDIFF(?, ?) AS AvgDailyExpenseAmt,
    (
      SELECT SUM(re.ExpenseAmt)
      FROM restaurant_expense re
      JOIN restaurant r ON r.RestaurantID = re.RestaurantID
      WHERE DATE(re.ExpenseDate) BETWEEN ? AND ?
      
      ${diningType !== 'allDining' ? 'AND r.RestaurantType = ?' : 'AND r.RestaurantType IN ("Standard", "Deluxe", "Special")'}
        
    ) AS TotalExpense
FROM
    restaurant_expense
JOIN restaurant ON restaurant.RestaurantID = restaurant_expense.RestaurantID
WHERE DATE(ExpenseDate) BETWEEN ? AND ?

`;
console.log("Received request:", {
  startDate,
  endDate,
  category,
  ticketType,
  financeType,
  diningType,

});
let diningExpenseQueryParams;
if (diningType !== "allDining") {
    diningExpenseQueryParams = [
        startDate,
        endDate,
        diningType,
        endDate,
        startDate,
        startDate,
        endDate,
        diningType,
        startDate,
        endDate,
    ];
} else {
    diningExpenseQueryParams = [
        startDate,
        endDate,
        endDate,
        startDate,
        startDate,
        endDate,
        startDate,
        endDate
    ];
}
diningExpenseQuery +=" GROUP BY Date, RestaurantType ORDER BY Date;";

const [diningData] = await pool.execute(
    diningExpenseQuery,
    diningExpenseQueryParams
);
financeData.diningData = diningData;
      } else {
        let diningRevenueQuery = `SELECT
        DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') AS Date,
        SUM(CASE WHEN RestaurantType = 'Standard' THEN Quantity ELSE 0 END) AS Standard_Transactions,
        SUM(CASE WHEN RestaurantType = 'Deluxe' THEN Quantity ELSE 0 END) AS Deluxe_Transactions,
        SUM(CASE WHEN RestaurantType = 'Special' THEN Quantity ELSE 0 END) AS Special_Transactions,
        SUM(CASE WHEN RestaurantType = 'Standard' THEN TotalAmount ELSE 0 END) AS Standard_Revenue,
        SUM(CASE WHEN RestaurantType = 'Deluxe' THEN TotalAmount ELSE 0 END) AS Deluxe_Revenue,
        SUM(CASE WHEN RestaurantType = 'Special' THEN TotalAmount ELSE 0 END) AS Special_Revenue,
        (
            SELECT COUNT(*)
            FROM view_restaurant_transaction_extended
            WHERE DATE(TransactionTimeStamp) BETWEEN ? AND ?
            ${diningType !== 'allDining' ? 'AND RestaurantType = ?' : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'}
        ) / DATEDIFF(?, ?) AS AvgDailySales,
        (
            SELECT SUM(TotalAmount)
            FROM view_restaurant_transaction_extended
            WHERE DATE(TransactionTimeStamp) BETWEEN ? AND ?
            ${diningType !== 'allDining' ? 'AND RestaurantType = ?' : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'}
        ) / DATEDIFF(?, ?) AS AvgDailyRevenue,
        (
            SELECT SUM(TotalAmount)
            FROM view_restaurant_transaction_extended
            WHERE DATE(TransactionTimeStamp) BETWEEN ? AND ?
            ${diningType !== 'allDining' ? 'AND RestaurantType = ?' : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'}
        ) AS TotalRevenue
    FROM view_restaurant_transaction_extended
    WHERE DATE(TransactionTimeStamp) BETWEEN ? AND ?
    ${diningType !== 'allDining' ? 'AND RestaurantType = ?' : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'}
        `;
        
   
            


      let diningRevenueQueryParams;
      if (diningType !== 'allDining') {
          diningRevenueQueryParams = [
              startDate, endDate, diningType, endDate, startDate,
              startDate, endDate, diningType, endDate, startDate,
              startDate, endDate, diningType, startDate, endDate,
              diningType
          ];
      } else {
          diningRevenueQueryParams = [
              startDate, endDate, endDate, startDate,
              startDate, endDate, endDate, startDate,
              startDate, endDate,startDate, endDate
          ];
      }
        diningRevenueQuery +="GROUP BY Date ORDER BY Date;"
        const [diningData] = await pool.execute(
          diningRevenueQuery,
          diningRevenueQueryParams
        );
        financeData.diningData = diningData;
      }
    } else if (category === "merch") {
      if (financeType === "merchExpense") {
        let merchExpenseQuery = `
        SELECT
        DATE_FORMAT(DATE(merchandise_order_detail.TransactionDate), '%Y-%m-%d') AS Date,
        merchandise.MType AS ItemType,
        merchandise.MName AS ItemName,
        SUM(merchandise_order_detail.quantity) AS QuantitySold,
        SUM(merchandise.SupplierCost * merchandise_order_detail.quantity) AS ExpenseAmt,
        (
            SELECT SUM(merchandise.SupplierCost * merchandise_order_detail.quantity)
            FROM merchandise_order_detail
            JOIN merchandise ON merchandise.ItemID = merchandise_order_detail.ItemID
            WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
        ) / DATEDIFF(?, ?) AS AvgCost,
        (
            SELECT SUM(merchandise.SupplierCost * merchandise_order_detail.quantity)
            FROM merchandise_order_detail
            JOIN merchandise ON merchandise.ItemID = merchandise_order_detail.ItemID
            WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
        ) AS TotalExpense
    FROM merchandise_order_detail
    JOIN merchandise ON merchandise.ItemID = merchandise_order_detail.ItemID
    WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
    GROUP BY Date, ItemType, ItemName
    ORDER BY Date;
        `;

        const merchExpenseQueryParams = [
          startDate,
          endDate,
          endDate,
          startDate,
          startDate,
          endDate,
          startDate,
          endDate,
        ];

        const [merchData] = await pool.execute(
          merchExpenseQuery,
          merchExpenseQueryParams
        );
        financeData.merchData = merchData;
      } else {
        let merchRevenueQuery = `
        SELECT
        DATE_FORMAT(DATE(merchandise_order_detail.TransactionDate), '%Y-%m-%d') AS Date,
        merchandise.MType AS ItemType,
        merchandise.MName AS ItemName,
        SUM(merchandise_order_detail.quantity) AS QuantitySold,
        SUM(merchandise.SellingCost * merchandise_order_detail.quantity) AS TotalRevenue,
        (
            SELECT SUM(merchandise_order_detail.quantity)
            FROM merchandise_order_detail
            WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
        ) / DATEDIFF(?, ?) AS AvgDailyTransactions,
        (
            SELECT SUM(merchandise.SellingCost * merchandise_order_detail.quantity)
            FROM merchandise_order_detail
            JOIN merchandise ON merchandise.ItemID = merchandise_order_detail.ItemID
            WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
        ) / DATEDIFF(?, ?) AS AvgRevenue,
        (
            SELECT SUM(merchandise.SellingCost * merchandise_order_detail.quantity)
            FROM merchandise_order_detail
            JOIN merchandise ON merchandise.ItemID = merchandise_order_detail.ItemID
            WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
        ) AS TotalRevenuePeriod
    FROM merchandise_order_detail
    JOIN merchandise ON merchandise.ItemID = merchandise_order_detail.ItemID
    WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
    GROUP BY Date, ItemType, ItemName
    ORDER BY Date;
        `;
        const merchRevenueQueryParams = [
          startDate,
          endDate,
          endDate,
          startDate,
          startDate,
          endDate,
          endDate,
          startDate,
          startDate,
          endDate,
          startDate,
          endDate,
        ];

        const [merchData] = await pool.execute(
          merchRevenueQuery,
          merchRevenueQueryParams
        );
        financeData.merchData = merchData;
      }
    } else if (category === "maintenance") {
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
        WHERE DATE(MRDateSubmitted) BETWEEN ? AND ?
        ORDER BY Date;
      `;
      const maintQueryParams = [
        startDate,
        endDate,
        endDate,
        startDate,
        startDate,
        endDate,
        endDate,
        startDate,
        startDate,
        endDate,
        startDate,
        endDate,
      ];

      const [maintData] = await pool.execute(maintQuery, maintQueryParams);
      financeData.maintData = maintData;
    } else if (category === "all") {
      const profitQuery = `
      WITH profit_data AS (
        SELECT
          DATE(TransactionTimeStamp) AS date,
          'Dining' AS department,
          SUM(TotalAmount) AS revenue,
          0 AS expenses
        FROM view_restaurant_transaction_extended
        GROUP BY DATE(TransactionTimeStamp)
        UNION ALL
        SELECT
          DATE(TransactionDate),
          'Merchandise' AS department,
          SUM(mo.quantity * merch.SellingCost) AS revenue,
          SUM(mo.quantity * merch.SupplierCost) AS expenses
        FROM merchandise_order_detail AS mo
        JOIN merchandise AS merch ON mo.ItemID = merch.ItemID
        GROUP BY DATE(TransactionDate)
        UNION ALL
        SELECT
          DATE(MRDateSubmitted),
          'Maintenance' AS department,
          0 AS revenue,
          SUM(MRCost) AS expenses
        FROM maintenance_request
        GROUP BY DATE(MRDateSubmitted)
        UNION ALL
        SELECT
          DATE(ExpenseDate),
          'Dining' AS department,
          0 AS revenue,
          SUM(ExpenseAmt) AS expenses
        FROM restaurant_expense
        GROUP BY DATE(ExpenseDate)
        UNION ALL
        SELECT
          DATE(TPurchaseDate),
          'Tickets' AS department,
          SUM(TPrice) AS revenue,
          0 AS expenses
        FROM ticket
        GROUP BY DATE(TPurchaseDate)
      ),
      totals AS (
        SELECT
          SUM(revenue) AS total_revenue,
          SUM(expenses) AS total_expenses,
          SUM(revenue) - SUM(expenses) AS total_profit
        FROM profit_data
        WHERE date BETWEEN ? AND ?
      )
      SELECT
      DATE_FORMAT(date, '%Y-%m-%d') AS date,
              department,
        SUM(revenue) AS revenue,
        SUM(expenses) AS expenses,
        SUM(revenue) - SUM(expenses) AS profit,
        (SELECT total_revenue FROM totals) AS total_revenue,
        (SELECT total_expenses FROM totals) AS total_expenses,
        (SELECT total_profit FROM totals) AS total_profit
      FROM profit_data
      WHERE date BETWEEN ? AND ?
      GROUP BY date, department
      ORDER BY date;
    `;

    const profitQueryParams = [
      startDate,
      endDate,
      startDate,
      endDate,
    ];

  

    const [profitData] = await pool.execute(profitQuery, profitQueryParams);
    financeData.profitData = profitData;
    
    
  }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(financeData));
  } catch (error) {
    console.error("Error retrieving finance data:", error.message);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}

module.exports = financeDataHandler;
