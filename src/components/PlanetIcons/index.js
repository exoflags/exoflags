import React from 'react';
import styled from '@emotion/styled';

import mostRecent from './icMostRecentlyConfirmed.svg';
import closestConfirmed from './icClosestConfirmed.svg';
import largestConfirmed from './icLargestConfirmed.svg';
import bestCandidate from './icBestCandidateforSupportingLife.svg';

const Icon = styled.img``;

export const MostRecent = () => <Icon src={mostRecent} />;

export const ClosestConfirmed = () => <Icon src={closestConfirmed} />;

export const LargestConfirmed = () => <Icon src={largestConfirmed} />;

export const BestCandidate = () => <Icon src={bestCandidate} />;
