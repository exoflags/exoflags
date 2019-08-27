import React, { useState } from 'react';
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
import { FLAG_PROPERTIES } from '../const';

const initialUserFlag = {
  [FLAG_PROPERTIES.distance]: 0,
  [FLAG_PROPERTIES.planetaryMass]: 10,
  [FLAG_PROPERTIES.planetaryRadius]: 20,
  [FLAG_PROPERTIES.stellarMass]: 30,
  [FLAG_PROPERTIES.stellarRadius]: 40
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
}

export default App;
