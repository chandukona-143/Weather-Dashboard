import React from 'react';

const WeatherAlerts = ({ alerts }) => {
  // WeatherAPI gives alerts in: alerts.alert (array) or undefined
  const alertList = alerts?.alert;

  if (!Array.isArray(alertList) || alertList.length === 0) return null;

  return (
    <div style={{ backgroundColor: '#ffe0e0', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
      <h4>⚠️ Weather Alerts</h4>
      {alertList.map((alert, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <strong>{alert.event}</strong>
          <p>{alert.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherAlerts;
