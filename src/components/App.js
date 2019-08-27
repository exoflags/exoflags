import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import styled from '@emotion/styled';

import Header from './Header';
import {
  Home,
  About,
  Credits,
  Examples,
  Resources,
  Search,
  FlagBuilder,
  NotFound
} from './pages';

const initialUserFlag = {
  redshift: 0,
  planetaryMass: 0,
  planetaryRadii: 0,
  solarMass: 0,
  solarRadii: 0
}

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  height: ${props => props.theme.headerHeight};
  width: 100%;
`;

const ContentContainer = styled.div`
  height: calc(100% - ${props => props.theme.headerHeight});
  width: 100%;
  flex: 1;
  position: relative;
  background-color: ${props => props.theme.colors.grey.dark};
`;

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
    <AppContainer>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      
      <ContentContainer>
        <Router>
          <Home path="/" />

          <FlagBuilder
            path="/flag-builder/:stepId"
            userFlag={userFlag}
          />

          <About path="/about" />
          <Credits path="/credits" />
          <Examples path="/examples" />
          <Resources path="/resources" />
          <Search path="/search" />

          <NotFound default />
        </Router>
      </ContentContainer>
    </AppContainer>
  );
}

export default App;
