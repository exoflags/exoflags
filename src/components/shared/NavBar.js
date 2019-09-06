import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import theme from '../../theme';

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

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          color: isCurrent ? theme.colors.grey.medium : theme.colors.white
        }
      };
    }}
  />
);

const NavBar = () => (
  <Wrapper>
    <NavLink to="/about">ABOUT</NavLink>
    <NavLink to="/examples">EXAMPLES</NavLink>
    <NavLink to="/search">SEARCH</NavLink>
    <NavLink to="/resources">RESOURCES</NavLink>
    <NavLink to="/credits">CREDITS</NavLink>
  </Wrapper>
);

export default NavBar;
