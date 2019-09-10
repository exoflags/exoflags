import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';

import { EXAMPLES } from '../../const';

import { Page } from '../shared/Layout';
import {
  MostRecent,
  ClosestConfirmed,
  LargestConfirmed,
  BestCandidate
} from '../PlanetIcons';

const Hr = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${props => props.theme.colors.grey.warm};
  margin: 0 0 2rem 0;
`;

const ContentContainer = styled.div`
  padding: 2rem 8rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Section1 = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  padding-top: 3rem;
  justify-content: space-between;
  align-items: center;
`;
const Section2 = styled.div`
  height: 45%;
  width: 100%;
  p {
    font-size: 1.25rem;
    max-width: 620px;
  }
`;

const Heading = styled.h1`
  font-size: 3.75rem;
`;
export const Examples = ({ navigate, stepId = 0 }) => (
  <Page>
    <ContentContainer>
      <Section1>
        <div onClick={() => navigate('/examples/1')}>
          <MostRecent />
        </div>
        <div onClick={() => navigate('/examples/2')}>
          <ClosestConfirmed />
        </div>
        <div onClick={() => navigate('/examples/3')}>
          <LargestConfirmed />
        </div>
        <div onClick={() => navigate('/examples/4')}>
          <BestCandidate />
        </div>
      </Section1>
      <Hr />
      <Section2>
        <Heading>{EXAMPLES[stepId].title}</Heading>
        {EXAMPLES[stepId].body.map((p, i) => (
          <p key={i + stepId}>{p}</p>
        ))}
      </Section2>
    </ContentContainer>
  </Page>
);
