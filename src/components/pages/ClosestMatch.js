import React from 'react';
import styled from '@emotion/styled';
import { navigate } from '@reach/router';

import { Page } from '../shared/Layout';
import Flag from '../shared/Flag';
import Button from '../shared/Button';

/*
  TODO
  - user flag
  - generic flags (pick first bits of data for now)
*/

const SectionTitle = styled.h3`
  font-size: 3rem;
`;

const ContentContainer = styled.div`
  height: 100%;
  padding: 2rem 4rem;
`;

const Top = styled.div`
  width: 100%;
`;

const Bottom = styled.div`
  width: 100%;
`;

const Text = styled.div`
  width: 60%;
`;

const Flags = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlagWrapper = styled.div`
  p {
    margin-bottom: 0;
  }
`;

const FlagLabel = styled.h4`
  margin-bottom: 0.5rem;
`;

function getsimilarPlanets(flag, data) {
  return data.slice(0, 3);
}

const ClosestMatch = ({ userFlag, resetUserFlag, extents, data }) => {
  const similarPlanets = getsimilarPlanets(userFlag, data);

  const handleStartAgain = () => {
    resetUserFlag();
    navigate('/flag-builder/1');
  };

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
          <Flags>
            <FlagWrapper>
              <FlagLabel>MY FLAG</FlagLabel>
              <Flag
                width={380}
                extents={extents}
                flagProperties={userFlag}
                basicFlag
              />
            </FlagWrapper>

            {similarPlanets.map(planet => (
              <FlagWrapper>
                <FlagLabel>{planet.pl_name}</FlagLabel>
                <Flag
                  width={200}
                  extents={extents}
                  flagProperties={{
                    distance: planet.st_dist,
                    stellarMass: planet.st_mass,
                    stellarRadius: planet.st_rad,
                    planetaryMass: planet.pl_bmassj,
                    planetaryRadius: planet.pl_radj,
                    planetaryNeighbours: planet.pl_pnum,
                    constellation: planet.constellation
                  }}
                  basicFlag
                />

                <p>
                  Distance: {planet.st_dist ? planet.st_dist.toFixed(2) : 'n/a'}
                </p>
                <p>
                  Stellar mass:{' '}
                  {planet.st_mass ? planet.st_mass.toFixed(2) : 'n/a'}
                </p>
                <p>
                  Stellar radius:{' '}
                  {planet.st_rad ? planet.st_rad.toFixed(2) : 'n/a'}
                </p>
                <p>
                  Planetary mass:{' '}
                  {planet.pl_bmassj ? planet.pl_bmassj.toFixed(2) : 'n/a'}
                </p>
                <p>
                  Planetary radius:{' '}
                  {planet.pl_radj ? planet.pl_radj.toFixed(2) : 'n/a'}
                </p>
                <p>
                  Planetary neighbours:{' '}
                  {planet.pl_pnum ? planet.pl_pnum : 'n/a'}
                </p>
                <p>
                  Constellation:{' '}
                  {planet.constellation ? planet.constellation : 'n/a'}
                </p>
              </FlagWrapper>
            ))}
          </Flags>

          <Button primary onClick={handleStartAgain}>
            START AGAIN
          </Button>
        </Bottom>
      </ContentContainer>
    </Page>
  );
};

export default ClosestMatch;
