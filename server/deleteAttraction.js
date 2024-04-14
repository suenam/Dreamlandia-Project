const pool = require('./database');
const getPostData = require('./postDataParser');

async function deleteAttraction(req, res, id) {
  try {
    // Delete from attraction_joint table
    await pool.execute('DELETE FROM attraction_joint WHERE AttractionID = ?', [id]);
    await pool.execute('DELETE FROM maintenance_request WHERE AttractionID = ?', [id]);

    // Delete from attraction table
    const [result] = await pool.execute('DELETE FROM attraction WHERE AttractionID = ?', [id]);

    

  } catch (error) {
    console.error('Error deleting attraction:', error);
  }
}

module.exports = deleteAttraction;

module.exports = deleteAttraction;