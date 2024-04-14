//merch
const pool = require('./database');

async function getMerch(req, res) {
  try {
    const [result] = await pool.execute('SELECT * FROM merchandise');
    const merchandise = result.map((row) => ({
      name: row.MName,
      image: row.MImage,
      type: row.MType,
      sellingCost: row.SellingCost,
      supplierCost: row.SupplierCost
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ merchandise }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error fetching merchandise', error: error.toString() }));
  }
}

module.exports = getMerch;