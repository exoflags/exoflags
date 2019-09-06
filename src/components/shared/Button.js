import styled from '@emotion/styled';
import { css } from '@emotion/core';

const primaryStyles = theme => css`
  border: 2px solid ${theme.colors.white};
  border-radius: 35px;
  color: ${theme.colors.white};
`;

const secondaryStyles = theme => css`
  color: ${theme.colors.blue};
`;

const Button = styled.button`
  /* remove default button styles */
  background-color: transparent;
  border: none;
  padding: 0.25rem 0;
  width: 120px;
  font-weight: bold;
  cursor: pointer;

  ${props => props.primary && primaryStyles(props.theme)};
  ${props => props.secondary && secondaryStyles(props.theme)};
`;

export default Button;
