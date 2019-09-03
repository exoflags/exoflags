import React, { useState } from 'react';
import { Router } from '@reach/router';
import styled from '@emotion/styled';
import { extent } from 'd3-array';

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
import { FLAG_PROPERTIES } from '../const';
import exoplanets from '../data/exoplanets.json';

const initialUserFlag = {
  [FLAG_PROPERTIES.distance]: 50,
  [FLAG_PROPERTIES.planetaryMass]: 50,
  [FLAG_PROPERTIES.planetaryRadius]: 50,
  [FLAG_PROPERTIES.stellarMass]: 50,
  [FLAG_PROPERTIES.stellarRadius]: 50
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

const routerStyle = {
  height: '100%'
};

const App = () => {
  const [userFlag, setUserFlag] = useState(initialUserFlag);
  const [planetData] = useState(exoplanets);
  const pl_bmassj = extent(planetData, planet => planet.pl_bmassj);
  const pl_radj = extent(planetData, planet => planet.pl_radj);
  const st_mass = extent(planetData, planet => planet.st_mass);
  const pl_pnum = extent(planetData, planet => planet.pl_pnum);

  return (
    <AppContainer>
      <HeaderContainer>
        <Header />
      </HeaderContainer>

      <ContentContainer>
        <Router style={routerStyle}>
          <Home path="/" />

          <FlagBuilder
            path="/flag-builder/:stepId"
            userFlag={userFlag}
            setUserFlag={setUserFlag}
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
};

export default App;
