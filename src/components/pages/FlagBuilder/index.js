import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from '@emotion/styled';

import { Page } from '../../shared/Layout';
import Flag from '../../shared/Flag';
import FlagBuilderNav from './FlagBuilderNav';
import Slider from './Slider';
import { FLAG_BUILDER_STEPS, FLAG_PROPERTIES } from '../../../const';

// Center content between header and FlagBuilderNav, but allow background to fill
// below FlagBuilderNav
const ContentContainer = styled.div`
  position: absolute;
  /* height: calc(100% - ${props => props.theme.flagBuilderNavHeight}); */
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SliderContainer = styled.div`
  padding: 5%;
`;

const SliderLabel = styled.p`
  font-weight: bold;
`;

const InfoContainer = styled.div`
  padding: 5% 5% 0;
  flex: 1;
  display: flex;
`;

const TextContainer = styled.div`
  width: 60%;
  p {
    max-width: 80%;
  }
  padding-right: 3rem;
`;

const SectionTitle = styled.h3`
  font-size: 3rem;
`;

const FlagContainer = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
`;

const sliderLabelRef = {
  [FLAG_PROPERTIES.distance]: 'set a distance',
  [FLAG_PROPERTIES.stellarMass]: "set the mass of the exoplanet's host star",
  [FLAG_PROPERTIES.stellarRadius]: "set the host star's radius",
  [FLAG_PROPERTIES.planetaryMass]: 'set the mass of the exoplanet',
  [FLAG_PROPERTIES.planetaryRadius]: 'set the radius of the exoplanet',
  [FLAG_PROPERTIES.planetaryNeighbours]:
    'set the amount of exoplanets in the host system',
  [FLAG_PROPERTIES.constellation]:
    'choose the constellation in which the planet can be found'
};

export const FlagBuilder = ({
  userFlag,
  setUserFlag,
  extents,
  stepId,
  navigate
}) => {
  const stepIdx = +stepId - 1;
  const { title, body, flagProperty } = FLAG_BUILDER_STEPS[stepIdx];

  return (
    <Page>
      <ContentContainer>
        <InfoContainer>
          <TextContainer>
            <SectionTitle>{title}</SectionTitle>

            {body.map((text, i) => (
              <p key={`${stepId}-body-${i}`}>{text}</p>
            ))}
          </TextContainer>

          <FlagContainer>
            <AutoSizer disableHeight>
              {({ width }) => (
                <Flag
                  width={width}
                  extents={extents}
                  stepIdx={stepIdx}
                  flagProperties={userFlag}
                />
              )}
            </AutoSizer>
          </FlagContainer>
        </InfoContainer>

        <SliderContainer>
          <SliderLabel>
            Drag the red pin to {sliderLabelRef[flagProperty]}
          </SliderLabel>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Slider
                extents={extents}
                width={width}
                flagProperty={flagProperty}
                userFlag={userFlag}
                setUserFlag={setUserFlag}
              />
            )}
          </AutoSizer>
        </SliderContainer>
      </ContentContainer>

      <FlagBuilderNav stepId={+stepId} stepIdx={stepIdx} navigate={navigate} />
    </Page>
  );
};
