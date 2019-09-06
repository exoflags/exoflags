import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import styled from '@emotion/styled';
import { extent } from 'd3-array';

import Header from './shared/Header';
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
import exoplanets from '../data/data.json';
import { uniq } from '../utils/uniq';

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
  // TODO: consider doing this outside of component, in a const file or something, or just above
  // No time to dynamically load in data
  const [userFlag, setUserFlag] = useState({});
  const [planetData] = useState(exoplanets);

  // TODO: add extent for constellation (is this an extent, or just unique values?)
  const EXTENTS = {
    [FLAG_PROPERTIES.distance]: extent(planetData, planet => planet.st_dist),
    [FLAG_PROPERTIES.stellarMass]: extent(planetData, planet => planet.st_mass),
    [FLAG_PROPERTIES.stellarRadius]: extent(
      planetData,
      planet => planet.st_rad
    ),
    [FLAG_PROPERTIES.planetaryMass]: extent(
      planetData,
      planet => planet.pl_bmassj
    ),
    [FLAG_PROPERTIES.planetaryRadius]: extent(
      planetData,
      planet => planet.pl_radj
    ),
    [FLAG_PROPERTIES.planetaryNeighbours]: extent(
      planetData,
      planet => planet.pl_pnum
    ),
    [FLAG_PROPERTIES.constellation]: uniq(
      planetData.map(d => d.constellation).filter(Boolean)
    ).sort()
  };

  useEffect(() => {
    // Define default and special accessors for initial user flag values
    const midPoint = extent => (extent[0] + extent[1]) / 2;
    const accessors = {
      [FLAG_PROPERTIES.planetaryNeighbours]: extent =>
        Math.round(midPoint(extent)),
      [FLAG_PROPERTIES.constellation]: extent => extent[0]
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

    setUserFlag(initialUserFlag);
  }, []);

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
            extents={EXTENTS}
          />

          <About path="/about" />
          <Credits path="/credits" />
          <Examples path="/examples" />
          <Resources path="/resources" />
          <Search path="/search" data={planetData} />
          <NotFound default />
        </Router>
      </ContentContainer>
    </AppContainer>
  );
};

export default App;
