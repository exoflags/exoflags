import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';

import { EXAMPLES } from '../../const';
import Flag from '../shared/Flag';

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
  display: flex;
  justify-content: space-between;
  p {
    font-size: 1.25rem;
    max-width: 640px;
  }
`;

const Heading = styled.h1`
  font-size: 3.75rem;
`;

const Text = styled.div`
  width: 50%;
`;
const getProperties = (data, stepId) => {
  let selectedPlanet = EXAMPLES[stepId].name;
  const obj = data.filter(obj => obj.pl_name === selectedPlanet);
  const planetData = {
    distance: obj[0].st_dist,
    stellarMass: obj[0].st_mass,
    stellarRadius: obj[0].st_rad,
    planetaryMass: obj[0].pl_bmassj,
    planetaryRadius: obj[0].pl_radj,
    planetaryNeighbours: obj[0].pl_pnum,
    constellation: obj[0].constellation
  };
  return planetData;
};

export const Examples = ({ navigate, stepId = 0, data, extents }) => (
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
        <Text>
          <Heading>{EXAMPLES[stepId].title}</Heading>
          {EXAMPLES[stepId].body.map((p, i) => (
            <p key={i + '_' + stepId}>{p}</p>
          ))}
        </Text>
        <div>
          {stepId > 0 && (
            <Flag
              width={600}
              extents={extents}
              flagProperties={getProperties(data, stepId)}
              basicFlag
            />
          )}
        </div>
      </Section2>
    </ContentContainer>
  </Page>
);
