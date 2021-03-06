import React, { useState, useEffect } from 'react';
import { Router, LocationProvider, createHistory } from '@reach/router';
import createHashSource from 'hash-source';
import styled from '@emotion/styled';
import { extent } from 'd3-array';

import Header from './shared/Header';
import {
  About,
  Credits,
  Examples,
  Search,
  FlagBuilder,
  NotFound
} from './pages';
import { FLAG_PROPERTIES } from '../const';
import planetData from '../data/data.json';
import { uniq } from '../utils/uniq';
import ClosestMatch from './pages/ClosestMatch';
import Explore from './pages/Explore';

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  height: ${props => props.theme.headerHeight};
  position: fixed;
  width: 100%;
  z-index: 2;
`;

const ContentContainer = styled.div`
  height: calc(100% - ${props => props.theme.headerHeight});
  width: 100%;
  flex: 1;
  position: relative;
  background-color: ${props => props.theme.colors.grey.dark};
  z-index: 1;
  margin-top: ${props => props.theme.headerHeight};
`;

const routerStyle = {
  height: '100%'
};

const distanceExtent = () => {
  const values = extent(planetData, planet => planet.st_dist);
  values[1] = Math.max(values[1], 10000);
  return values;
};

const EXTENTS = {
  [FLAG_PROPERTIES.distance]: [0, 10000], //distanceExtent(),
  [FLAG_PROPERTIES.stellarMass]: [0, 350], //extent(planetData, planet => planet.st_mass),
  [FLAG_PROPERTIES.stellarRadius]: [0, 2600], //extent(planetData, planet => planet.st_rad),
  [FLAG_PROPERTIES.planetaryMass]: extent(
    planetData,
    planet => planet.pl_bmassj
  ),
  [FLAG_PROPERTIES.planetaryRadius]: [
    0,
    168.134
  ] /* extent(
    planetData,
    planet => planet.pl_radj
  ), */,
  // At time of writing extent of data is [1, 8] but we want to show all 10 graphics on slider
  [FLAG_PROPERTIES.planetaryNeighbours]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [FLAG_PROPERTIES.constellation]: uniq(
    planetData.map(planet => planet.constellation).filter(Boolean)
  ).sort()
};

const midPoint = extent => (extent[0] + extent[1]) / 2;
const firstValue = extent => extent[0];
const accessors = {
  [FLAG_PROPERTIES.planetaryNeighbours]: firstValue,
  [FLAG_PROPERTIES.constellation]: firstValue
};

const initialUserFlag = Object.entries(EXTENTS).reduce(
  (memo, [key, extent]) => {
    const accessor = accessors[key] || midPoint;
    const value = accessor(extent);
    memo[key] = value;
    return memo;
  },
  {}
);

const source = createHashSource();
const history = createHistory(source);

const App = () => {
  const [userFlag, setUserFlag] = useState(initialUserFlag);

  const resetUserFlag = () => {
    setUserFlag(initialUserFlag);
  };

  return (
    <LocationProvider history={history}>
      <AppContainer>
        <HeaderContainer>
          <Header />
        </HeaderContainer>

        <ContentContainer>
          <Router style={routerStyle}>
            <Explore path="/explore" />

            <FlagBuilder
              path="/explore/:stepId"
              userFlag={userFlag}
              setUserFlag={setUserFlag}
              extents={EXTENTS}
            />

            <ClosestMatch
              path="/explore/closest-match"
              userFlag={userFlag}
              resetUserFlag={resetUserFlag}
              data={planetData}
              extents={EXTENTS}
            />

            <About path="/" />
            <Credits path="/credits" />
            <Examples path="/examples/" />
            <Examples
              path="/examples/:stepId"
              data={planetData}
              extents={EXTENTS}
            />
            <Search path="/search" data={planetData} extents={EXTENTS} />
            <NotFound default />
          </Router>
        </ContentContainer>
      </AppContainer>
    </LocationProvider>
  );
};

export default App;
