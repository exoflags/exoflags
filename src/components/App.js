import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import styled from '@emotion/styled';
import { extent } from 'd3-array';

import Header from './shared/Header';
import {
  About,
  Credits,
  Examples,
  Resources,
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

const distanceExtent = () => {
  const values = extent(planetData, planet => planet.st_dist);
  values[1] = Math.max(values[1], 10000);
  return values;
};

const EXTENTS = {
  [FLAG_PROPERTIES.distance]: distanceExtent(),
  [FLAG_PROPERTIES.stellarMass]: extent(planetData, planet => planet.st_mass),
  [FLAG_PROPERTIES.stellarRadius]: extent(planetData, planet => planet.st_rad),
  [FLAG_PROPERTIES.planetaryMass]: extent(
    planetData,
    planet => planet.pl_bmassj
  ),
  [FLAG_PROPERTIES.planetaryRadius]: extent(
    planetData,
    planet => planet.pl_radj
  ),
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

const App = () => {
  // TODO: consider doing this outside of component, in a const file or something, or just above
  // No time to dynamically load in data
  const [userFlag, setUserFlag] = useState(initialUserFlag);

  const resetUserFlag = () => {
    setUserFlag(initialUserFlag);
  };

  console.log('extents', EXTENTS);

  return (
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
          <Resources path="/resources" />
          <Search path="/search" data={planetData} />
          <NotFound default />
        </Router>
      </ContentContainer>
    </AppContainer>
  );
};

export default App;
