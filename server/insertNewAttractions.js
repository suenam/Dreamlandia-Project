const pool = require('./database');
const getPostData = require('./postDataParser');

async function insertNewAttractions(req, res) {
  try {
    const {
      name,
      type,
      description,
      shortDescription,
      thrillLevel,
      heightRequirement,
      status,
      image,
    } = await getPostData(req);

    const [result] = await pool.execute(
      'INSERT INTO attraction (AName, AType, ADescription, ShortDescription, AThrillLevel, AHeightRequirement, AStatus, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        type,
        description,
        shortDescription,
        thrillLevel,
        heightRequirement,
        status,
        image,
      ]
    );

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: 'Attraction added successfully', attractionId: result.insertId })
    );
  } catch (error) {
    console.error('Error adding attraction:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error adding attraction', error: error.toString() }));
  }
}

module.exports = insertNewAttractions;