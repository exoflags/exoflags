import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link, navigate } from '@reach/router';

import { Forward, Back } from './Icons';
import { FLAG_BUILDER_STEPS } from '../const';
import theme from '../theme';

const hideStyle = css`
  visibility: hidden;
`;

const Wrapper = styled.div`
  height: ${props => props.theme.arrowNavHeight};
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
`;

const NavDot = (props) => (
  <Dot
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          backgroundColor: isCurrent ? theme.colors.white : theme.colors.grey.medium
        }
      };
    }}
  />
);

const ArrowNav = ({ stepId, stepIdx }) => {
  const isFirstStep = stepIdx === 0;
  const isLastStep = stepIdx === FLAG_BUILDER_STEPS.length - 1;

  const prev = () => navigate(`/flag-builder/${stepId - 1}`);
  const next = () => navigate(`/flag-builder/${stepId + 1}`);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'ArrowLeft' && !isFirstStep) {
        prev();
      }
      if (e.code === 'ArrowRight' && !isLastStep) {
        next();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [stepId])

  return (
    <Wrapper>
      <ArrowContainer
        hide={isFirstStep}
        onClick={prev}
      >
        <Back />
      </ArrowContainer>

      <Dots>
        {FLAG_BUILDER_STEPS.map(step => (
          <NavDot
            to={step.path}
            key={step.displayName}
          />
        ))}
      </Dots>

      <ArrowContainer
        hide={isLastStep}
        onClick={next}
      >
        <Forward />
      </ArrowContainer>
    </Wrapper>
  );
}

export default ArrowNav;