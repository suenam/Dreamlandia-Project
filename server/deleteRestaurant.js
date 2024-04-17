const pool = require('./database');
const getPostData = require('./postDataParser');

async function deleteRestaurant(req, res, id) {
  try {
    console.log(id);
    const [result] = await pool.execute('UPDATE restaurant set RActive=0 WHERE RestaurantID = ?', [id]);
    if (result.affectedRows > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Restaurant deleted successfully' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Restaurant not found' }));
    }
  } catch (error) {
    console.error('Error deleting restaurant:', error);
  }
}

module.exports = deleteRestaurant;