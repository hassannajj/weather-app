import { useState, useEffect } from 'react';
import './App.css';
import CitySearch from './citySearch';
import Chart from './Chart';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (index) => {
    const dateStr = new Date(weatherData.daily.time[index]);
    setSelectedDay(index); 
    setIsChartVisible(true);
  };

  const handleBackClick = () => {
    setIsChartVisible(false);
  };

  function fetchWeather(latitude, longitude) {
    fetch(`http://localhost:5000/weather?latitude=${latitude}&longitude=${longitude}`)
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }

  function fetchCity(cityName) {
    fetch(`http://localhost:5000/city?name=${cityName}`)
      .then((res) => res.json())
      .then((data) => setCityData(data))
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

      {!isChartVisible && (
        <div>
          <CitySearch onSearch={fetchCity} />
          
          {weatherData && (
            <div className="weather-card">
              <h2>7 Day Forecast for:</h2>
              <h2>{cityData[0].name}</h2>
              <div className="forecast-list">
                {weatherData.daily.time.map((time, index) => (
                  <div
                    key={index}
                    onClick={() => handleDayClick(index)}
                    className="weather-card-item"
                  >
                    <p className="weather-date">{new Date(time).toDateString()}</p>
                    <p className="weather-temp">
                      Max: {weatherData.daily.temperature2mMax[index].toPrecision(2)}°F
                    </p>
                    <p className="weather-temp">
                      Min: {weatherData.daily.temperature2mMin[index].toPrecision(2)}°F
                    </p>
                    <p className="weather-precipitation">
                      Precipitation: {weatherData.daily.precipitationProbabilityMax[index]} %
                    </p>
                  </div>
                ))}
              </div>
              
            </div>
          )}
        </div>
      )}
  
      {isChartVisible && selectedDay !== null && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleBackClick} className="back-button">← Back</button>
          <h3>Hourly Temperature for {cityData[0].name}</h3>
          <h3>{new Date(weatherData.daily.time[selectedDay]).toDateString()}</h3>
          <Chart 
            timestamps={weatherData.hourly.time} 
            temperatures={weatherData.hourly.temperature2m}
            rainfall={weatherData.hourly.precipitationProbability} 
            selectedDay={selectedDay} 
          />
        </div>
      )}
            <h3>Hassan Al-Najjar</h3>
      <p class="pm-desc">The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.

Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.
</p>
      
    </div>
  );
}

export default App;
