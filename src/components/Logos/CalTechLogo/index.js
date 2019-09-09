import React from 'react';
import styled from '@emotion/styled';

import img from './Caltech_logo.svg';

const Logo = styled.img`
  // height: 58px;
`;
const CaltechLogo = () => {
  return <Logo src={img} />;
};

export default CaltechLogo;
