import React from 'react';
import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';

import { Page } from '../Layout';
import Flag from '../Flag';
import ArrowNav from '../ArrowNav';
import { FLAG_BUILDER_STEPS } from '../../const';

// Center content between header and ArrowNav, but allow background to fill
// below ArrowNav
const ContentContainer = styled.div`
  position: absolute;
  height: calc(100% - ${props => props.theme.arrowNavHeight});
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4rem;
`;

export const FlagBuilder = ({ userFlag, stepId }) => {
  const stepIdx = +stepId - 1;
  const { title, body } = FLAG_BUILDER_STEPS[stepIdx];

  // Get flag properties and values up until current step
  const flagProperties = FLAG_BUILDER_STEPS.slice(0, stepIdx + 1)
    .map(step => step.flagProperty)
    .reduce((memo, flagProperty) => {
      memo[flagProperty] = userFlag[flagProperty];
      return memo;
    }, {});

  return (
    <Page>
      <ContentContainer>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <h3>{title}</h3>

            {body.map((text, i) => (
              <p key={`${stepId}-body-${i}`}>{text}</p>
            ))}
          </Grid>

          <Grid item xs={12} sm={6}>
            <div>
              <Flag {...flagProperties} />
            </div>
          </Grid>
        </Grid>
      </ContentContainer>

      <ArrowNav stepId={+stepId} stepIdx={stepIdx} />
    </Page>
  );
};
