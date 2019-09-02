import React from 'react';
import Select from 'react-select';

export const Search = data => {
  const planetNames = data.data.map(planet => ({
    label: planet.pl_name,
    value: planet.pl_name
  }));
  return (
    <div>
      <div className="container">
        <Select options={planetNames} />
      </div>
    </div>
  );
};
