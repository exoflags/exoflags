import React from 'react';
import styled from '@emotion/styled';

import TextContent from './TextContent';
import FlagImage from './FlagContent';
import { Page } from '../../shared/Layout';
import {
  MostRecent,
  ClosestConfirmed,
  LargestConfirmed,
  BestCandidate
} from '../../PlanetIcons';

const Hr = styled.div`
  width: 100%;
  padding: 2px;
  background-color: ${props => props.theme.colors.grey.warm};
  margin: 2rem 0 2rem 0;
  @media only screen and (max-width: 1200px) {
    margin: 1rem 0 0 0;
  }
`;

const ContentContainer = styled.div`
  padding: 2rem 8rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Section1 = styled.div`
  width: 100%;
  display: flex;
  padding: 3rem 0;
  justify-content: space-between;
  align-items: center;
`;
const Section2 = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 2rem;

  p {
    font-size: 1.25rem;
    max-width: 600px;
  }
`;

const FlagContainer = styled.div``;
const TextContainer = styled.div`
  width: 45%;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

export const Examples = ({ navigate, stepId = 0 }) => {
  const step = parseInt(stepId, 10);
  return (
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
          <TextContainer>
            <TextContent stepId={parseInt(stepId, 10)} />
          </TextContainer>

          {stepId > 0 && (
            <FlagContainer>
              <FlagImage stepId={parseInt(stepId, 10)} />
            </FlagContainer>
          )}
        </Section2>
      </ContentContainer>
    </Page>
  );
};
