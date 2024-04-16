const pool = require('./database');
const getPostData = require('./postDataParser');

async function deleteAttraction(req, res, id) {
  try {
    // Delete from attraction table
    const [result] = await pool.execute('UPDATE attraction SET AActive=0 WHERE AttractionID = ?', [id]);

    

  } catch (error) {
    console.error('Error deleting attraction:', error);
  }
}

module.exports = deleteAttraction;

module.exports = deleteAttraction;