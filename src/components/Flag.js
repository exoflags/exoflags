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

const colorScale = scaleLinear()
  .domain([0, 100])
  .range(['#0000FF', '#FF0000']);

const planetaryRadiiScale = scaleLinear()
  .domain([0, 100])
  .range([0, 100]);

const planetaryMassScale = scaleLinear()
  .domain([0, 100])
  .range([0, 1]);

const solarRadiiScale = scaleLinear()
  .domain([0, 100])
  .range([0, 100]);

const solarMassScale = scaleLinear()
  .domain([0, 100])
  .range([0, 1]);

const bgStyle = (value) => css`
  background-color: ${colorScale(value)};
`;

// TODO: last bit is a percentage of the width - make this clearer!!!! can perhaps edit scale
const planetaryBorderWidth = (flagHeight, flagWidth, width) => `
  ${flagHeight}px
  0
  0
  ${flagWidth * (width/100)}px
`;

const planetaryBorderColor = (opacity) => `
  transparent
  transparent
  transparent
  rgba(0, 0, 0, ${opacity})
`;

// TODO: last bit is a percentage of the width - make this clearer!!!! can perhaps edit scale
const solarBorderWidth = (flagHeight, flagWidth, width) => `
  ${flagHeight}px
  ${flagWidth * (width / 100)}px
  0
  0
`;

const solarBorderColor = (opacity) => `
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
  width: ${props => planetaryRadiiScale(props.planetaryRadii)}%;
  border-style: solid;
  border-width: ${props => planetaryBorderWidth(props.flagHeight, props.flagWidth, planetaryRadiiScale(props.planetaryRadii))};
  border-color: ${props => planetaryBorderColor(planetaryMassScale(props.planetaryMass))};
`;

const SolarTriangle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: ${props => solarRadiiScale(props.solarRadii)}%;
  border-style: solid;
  border-width: ${props => solarBorderWidth(props.flagHeight, props.flagWidth, solarRadiiScale(props.solarRadii))};
  border-color: ${props => solarBorderColor(solarMassScale(props.solarMass))};
`;

// SolarTriangle
// swap height and width values
// bottom: 0;
// right: 0;
// border - width: ${ props => solarBorderHeight(props.flagHeight, props.flagWidth, solarRadiiScale(props.solarRadii)) };

// const solarBorderHeight = (flagHeight, flagWidth, height) => `
//   ${flagHeight * (height / 100)}px
//   ${flagWidth}px
//   0
//   0
// `;

// const solarBorderColor = (opacity) => `
//   transparent
//   rgba(255, 255, 255, ${opacity})
//   transparent
//   transparent
// `;

const BaseFlag = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  ${props => props.redshift !== undefined && bgStyle(props.redshift)};
`;

const Flag = ({
  redshift = 0,
  planetaryMass = 0,
  planetaryRadii = 0,
  solarMass = 0,
  solarRadii = 0
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
            planetaryRadii={planetaryRadii}
            flagHeight={flagHeight}
            flagWidth={flagWidth}
          />
          
          <SolarTriangle
            solarMass={solarMass}
            solarRadii={solarRadii}
            flagHeight={flagHeight}
            flagWidth={flagWidth}
          />
        </BaseFlag>
      )
    }}
  </AutoSizer>
);

export default Flag;
