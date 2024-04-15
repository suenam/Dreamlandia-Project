const pool = require('./database');
const getPostData = require('./postDataParser');

async function deleteMerch(req, res, id) {
  try {
    console.log(id);
    await pool.execute('DELETE FROM merchandise_order_detail WHERE ItemID = ?', [id]);
    const [result] = await pool.execute('DELETE FROM merchandise WHERE ItemID = ?', [id]);
  } catch (error) {
    console.error('Error deleting merch:', error);
  }
}

module.exports = deleteMerch;