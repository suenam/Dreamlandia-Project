const pool = require('./database');

async function getRestaurant(req, res) {
  try {
    const [result] = await pool.execute('SELECT * FROM restaurant where RActive = 1');
    const restaurants = result.map((row) => ({
      id: row.RestaurantID,
      name: row.RestaurantName,
      image: row.RImage,
      description: row.RDescription,
      type: row.RestaurantType,
      amount: row.Amount,
    }));
    console.log(restaurants);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ restaurants }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error fetching restaurants', error: error.toString() }));
  }
}

module.exports = getRestaurant;