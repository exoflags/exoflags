import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { scaleLinear } from 'd3-scale';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

/*
  Can attempt this with pure css

  - sliders can feed into context state and get passed down to instances of flag component (pure/memoised)
  - as we want to render these instances sequentially, building up as we go, need to ensure that they only render based on what props they have
  - add styles in as needed with props
  - some props control render of child elements (e.g. triangles)
  - props for *those* components are put into scales to determine values
  - repaint rather than redraw should make this pretty snappy
*/

const distanceScale = scaleLinear()
  .domain([0, 100])
  .range(['#0000FF', '#FF0000']);

const planetaryRadiusScale = scaleLinear()
  .domain([0, 100])
  .range([0, 100]);

const planetaryMassScale = scaleLinear()
  .domain([0, 100])
  .range([0, 1]);

const stellarRadiusScale = scaleLinear()
  .domain([0, 100])
  .range([0, 100]);

const stellarMassScale = scaleLinear()
  .domain([0, 100])
  .range([0, 1]);

const bgStyle = (value) => css`
  background-color: ${distanceScale(value)};
`;

const planetaryBorderWidth = (flagHeight, flagWidth, width) => `
  ${flagHeight}px
  0
  0
  ${flagWidth * (width / 100)}px
`;

const planetaryBorderColor = (opacity) => `
  transparent
  transparent
  transparent
  rgba(0, 0, 0, ${opacity})
`;

const stellarBorderHeight = (flagHeight, flagWidth, height) => `
  ${flagHeight * (height / 100)}px
  ${flagWidth}px
  0
  0
`;

const stellarBorderColor = (opacity) => `
  transparent
  rgba(255, 255, 255, ${opacity})
  transparent
  transparent
`;

const PlanetaryTriangle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => planetaryRadiusScale(props.planetaryRadius)}%;
  border-style: solid;
  border-width: ${props => planetaryBorderWidth(props.flagHeight, props.flagWidth, planetaryRadiusScale(props.planetaryRadius))};
  border-color: ${props => planetaryBorderColor(planetaryMassScale(props.planetaryMass))};
`;

const StellarTriangle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: ${props => stellarRadiusScale(props.stellarRadius)}%;
  width: 100%;
  border-style: solid;
  border-width: ${props => stellarBorderHeight(props.flagHeight, props.flagWidth,stellarRadiusScale(props.stellarRadius))};
  border-color: ${props => stellarBorderColor(stellarMassScale(props.stellarMass))};
`;

const BaseFlag = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  ${props => props.redshift !== undefined && bgStyle(props.redshift)};
`;

const Flag = ({
  redshift = 0,
  planetaryMass = 0,
  planetaryRadius = 0,
  stellarMass = 0,
  stellarRadius = 0
}) => (
  <AutoSizer disableHeight>
    {({ width }) => {
      const flagWidth = 500; //width > 400 ? 400 : width;
      const flagHeight = 300; //flagWidth * (2 / 3);

      return (
        <BaseFlag
          width={flagWidth}
          height={flagHeight}
          redshift={redshift}
        >
          <PlanetaryTriangle
            planetaryMass={planetaryMass}
            planetaryRadius={planetaryRadius}
            flagHeight={flagHeight}
            flagWidth={flagWidth}
          />
          
          <StellarTriangle
            stellarMass={stellarMass}
            stellarRadius={stellarRadius}
            flagHeight={flagHeight}
            flagWidth={flagWidth}
          />
        </BaseFlag>
      )
    }}
  </AutoSizer>
);

export default Flag;
