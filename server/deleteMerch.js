const pool = require('./database');
const getPostData = require('./postDataParser');

async function deleteMerch(req, res, id) {
  try {
    console.log(id);
    const [result] = await pool.execute('UPDATE merchandise set MActive=0 WHERE ItemID = ?', [id]);
  } catch (error) {
    console.error('Error deleting merch:', error);
  }
}

module.exports = deleteMerch;