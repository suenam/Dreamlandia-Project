const pool = require('./database');
const getPostData = require('./postDataParser');

async function restaurantExpenseHandler(req, res) {
  try {
    const { StaffID, RestaurantID, 
        ExpenseAmt, ExpenseDate, ExpenseType } = await getPostData(req);
    

    const [result] = await pool.execute(
      'INSERT INTO restaurant_expense ( StaffID, RestaurantID, ExpenseAmt, ExpenseDate, ExpenseType) VALUES (?, ?, ?, ?, ?)',
      [StaffID, RestaurantID, ExpenseAmt, ExpenseDate, ExpenseType]
    );

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Expense submitted successfully' }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error submitting expense', error: error.toString() }));
  }
}

module.exports = restaurantExpenseHandler;