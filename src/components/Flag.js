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

const radiiScale = scaleLinear()
  .domain([0, 100])
  .range([0, 100]);

const massScale = scaleLinear()
  .domain([0, 100])
  .range([0, 1]);

const bgStyle = (value) => css`
  background-color: ${colorScale(value)};
`;

// TODO: last bit is a percentage of the width - make this clearer!!!! can perhaps edit scale
const borderWidth = (flagHeight, flagWidth, width) => `${flagHeight}px 0 0 ${flagWidth * (width/100)}px`;

const borderColor = (mass) => `transparent transparent transparent rgba(0, 0, 0, ${massScale(mass)})`;

const Triangle = styled.div`
  position: relative;
  height: 100%;
  width: ${props => radiiScale(props.radii)}%;
  border: 1px solid yellow;

  border-style: solid;
  border-width: ${props => borderWidth(props.flagHeight, props.flagWidth, radiiScale(props.radii))};;
  border-color: ${props => borderColor(props.mass)};
`;

const BaseFlag = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  ${props => props.redshift && bgStyle(props.redshift)};
`;

const Flag = () => (
  <AutoSizer disableHeight>
    {({ width }) => {
      const flagWidth = width > 400 ? 400 : width;
      const flagHeight = flagWidth * (2 / 3);

      return (
        <BaseFlag
          width={flagWidth}
          height={flagHeight}
          redshift={20}
        >
          <Triangle
            radii={70}
            mass={20}
            flagHeight={flagHeight}
            flagWidth={flagWidth}
          />
        </BaseFlag>
      )
    }}
  </AutoSizer>
);

export default Flag;
