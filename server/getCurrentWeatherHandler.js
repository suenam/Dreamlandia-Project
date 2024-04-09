const pool = require('./database');

async function getCurrentWeatherHandler(req, res) {
  try {
    const currentDate = new Date();
    const month = `${currentDate.getMonth()+1}`.padStart(2, '0');
    const day = `${currentDate.getDate()}`.padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`
    const [result] = await pool.execute(
      "SELECT WeatherCondition FROM weather_log WHERE Wdate = ?", [formattedDate]
    );

    console.log(formattedDate);


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