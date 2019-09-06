import styled from '@emotion/styled';
import { css } from '@emotion/core';

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const bgImg = imgPath => css`
  background: url(${imgPath}) no-repeat center center;
  background-size: cover;
`;

export const FullScreen = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 2rem;
  background-color: ${props => props.bg};

  ${props => props.center && flexCenter};
  ${props => props.bgImg && bgImg(props.bgImg)};
`;
