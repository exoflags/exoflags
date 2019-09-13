import React from 'react';
import styled from '@emotion/styled';

import img from './ExoFlagsLogo.svg';

const Logo = styled.img`
  margin: 0;
`;
const ExoFlagsLogo = () => <Logo src={img} />;

export default ExoFlagsLogo;
