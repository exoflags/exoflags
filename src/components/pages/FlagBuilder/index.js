import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from '@emotion/styled';

import { Page } from '../../shared/Layout';
import Flag from '../../shared/Flag';
import FlagBuilderNav from './FlagBuilderNav';
import Slider from './Slider';
import { FLAG_BUILDER_STEPS } from '../../../const';

// Center content between header and FlagBuilderNav, but allow background to fill
// below FlagBuilderNav
const ContentContainer = styled.div`
  position: absolute;
  height: calc(100% - ${props => props.theme.flagBuilderNavHeight});
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SliderContainer = styled.div`
  padding: 2rem 4rem;
`;

const InfoContainer = styled.div`
  padding: 2rem 4rem 0;
  flex: 1;
  display: flex;
`;

const TextContainer = styled.div`
  width: 60%;
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

export const FlagBuilder = ({ userFlag, setUserFlag, extents, stepId }) => {
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

      <FlagBuilderNav stepId={+stepId} stepIdx={stepIdx} />
    </Page>
  );
};
