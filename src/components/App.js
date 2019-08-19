import React from 'react';

import Header from './Header';
import { FullScreen } from './Layout';
import { TitlePane, FlagPane } from './Panes';
import { Slider } from 'antd';

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

const App = () => (
  <>
    <Header />

    <TitlePane />

    <FlagPane />
  </>
);

export default App;
