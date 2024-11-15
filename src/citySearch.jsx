import React, { useState } from 'react';

function CitySearch({ onSearch }) {
  const [cityName, setCityName] = useState('');

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSearch = () => {
    if (cityName.trim()) {
      onSearch(cityName); 
    } else {
      console.error('City name cannot be empty');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={cityName}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default CitySearch;
