import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';

import Button from '../../shared/Button';
import { FLAG_BUILDER_STEPS } from '../../../const';
import theme from '../../../theme';

const Wrapper = styled.div`
  height: ${props => props.theme.flagBuilderNavHeight};
  width: 100%;
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > * + * {
    margin-left: 1rem;
  }
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

const NavDot = props => (
  <Dot
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          backgroundColor: isCurrent
            ? theme.colors.blue
            : theme.colors.grey.light
        }
      };
    }}
  />
);

const FlagBuilderNav = ({ stepId, stepIdx, navigate }) => {
  const isFirstStep = stepIdx === 0;
  const isLastStep = stepIdx === FLAG_BUILDER_STEPS.length - 1;

  const prev = () => navigate(`/explore/${stepId - 1}`);
  const next = () => {
    if (isLastStep) {
      navigate('/explore/closest-match');
      return;
    }

    navigate(`/explore/${stepId + 1}`);
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'ArrowLeft' && !isFirstStep) {
        prev();
      }
      if (e.code === 'ArrowRight') {
        next();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stepId]);

  return (
    <Wrapper>
      <Dots>
        {FLAG_BUILDER_STEPS.map(step => (
          <NavDot to={step.path} key={step.title} />
        ))}
      </Dots>

      <ButtonContainer>
        {!isFirstStep && (
          <Button onClick={prev} secondary>
            PREVIOUS
          </Button>
        )}

        <Button onClick={next} primary>
          NEXT
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default FlagBuilderNav;
