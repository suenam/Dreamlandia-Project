const pool = require('./database');
// const getPostData = require('./postDataParser');

async function getCurrentWeatherHandler(req, res) {
  try {
    // const { WDate } = await getPostData(req);
    const [result] = await pool.execute(
      "SELECT WeatherCondition FROM weather_log WHERE WDate = DATE(CONVERT_TZ(UTC_TIMESTAMP(), '+00:00', '-06:00'))"
    );

    const requests = result.map((row) => ({
        weatherStatus: row.WeatherCondition
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ requests }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error fetching attraction statuses', error: error.toString() }));
  }
}

module.exports = getCurrentWeatherHandler;