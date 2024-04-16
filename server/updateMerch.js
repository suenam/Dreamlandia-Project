const pool = require('./database');

async function updateMerch(req, res) {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const {newMerchName, newMerchType, newSupplierCost, newSellingCost, newImageMerch, merchIDUpdate} = JSON.parse(body);
        const [result] = await pool.execute(
          'UPDATE merchandise SET MName = ?, MType = ?, SupplierCost = ?, SellingCost = ?, MImage = ? WHERE ItemID = ?',
          [ newMerchName, newMerchType, newSupplierCost, newSellingCost, newImageMerch, merchIDUpdate]
        );
        if (result.affectedRows > 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Merch updated successfully' }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Merch not found' }));
        }
      } catch (error) {
        console.error('Error in Merchupdate:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error updating Merch', error: error.message }));
      }
    });
  } catch (error) {
    console.error('Error in Merchupdate:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error updating Merch', error: error.message }));
  }
}

module.exports = updateMerch;