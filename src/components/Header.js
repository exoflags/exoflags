import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';

import Logo from './Logo';
import NavBar from './NavBar';

const Wrapper = styled.header`
  height: 100%;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3d3d3d;
`;

const Header = () => (
  <Wrapper>
    <Link to="/">
      <Logo>Exoflags</Logo>
    </Link>
    <NavBar />
  </Wrapper>
);

export default Header;
