import React from 'react';
import Header from './Header';
import FullScreen from './FullScreen';

const App = () => (
  <>
    <Header />

    <FullScreen bg="#000">
      <div>sup</div>
    </FullScreen>

    <FullScreen bg="#fff">
      <div>sup</div>
    </FullScreen>

    <FullScreen bg="#000">
      <div>sup</div>
    </FullScreen>
  </>
);

export default App;
