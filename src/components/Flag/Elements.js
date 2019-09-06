import styled from '@emotion/styled';

export const BaseFlag = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.backgroundColor};
`;

export const StellarTriangle = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0;
  right: 0;
  height: ${props => props.height}%;
  width: 100%;
  border-style: solid;
  border-width: ${props => props.borderWidth};
  border-color: ${props => props.borderColor};
`;

export const PlanetaryTriangle = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => props.width}%;
  border-style: solid;
  border-width: ${props => props.borderWidth};
  border-color: ${props => props.borderColor};
`;

export const PlanetaryNeighbours = styled.img`
  border: 1px solid red;
  z-index: 3;
  display: block;
  margin: 0;
  position: absolute;
  top: 5%;
  right: 5%;
  height: 33%;
  width: 20%;
`;

export const Constellation = styled.div`
  border: 1px solid blue;
  z-index: 4;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  height: 30%;
  width: 30%;
`;
