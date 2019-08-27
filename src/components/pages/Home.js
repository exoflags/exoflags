import React from 'react';
import { Link } from '@reach/router';

import { Page } from '../Layout';
import Logo from '../Logo';

export const Home = () => (
  <Page>
    <Logo>Project Origin</Logo>

    <Link to="/flag-builder/1">Go!</Link>
  </Page>
);
