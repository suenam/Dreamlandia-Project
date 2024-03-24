// weatherHandler.js
const pool = require('./database');
const getPostData = require('./postDataParser');

async function weatherHandler(req, res) {
  try {
    const { WeatherCondition, WDate } = await getPostData(req);

    const [result] = await pool.execute(
      'CALL InsertOrUpdateWeatherLog(?, ?)',
      [WDate, WeatherCondition]
    );
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Weather inputted successfully' }));
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_SIGNAL_EXCEPTION' || error.sqlState === '45000') {
      // If it is a trigger error, return a 400 status code
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'No update needed: The weather condition is the same as the existing record.' }));
  } else {
      // If it is another type of database error, return a 500 status code
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error logging weather', error: error.toString() }));
  }
  }
}


module.exports = weatherHandler;
