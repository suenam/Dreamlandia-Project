//attractions
const pool = require('./database');

async function getAttractions(req, res) {
  try {
    const [result] = await pool.execute('SELECT * FROM attraction');
    const attractions = result.map((row) => ({
      name: row.AName,
      image: row.image,
      description: row.ADescription,
      shortDescription: row.ShortDescription,
      thrillLevel: row.AThrillLevel,
      heightRequirement: row.AHeightRequirement,
      status: row.AStatus,
      attractionID: row.AttractionID
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ attractions }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error fetching attractions', error: error.toString() }));
  }
}

module.exports = getAttractions;