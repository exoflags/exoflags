import React, { useState, useEffect } from 'react';

import Header from './Header';
import { FullScreen } from './Layout';
import { TitlePane, FlagPane } from './Panes';
import { Slider } from 'antd';
import Flag from './Flag';

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};

const initialUserFlag = {
  redshift: 0,
  planetaryMass: 0,
  planetaryRadii: 0,
  solarMass: 0,
  solarRadii: 0
}

const App = () => {
  const [userFlag, setUserFlag] = useState(initialUserFlag);
  const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  useEffect(() => {
    setInterval(() => {
      setUserFlag({
        redshift: randomNum(0, 100),
        planetaryMass: randomNum(0, 100),
        planetaryRadii: randomNum(0, 100),
        solarMass: randomNum(0, 100),
        solarRadii: randomNum(0, 100)
      })
    }, 1500)
  }, [])

  return (
    <>
      <Header />

      <TitlePane />

      <FlagPane userFlag={userFlag} />
    </>
  );
}

export default App;
