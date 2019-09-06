import React from 'react';
import styled from '@emotion/styled';

import img from './NASA_logo.svg';

const Logo = styled.img`
  // height: 64px;
`;
const NasaLogo = () => {
  return <Logo src={img} />;
};

export default NasaLogo;
