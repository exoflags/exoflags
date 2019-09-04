import React, { Component } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { scaleLinear } from 'd3-scale';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { FLAG_PROPERTIES } from '../const'

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
  width: ${props => props.width}%;
  border-style: solid;
  border-width: ${props => props.borderWidth};
  border-color: ${props => props.borderColor};
`;

const StellarTriangle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: ${props => props.height}%;
  width: 100%;
  border-style: solid;
  border-width: ${props => props.borderWidth};
  border-color: ${props => props.borderColor};
`;

const BaseFlag = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.backgroundColor};
`;

class Flag extends Component {
  constructor(props) {
    super(props);

    const { extents } = props

    this.distanceScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.distance])
      .range(['#0000FF', '#FF0000']);

    this.planetaryRadiusScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.planetaryRadius])
      .range([0, 100]);

    this.planetaryMassScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.planetaryMass])
      .range([0, 1]);

    this.stellarRadiusScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.stellarRadius])
      .range([0, 100]);

    this.stellarMassScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.stellarMass])
      .range([0, 1]);
  }

  render() {
    const {
      distance = 0,
      planetaryMass = 0,
      planetaryRadius = 0,
      stellarMass = 0,
      stellarRadius = 0
    } = this.props;
    
    return (
      <AutoSizer disableHeight>
        {({ width }) => {
          const flagWidth = 500; //width > 400 ? 400 : width;
          const flagHeight = 300; //flagWidth * (2 / 3);

          return (
            <BaseFlag
              width={flagWidth}
              height={flagHeight}
              backgroundColor={this.distanceScale(distance)}
            >
              <PlanetaryTriangle
                width={this.planetaryRadiusScale(planetaryRadius)}
                borderWidth={planetaryBorderWidth(flagHeight, flagWidth, this.planetaryRadiusScale(planetaryRadius))}
                borderColor={planetaryBorderColor(this.planetaryMassScale(planetaryMass))}
              />

              <StellarTriangle
                height={this.stellarRadiusScale(stellarRadius)}
                borderWidth={stellarBorderHeight(flagHeight, flagWidth, this.stellarRadiusScale(stellarRadius))}
                borderColor={stellarBorderColor(this.stellarMassScale(stellarMass))}
              />
            </BaseFlag>
          )
        }}
      </AutoSizer>
    );
  }
}

export default Flag;
