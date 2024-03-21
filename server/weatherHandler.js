// weatherHandler.js
const pool = require('./database');
const getPostData = require('./postDataParser');

async function weatherHandler(req, res) {
    try {
      const { WeatherCondition, WDate} = await getPostData(req);

      const [result] = await pool.execute(
        'INSERT INTO weather_log (WeatherCondition, WDate) VALUES (?,?)',
        [WeatherCondition, WDate]
      );

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Weather inputted successfully' }));
    } catch (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error inputting weather', error: error.toString() }));
    }
  }


module.exports = weatherHandler;
