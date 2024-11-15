import { useState } from 'react';
import './App.css';
import CitySearch from './citySearch';
import { useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [cityData, setCityData] = useState(null);


  function fetchWeather(latitude, longitude) {
    console.log('fetching weather data', latitude, longitude);
    fetch(`http://localhost:5000/weather?latitude=${latitude}&longitude=${longitude}`)
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }


  function fetchCity(cityName) {
    fetch(`http://localhost:5000/city?name=${cityName}`)
      .then((res) => res.json())
      .then((data) => {
        setCityData(data); 
      })
      .catch((error) => console.error('Error fetching city data:', error));
  }

  useEffect(() => {
    if (cityData && cityData.length > 0) {
      fetchWeather(cityData[0].latitude, cityData[0].longitude);
    }
  }, [cityData]);

  return (
    <div>
      <h1>Weather Data</h1>
      <CitySearch 
        onSearch={fetchCity}
      />
      {weatherData && (
        <div>
          <h2>Hourly Temperature:</h2>
          <ul>
            {weatherData.hourly.time.map((time, index) => (
              <li key={index}>
                {new Date(time).toLocaleString()}: {weatherData.hourly.temperature2m[index]}°C
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
