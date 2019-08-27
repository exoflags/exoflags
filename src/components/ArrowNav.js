import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link, navigate } from '@reach/router';
import { Forward, Back } from './Icons';

import { FLAG_BUILDER_STEPS } from '../const';

const hideStyle = css`
  visibility: hidden;
`;

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
`;

const ArrowContainer = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    display: block;
  }

  ${props => props.hide && hideStyle};
`;

const Dots = styled.div`
  display: flex;
  align-items: center;

  a + a {
    margin-left: 1rem;
  }
`;

const Dot = styled(Link)`
  display: block;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.grey.medium};
`;

const ArrowNav = ({ stepId, stepIdx }) => {
  const isFirstStep = stepIdx === 0;
  const isLastStep = stepIdx === FLAG_BUILDER_STEPS.length - 1;

  return (
    <Wrapper>
      <ArrowContainer
        hide={isFirstStep}
        onClick={() => navigate(`/flag-builder/${stepId - 1}`)}
      >
        <Back />
      </ArrowContainer>

      <Dots>
        {FLAG_BUILDER_STEPS.map(step => (
          <Dot
            to={step.path}
            key={step.displayName}
          />
        ))}
      </Dots>

      <ArrowContainer
        hide={isLastStep}
        onClick={() => navigate(`/flag-builder/${stepId + 1}`)}
      >
        <Forward />
      </ArrowContainer>
    </Wrapper>
  );
}

export default ArrowNav;
