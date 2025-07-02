import React from 'react';
import './Forecast.css'; 

const Forecast = ({ forecast, unit }) => {
  if (!forecast) return null;

  return (
    <div className="forecast">
      <h4>5-Day Forecast</h4>
      <div className="forecast-row">
        {forecast.forecastday.map(day => (
          <div key={day.date} className="forecast-card">
            <p><strong>{day.date}</strong></p>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <p>{day.day.condition.text}</p>
            <p>
              {unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f}°{unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
