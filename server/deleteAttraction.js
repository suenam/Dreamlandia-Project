const pool = require('./database');
const getPostData = require('./postDataParser');

async function deleteAttraction(req, res, id) {
  try {
    // Delete from attraction table
    const [result] = await pool.execute('UPDATE attraction SET AActive=0 WHERE AttractionID = ?', [id]);

    
    if (result.affectedRows > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Attraction deleted successfully' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Attraction not found' }));
    }
  } catch (error) {
    console.error('Error deleting attraction:', error);
  }
}

module.exports = deleteAttraction;

module.exports = deleteAttraction;