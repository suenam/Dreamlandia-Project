const pool = require('./database');
const getPostData = require('./postDataParser');

async function deleteRestaurant(req, res, id) {
  try {
    console.log(id);
    const [result] = await pool.execute('UPDATE restaurant set RActive=0 WHERE RestaurantID = ?', [id]);
  } catch (error) {
    console.error('Error deleting restaurant:', error);
  }
}

module.exports = deleteRestaurant;