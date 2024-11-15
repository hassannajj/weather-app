const { fetchWeatherApi } = require('openmeteo');

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

async function getWeatherData(latitude, longitude) {
  if (!latitude || !longitude) {
    throw new Error('Latitude and longitude are required');
  }

  const params = {
    latitude,
    longitude,
    hourly: ['temperature_2m',"precipitation_probability"],
    "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_sum"],
    temperature_unit: "fahrenheit"


  };

  const url = 'https://api.open-meteo.com/v1/forecast';

  try {
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();

    const hourly = response.hourly();
    const daily = response.daily();

    const weatherData = {
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0).valuesArray(),
        precipitationProbability: hourly.variables(1).valuesArray(),

      },
      daily: {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        weatherCode: daily.variables(0).valuesArray(),
        temperature2mMax: daily.variables(1).valuesArray(),
        temperature2mMin: daily.variables(2).valuesArray(),
        precipitationSum: daily.variables(3).valuesArray(),
      },
    };

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

module.exports = { getWeatherData };
