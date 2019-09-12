import React from 'react';
import styled from '@emotion/styled';

import {
  BestCandidate,
  ClosestConfirmed,
  LargestConfirmed,
  MostRecentlyConfirmed
} from './ExampleFlagSvgs';

const Flag = [
  BestCandidate,
  ClosestConfirmed,
  LargestConfirmed,
  MostRecentlyConfirmed
];

const FlagContent = ({ stepId }) => {
  return Flag[stepId - 1]();
};

export default FlagContent;
