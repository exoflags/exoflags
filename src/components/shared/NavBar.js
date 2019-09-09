import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import theme from '../../theme';

const Wrapper = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  padding-right: 32px;

  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
  }

  a + a {
    margin-left: 5rem;
  }
`;

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          color: isCurrent ? theme.colors.white : theme.colors.grey.medium
        }
      };
    }}
  />
);

const NavBar = () => (
  <Wrapper>
    <NavLink to="/explore">EXPLORE</NavLink>
    <NavLink to="/search">SEARCH</NavLink>
    <NavLink to="/credits">CREDITS</NavLink>
  </Wrapper>
);

export default NavBar;
