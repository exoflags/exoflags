import React from 'react';

import { FullScreen } from '../Layout';
import Logo from '../Logo';
import theme from '../../theme';

export const TitlePane = () => (
  <FullScreen bg={theme.colors.black} center>
    <Logo>Project Origin</Logo>
  </FullScreen>
);
