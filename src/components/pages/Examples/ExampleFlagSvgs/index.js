import React from 'react';
import styled from '@emotion/styled';

import bestCandidate from './BestCandidateforSupportingLife.svg';
import closestConfirmed from './ClosestConfirmed.svg';
import largestConfirmed from './LargestConfirmed.svg';
import mostRecentlyConfirmed from './MostRecentlyConfirmed.svg';

const Flag = styled.img``;

export const BestCandidate = () => {
  return <Flag src={bestCandidate} />;
};

export const ClosestConfirmed = () => {
  return <Flag src={closestConfirmed} />;
};

export const LargestConfirmed = () => {
  return <Flag src={largestConfirmed} />;
};

export const MostRecentlyConfirmed = () => {
  return <Flag src={mostRecentlyConfirmed} />;
};
