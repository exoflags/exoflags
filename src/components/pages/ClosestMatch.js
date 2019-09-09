import React from 'react';
import styled from '@emotion/styled';

import { Page } from '../shared/Layout';
import Flag from '../shared/Flag';

/*
  TODO
  - user flag
  - generic flags (pick first bits of data for now)
*/

const SectionTitle = styled.h3`
  font-size: 3rem;
`;

const ContentContainer = styled.div`
  border: 1px solid blueviolet;
  height: 100%;
  /* display: flex;
  align-items:  */
`;

const Top = styled.div`
  border: 1px solid red;
  width: 100%;
`;

const Bottom = styled.div`
  border: 1px solid red;
  width: 100%;
`;

const Text = styled.div`
  width: 60%;
`;

const ClosestMatch = ({ userFlag, setUserFlag, extents }) => {
  console.log(userFlag);
  return (
    <Page>
      <ContentContainer>
        <Top>
          <SectionTitle>Closest Matches</SectionTitle>

          <Text>
            <p>
              You've just explored the steps in data visualisation necessary to
              build an exoplanetary flag! Of the random variables you've chosen,
              below are the 3 most similar actual exoplanets that Earth based
              studies have confirmed to date.
            </p>

            <p>
              You can learn more about these studies and explore the full depth
              of the NASA and Kepler database to find out more about the
              discovery of new worlds.
            </p>
          </Text>
        </Top>

        <Bottom>
          <Flag
            width={200}
            extents={extents}
            flagProperties={userFlag}
            basicFlag
          />
        </Bottom>
      </ContentContainer>
    </Page>
  );
};

export default ClosestMatch;
