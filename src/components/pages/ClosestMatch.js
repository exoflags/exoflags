import React from 'react';
import styled from '@emotion/styled';

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
  padding: 5%;
`;

const Top = styled.div`
  width: 100%;
`;

const Bottom = styled.div`
  width: 100%;
`;

const Text = styled.div`
  width: 60%;
  p {
    width: 80%;
  }
`;

const Flags = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Matches = styled.div`
  flex: 1;
  display: flex;
  margin-left: 2rem;

  > div {
    width: calc(100% / 3);
  }
`;

const FlagWrapper = styled.div`
  p {
    margin-bottom: 0;
  }
`;

const FlagLabel = styled.h4`
  margin-bottom: 0.5rem;
`;

const Info = styled.div`
  padding-top: 1rem;
`;

function closest(arr, accessor, goal) {
  return arr.reduce((a, b) => {
    const current = accessor(b);
    const previous = accessor(a);
    return Math.abs(current - goal) < Math.abs(previous - goal) ? b : a;
  });
}

function getsimilarPlanets(flag, data) {
  return [
    closest(data, d => d.st_dist, flag.distance),
    closest(data, d => d.pl_bmassj, flag.planetaryMass),
    closest(data, d => d.pl_radj, flag.planetaryRadius)
  ];
}

const ClosestMatch = ({ userFlag, resetUserFlag, extents, data, navigate }) => {
  const similarPlanets = getsimilarPlanets(userFlag, data);

  const handleStartAgain = () => {
    resetUserFlag();
    navigate('/explore/1');
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

            <Matches>
              {similarPlanets.map(planet => (
                <FlagWrapper key={planet.pl_name}>
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
                    Distance:{' '}
                    {planet.st_dist
                      ? planet.st_dist.toFixed(2)
                      : 'Currently unknown'}
                  </p>
                  <p>
                    Stellar mass:{' '}
                    {planet.st_mass
                      ? planet.st_mass.toFixed(2)
                      : 'Currently unknown'}
                  </p>
                  <p>
                    Stellar radius:{' '}
                    {planet.st_rad
                      ? planet.st_rad.toFixed(2)
                      : 'Currently unknown'}
                  </p>
                  <p>
                    Planetary mass:{' '}
                    {planet.pl_bmassj
                      ? planet.pl_bmassj.toFixed(2)
                      : 'Currently unknown'}
                  </p>
                  <p>
                    Planetary radius:{' '}
                    {planet.pl_radj
                      ? planet.pl_radj.toFixed(2)
                      : 'Currently unknown'}
                  </p>
                  <p>
                    Planetary neighbours:{' '}
                    {planet.pl_pnum ? planet.pl_pnum : 'Currently unknown'}
                  </p>
                  <p>
                    Constellation:{' '}
                    {planet.constellation
                      ? planet.constellation
                      : 'Currently unknown'}
                  </p>
                </FlagWrapper>
              ))}
            </Matches>
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
