import { useState } from 'react';
import './App.css';
import CitySearch from './citySearch';
import { useEffect } from 'react';
import Chart from './Chart';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (index) => {
    const dateStr = new Date(weatherData.daily.time[index]);

    // 'YYYY-MM-DD' format
    const formattedDate = dateStr.toISOString().split('T')[0];
    setSelectedDay(index); 
    setIsChartVisible(true);
  };

  const handleBackClick = () => {
    setIsChartVisible(false);
  };



  function fetchWeather(latitude, longitude) {
    console.log('fetching weather data', latitude, longitude);
    fetch(`http://localhost:5000/weather?latitude=${latitude}&longitude=${longitude}`)
      .then((res) => res.json())
      .then((data) => setWeatherData(data)
      )
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
      console.log('cityData:', cityData); 
      console.log('weatherData:', weatherData);
    }
  }, [cityData]);



  return (
    <div>
      <h1>Weather Data</h1>
      
      {!isChartVisible && (
        <div>
          <CitySearch onSearch={fetchCity} />
          
          {weatherData && (
            <div>
              <h2>7 Day Forecast:</h2>
              <ul>
                {weatherData.daily.time.map((time, index) => (
                  <div
                    key={index}
                    onClick={() => handleDayClick(index)}
                    style={{
                      border: '1px solid #ccc',
                      padding: '10px',
                      margin: '10px 0',
                      cursor: 'pointer',
                      borderRadius: '5px',
                      backgroundColor: 'grey',
                    }}
                  >
                    <p>{new Date(time).toDateString()}</p>
                    <p>
                      Max Temp: {weatherData.daily.temperature2mMax[index].toPrecision(2)}°F
                    </p>
                    <p>
                      Min Temp: {weatherData.daily.temperature2mMin[index].toPrecision(2)}°F
                    </p>
                    <p>Precipitation: {weatherData.daily.precipitationProbabilityMax[index]} %</p>
                  </div>
                ))}
              </ul>
              <h2>Hourly Temperature:</h2>
              <ul>
                {weatherData.hourly.time.map((time, index) => (
                  <li key={index}>
                    {new Date(time).toLocaleTimeString()}: {weatherData.hourly.temperature2m[index].toPrecision(2)}°F, {weatherData.hourly.precipitationProbability[index]}%
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
  
      {isChartVisible && selectedDay !== null && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleBackClick}>← Back</button> {/* Back button */}
          {console.log("Selected day index:", weatherData.daily)}

          <h3>Hourly Temperature for {new Date(weatherData.daily.time[selectedDay]).toDateString()}</h3>
          <Chart 
            timestamps={weatherData.hourly.time} 
            temperatures={weatherData.hourly.temperature2m} 
            selectedDay={selectedDay} 
          />
        </div>
      )}
    </div>
  );
}
export default App;
