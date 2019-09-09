import React from 'react';
import { Link } from '@reach/router';

import { Page } from '../shared/Layout';
import Logo from '../shared/Logo';

export const Home = () => (
  <Page>
    <Logo>Project Origin</Logo>

    <Link to="/explore">Go!</Link>
  </Page>
);
