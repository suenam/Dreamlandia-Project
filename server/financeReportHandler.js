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
        SELECT SUM(ExpenseAmt)
        FROM restaurant_expense
        WHERE DATE(ExpenseDate) BETWEEN ? AND ?
        ${
            diningType !== "allDining"
                ? "AND RestaurantType = ?"
                : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'
        }
    ) / DATEDIFF(?, ?) AS AvgDailyExpenseAmt,
    (
        SELECT SUM(ExpenseAmt)
        FROM restaurant_expense
        WHERE DATE(ExpenseDate) BETWEEN ? AND ?
        ${
            diningType !== "allDining"
                ? "AND RestaurantType = ?"
                : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'
        }
    ) AS TotalExpense
FROM
    restaurant_expense
JOIN restaurant ON restaurant.RestaurantID = restaurant_expense.RestaurantID
WHERE DATE(ExpenseDate) BETWEEN ? AND ?
${
    diningType !== "allDining"
        ? "AND RestaurantType = ?"
        : 'AND RestaurantType IN ("Standard", "Deluxe", "Special")'
}

`;

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
        diningType
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
diningExpenseQuery +="GROUP BY Date, RestaurantType ORDER BY Date;";

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
      let profitQuery = `
      SELECT
      DATE_FORMAT(TPurchaseDate, '%Y-%m-%d') AS Date,
    'Tickets' AS Department,
    COALESCE(Tickets_Revenue, 0) AS Revenue,
    0 AS Expense,
    COALESCE(Tickets_Revenue, 0) AS Profit
FROM (
    SELECT
        DATE_FORMAT(TPurchaseDate, '%Y-%m-%d') AS Date,
        SUM(TPrice) AS Tickets_Revenue
    FROM ticket
    WHERE DATE(TPurchaseDate) BETWEEN ? AND ?
    GROUP BY Date
) AS TicketsData

UNION ALL

SELECT
    Date,
    'Dining' AS Department,
    COALESCE(Dining_Revenue, 0) AS Revenue,
    COALESCE(Dining_Expense, 0) AS Expense,
    COALESCE(Dining_Revenue, 0) - COALESCE(Dining_Expense, 0) AS Profit
FROM (
    SELECT
        DATE_FORMAT(TransactionTimeStamp, '%Y-%m-%d') AS Date,
        SUM(TotalAmount) AS Dining_Revenue,
        SUM(ExpenseAmt) AS Dining_Expense
    FROM view_restaurant_transaction_extended
    JOIN restaurant_expense ON view_restaurant_transaction_extended.RestaurantID = restaurant_expense.RestaurantID
    WHERE DATE(TransactionTimeStamp) BETWEEN ? AND ?
    GROUP BY Date
) AS DiningData

UNION ALL

SELECT
    Date,
    'Merchandise' AS Department,
    COALESCE(Merchandise_Revenue, 0) AS Revenue,
    COALESCE(Merchandise_Expense, 0) AS Expense,
    COALESCE(Merchandise_Revenue, 0) - COALESCE(Merchandise_Expense, 0) AS Profit
FROM (
    SELECT
        DATE_FORMAT(merchandise_order_detail.TransactionDate, '%Y-%m-%d') AS Date,
        SUM(SellingCost) AS Merchandise_Revenue,
        SUM(SupplierCost) AS Merchandise_Expense
    FROM merchandise
    JOIN merchandise_order_detail ON merchandise.ItemID = merchandise_order_detail.ItemID
    WHERE DATE(merchandise_order_detail.TransactionDate) BETWEEN ? AND ?
    GROUP BY Date
) AS MerchandiseData

UNION ALL

SELECT
    Date,
    'Maintenance' AS Department,
    0 AS Revenue,
    COALESCE(SUM(MRCost), 0) AS Expense,
    -COALESCE(SUM(MRCost), 0) AS Profit
FROM maintenance_request
WHERE DATE(MRDateSubmitted) BETWEEN ? AND ?
GROUP BY Date

ORDER BY Date, Department;
`;
      const profitQueryParams = [
        startDate,
        endDate,
        startDate,
        endDate,
        startDate,
        endDate,
        startDate,
        endDate,
        startDate,
        endDate,
      ];
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

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(financeData));
  } catch (error) {
    console.error("Error retrieving finance data:", error.message);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}

module.exports = financeDataHandler;
