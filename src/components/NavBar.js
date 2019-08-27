import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';

const Wrapper = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  
  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
  }

  a + a {
    margin-left: 1rem;
  }
`;

const NavBar = () => (
  <Wrapper>
    <Link to="/about">ABOUT</Link>
    <Link to="/examples">EXAMPLES</Link>
    <Link to="/search">SEARCH</Link>
    <Link to="/resources">RESOURCES</Link>
    <Link to="/credits">CREDITS</Link>
  </Wrapper>
);

export default NavBar;
