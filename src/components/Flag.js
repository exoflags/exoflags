import React, { Component } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { scaleLinear } from 'd3-scale';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { FLAG_PROPERTIES } from '../const';

const planetaryBorderWidth = (flagHeight, flagWidth, width) => `
  ${flagHeight}px
  0
  0
  ${flagWidth * (width / 100)}px
`;

const planetaryBorderColor = opacity => `
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

const stellarBorderColor = opacity => `
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

    const { extents } = props;

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

    // TODO: set up actual ranges for the scales below
    this.planetaryNeighboursScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.planetaryNeighbours])
      .range([1, 100]);

    this.constellationScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.constellation])
      .range([1, 100]);
  }

  render() {
    /*
      Use lower bound of extent as the default value for flag properties.
      This means that if a property isn't passed in (as we haven't reached
      that step yet) it will default to the minimum value on the scale
      and not draw.

      TL;DR Thing won't draw until a value is passed in for said thing.
    */
    const {
      width,
      extents,
      distance = extents[FLAG_PROPERTIES.distance][0],
      planetaryMass = extents[FLAG_PROPERTIES.planetaryMass][0],
      planetaryRadius = extents[FLAG_PROPERTIES.planetaryRadius][0],
      stellarMass = extents[FLAG_PROPERTIES.stellarMass][0],
      stellarRadius = extents[FLAG_PROPERTIES.stellarRadius][0],
      planetaryNeighbours = extents[FLAG_PROPERTIES.planetaryNeighbours][0],
      constellation = extents[FLAG_PROPERTIES.constellation][0]
    } = this.props;

    const flagWidth = width; //width > 400 ? 400 : width;
    const flagHeight = flagWidth * (2 / 3);

    return (
      <BaseFlag
        width={flagWidth}
        height={flagHeight}
        backgroundColor={this.distanceScale(distance)}
      >
        <PlanetaryTriangle
          width={this.planetaryRadiusScale(planetaryRadius)}
          borderWidth={planetaryBorderWidth(
            flagHeight,
            flagWidth,
            this.planetaryRadiusScale(planetaryRadius)
          )}
          borderColor={planetaryBorderColor(
            this.planetaryMassScale(planetaryMass)
          )}
        />

        <StellarTriangle
          height={this.stellarRadiusScale(stellarRadius)}
          borderWidth={stellarBorderHeight(
            flagHeight,
            flagWidth,
            this.stellarRadiusScale(stellarRadius)
          )}
          borderColor={stellarBorderColor(this.stellarMassScale(stellarMass))}
        />
      </BaseFlag>
    );
  }
}

export default Flag;
