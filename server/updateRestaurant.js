const pool = require('./database');

async function updateRestaurant(req, res) {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const {UPDATEDRestaurantName, UPDATEDRestaurantType, UPDATEDAmount, UPDATEDRImage, UPDATEDRDescription, UPDATEDRestaurantID} = JSON.parse(body);
        const [result] = await pool.execute(
          'UPDATE restaurant SET RestaurantName = ?, RestaurantType = ?, Amount = ?, RImage = ?, RDescription = ? WHERE RestaurantID = ?',
          [UPDATEDRestaurantName, UPDATEDRestaurantType, UPDATEDAmount, UPDATEDRImage, UPDATEDRDescription, UPDATEDRestaurantID]
        );
        if (result.affectedRows > 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'restaurant updated successfully' }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'restaurant not found' }));
        }
      } catch (error) {
        console.error('Error in restaurant:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error updating restaurant', error: error.message }));
      }
    });
  } catch (error) {
    console.error('Error in restaurant:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error updating restaurant', error: error.message }));
  }
}

module.exports = updateRestaurant;