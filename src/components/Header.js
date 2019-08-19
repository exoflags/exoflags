import React from 'react';
import styled from '@emotion/styled';

import Logo from './Logo';

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
`;

const Upper = styled.div`
  background-color: #3d3d3d;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const Lower = styled.div`
  background-color: #1a1a1a;
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const Header = () => (
  <Wrapper>
    <Upper>
      <Logo>Origin</Logo>
    </Upper>

    <Lower>

    </Lower>
  </Wrapper>
);

export default Header;
