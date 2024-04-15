const pool = require('./database');
const getPostData = require('./postDataParser');

async function addMerch(req, res) {
  try {
    const {
        name,
        type,
        supplierCost,
        sellingCost,
        image,
    } = await getPostData(req);
    console.log({ name,
        type,
        supplierCost,
        sellingCost,
        image})
    const [result] = await pool.execute(
      'INSERT INTO merchandise (MName, MType, SupplierCost, SellingCost, MImage) VALUES (?, ?, ?, ?, ?)',
      [
        name,
        type,
        supplierCost,
        sellingCost,
        image,
      ]
    );

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: 'merch added successfully', attractionId: result.insertId })
    );
  } catch (error) {
    console.error('Error adding merch:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error adding merch', error: error.toString() }));
  }
}

module.exports = addMerch;