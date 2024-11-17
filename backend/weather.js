const { fetchWeatherApi } = require('openmeteo');
const { DateTime } = require('luxon');

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

async function getWeatherData(latitude, longitude) {
  if (!latitude || !longitude) {
    throw new Error('Latitude and longitude are required');
  }

  const params = {
    latitude,
    longitude,
    hourly: ['temperature_2m', "precipitation_probability"],
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_probability_max"],
    temperature_unit: "fahrenheit",
    timezone: "America/Los_Angeles", // PST
  };

  const url = 'https://api.open-meteo.com/v1/forecast';

  try {
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const timezone = response.timezone();
    console.log('timezone:', timezone); // Make sure this is correct
    const timezoneAbbreviation = response.timezoneAbbreviation();

    const hourly = response.hourly();
    const daily = response.daily();

    console.log('Raw hourly times:', hourly.time());
    console.log('Raw daily times:', daily.time());

    const weatherData = {
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => {
          const adjustedTime = new Date((t + utcOffsetSeconds) * 1000);
          console.log('Adjusted hourly time:', adjustedTime);
          return adjustedTime;
        }),
        temperature2m: hourly.variables(0).valuesArray(),
        precipitationProbability: hourly.variables(1).valuesArray(),
      },
      daily: {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => {
            const adjustedTime = new Date((t + utcOffsetSeconds) * 1000);
            console.log('Adjusted daily time:', adjustedTime);
            return adjustedTime;
          }
        ),
        weatherCode: daily.variables(0).valuesArray(),
        temperature2mMax: daily.variables(1).valuesArray(),
        temperature2mMin: daily.variables(2).valuesArray(),
        precipitationProbabilityMax: daily.variables(3).valuesArray(),
      },
    };

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

module.exports = { getWeatherData };
