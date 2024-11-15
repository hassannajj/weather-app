const express = require('express');
const cors = require('cors');
const { getWeatherData } = require('./weather');
const { getCityData } = require('./city');

const app = express();
app.use(cors());
const port = 5000;

app.get('/weather', async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).send('Latitude and longitude are required.');
  }

  try {
    const weatherData = await getWeatherData(parseFloat(latitude), parseFloat(longitude));
    res.json(weatherData);

  } catch (error) {
    const err_msg = 'Error fetching weather data';
    console.error(err_msg, error);
    res.status(500).send(err_msg);
  }
}
);

app.get('/city', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).send('City name is required.');
  }

  try {
    const cityData = await getCityData(name);
    console.log("got city data:", cityData);
    res.json(cityData);

  } catch (error) {
    const err_msg = 'Error fetching city data';
    console.error(err_msg, error);
    res.status(500).send(err_msg);
  }
});

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
