const pool = require('./database');
const getPostData = require('./postDataParser');

async function addRestaurant(req, res) {
  try {
    const {
      name,
      type,
      amount,
      image,
      description,
    } = await getPostData(req);
    console.log({ name,
      type,
      amount,
      image,
      description,})
    const [result] = await pool.execute(
      'INSERT INTO restaurant (RestaurantName, RestaurantType, Amount, RImage, RDescription) VALUES (?, ?, ?, ?, ?)',
      [
        name,
        type,
        amount,
        image,
        description,
      ]
    );

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: 'restaurant added successfully', restaurantID: result.insertId })
    );
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error adding restaurant', error: error.toString() }));
  }
}

module.exports = addRestaurant;