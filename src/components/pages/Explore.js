import React from 'react';
import styled from '@emotion/styled';
import { navigate } from '@reach/router';

import { Page } from '../shared/Layout';
import Button from '../shared/Button';

const ContentContainer = styled.div`
  padding: 2rem 4rem;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 3rem;
  width: 60%;
  line-height: 1.2;
`;

const ExploreButton = styled(Button)`
  width: 200px;
  margin-top: 2rem;
`;

const Explore = () => (
  <Page video="explore">
    <ContentContainer>
      <Text>
        See how Exoflags builds visual identities for new worlds using
        observational data.
      </Text>

      <Text>Explore the process here...</Text>

      <ExploreButton onClick={() => navigate('/explore/1')} primaryInverted>
        EXPLORE
      </ExploreButton>
    </ContentContainer>
  </Page>
);

export default Explore;
