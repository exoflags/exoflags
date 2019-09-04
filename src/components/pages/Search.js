import React, { useState } from 'react';
import Select from 'react-select';

export const Search = data => {
  const planetNames = data.data.map(planet => ({
    label: planet.pl_name,
    value: planet.pl_name
  }));

  const [selectedPlanet, setPlanet] = useState(null);

  const handleChange = planet => {
    setPlanet(planet);
  };
  return (
    <div>
      {selectedPlanet && <p>{selectedPlanet}</p>}
      <div className="container">
        <Select
          options={planetNames}
          onChange={opt => handleChange(opt.value)}
        />
      </div>
    </div>
  );
};
