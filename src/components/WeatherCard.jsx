import React from 'react';

const WeatherCard = ({ data, unit, isFavorite, onToggleFavorite }) => {
  if (!data) return null;

  const temp = unit === 'C' ? data.current.temp_c : data.current.temp_f;
  const condition = data.current.condition.text;

  return (
    <div className="weather-card" style={{border:'none',marginLeft:'10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{data.location.name}</h3>
        <button onClick={onToggleFavorite} style={{border:'none', background:'none', cursor:'pointer', fontSize:'1.5rem'}}>
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <img src={data.current.condition.icon} alt={condition} />
      <p>{condition}</p>
      <p>Temperature: {temp}°{unit}</p>
    </div>
  );
};

export default WeatherCard;
