import React, { useState } from 'react';
import axios from 'axios';
import { API_KEY } from './config';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import WeatherAlerts from './components/WeatherAlerts';
import './App.css';

const App = () => {
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [unit, setUnit] = useState('C');
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const fetchWeather = async city => {
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&alerts=yes`
      );
      const data = res.data;
      setWeatherData(prev => ({ ...prev, [city]: data }));
      if (!cities.includes(city)) setCities([...cities, city]);
    } catch (err) {
      alert('City not found or API error.');
      console.error(err);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const toggleFavorite = (city) => {
    const updated = favorites.includes(city)
      ? favorites.filter(c => c !== city)
      : [...favorites, city];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div>
      <h1 style={{textAlign:"center"}} >Weather Dashboard</h1>
      <div style={{ justifyContent: 'center',width:'20%' , margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SearchBar onSearch={fetchWeather} />
            <button onClick={toggleUnit} class="btn btn-primary" style={{border:'1px solid rgb(0, 0, 0)', background:'#ff4500',borderRadius:'5px', color:"white"}} >Switch to °{unit === 'C' ? 'F' : 'C'}</button>

      </div>
      <h2>Favorites</h2>
      <div className="comparison-container" >
        {favorites.map(city => (
          weatherData[city] && (
            <div key={city} className="city-card-wrapper" style={{border:'2px solid #0d6efd',marginLeft:'15px' }}>
              <WeatherCard
                data={weatherData[city]}
                unit={unit}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(city)}
              />
              <WeatherAlerts alerts={weatherData[city]?.alerts} />
              <Forecast forecast={weatherData[city]?.forecast} unit={unit} />
            </div>
          )
        ))}
      </div>

      <h2>Other Cities</h2>
      <div className="comparison-container">
        {cities.map(city => (
          !favorites.includes(city) && (
            <div key={city} className="city-card-wrapper" style={{border:'2px solid #0d6efd',marginLeft:'15px' }}>
              <WeatherCard
                data={weatherData[city]}
                unit={unit}
                isFavorite={false}
                onToggleFavorite={() => toggleFavorite(city)}
              />
              <WeatherAlerts alerts={weatherData[city]?.alerts} />
              <Forecast forecast={weatherData[city]?.forecast} unit={unit} />
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default App;
