const pool = require('./database');
const getPostData = require('./postDataParser');

async function deleteMerch(req, res, id) {
  try {
    console.log(id);
    const [result] = await pool.execute('UPDATE merchandise set MActive=0 WHERE ItemID = ?', [id]);
    if (result.affectedRows > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'merchandise deleted successfully' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'merchandise not found' }));
    }
  } catch (error) {
    console.error('Error deleting merch:', error);
  }
}

module.exports = deleteMerch;