const pool = require('./database');

async function updateAttraction(req, res) {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const { UPDATEid, UPDATEDname, description, shortDescription, thrill, height, image } = JSON.parse(body);
        const [result] = await pool.execute(
          'UPDATE attraction SET AName = ?, ADescription = ?, ShortDescription = ?, AThrillLevel = ?, AHeightRequirement = ?, image = ? WHERE attractionID = ?',
          [UPDATEDname, description, shortDescription, thrill, height, image, UPDATEid]
        );
        if (result.affectedRows > 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Attraction updated successfully', UPDATEDname }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Attraction not found' }));
        }
      } catch (error) {
        console.error('Error in updateAttraction:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error updating attraction', error: error.message }));
      }
    });
  } catch (error) {
    console.error('Error in updateAttraction:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error updating attraction', error: error.message }));
  }
}

module.exports = updateAttraction;