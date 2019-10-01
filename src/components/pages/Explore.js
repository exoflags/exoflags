import React from 'react';
import styled from '@emotion/styled';

import { Page } from '../shared/Layout';
import Button from '../shared/Button';

const ContentContainer = styled.div`
  padding: 5%;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 3rem;
  width: 60%;
  line-height: 1.2;
  @media only screen and (max-width: 900px) {
    font-size: 1.75rem;
  }
`;

const ExploreButton = styled(Button)`
  width: 200px;
  margin-top: 2rem;
`;

const Explore = ({ navigate }) => (
  <Page video="explore" fallbackImg="explore">
    <ContentContainer>
      <div>
        <Text>
          See how Exoflags builds visual identities for new worlds using
          observational data.
        </Text>

        <Text>Explore the process here...</Text>

        <ExploreButton onClick={() => navigate('/explore/1')} primaryInverted>
          EXPLORE
        </ExploreButton>
      </div>
    </ContentContainer>
  </Page>
);

export default Explore;
