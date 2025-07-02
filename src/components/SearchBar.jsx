import React, { useState } from 'react';


const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        
        <div class="input-group mb-3">

      <input
        type="text"
        class="form-control"
        style={{border:'1px solid #0d6efd'}}
        aria-label="Recipient’s username"
         aria-describedby="button-addon2"
        placeholder="Enter city name"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <button type="submit"
      id="button-addon2"
class="btn btn-outline-primary"      >Add</button>
      </div>
    </form>
  );
};

export default SearchBar;
