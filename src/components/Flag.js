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
      .range(['#0000FF', '#FF0000']); // background colours

    this.planetaryRadiusScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.planetaryRadius])
      .range([5, 100]); // width percentages

    this.planetaryMassScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.planetaryMass])
      .range([0.15, 1]); // opacity values

    this.stellarRadiusScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.stellarRadius])
      .range([8.333, 100]); // width percentages

    this.stellarMassScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.stellarMass])
      .range([0.05, 0.8]); // opacity values

    // TODO: set up actual ranges for the scales below
    this.planetaryNeighboursScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.planetaryNeighbours])
      .range([1, 100]);

    this.constellationScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.constellation])
      .range([1, 100]);
  }

  render() {
    const { width, extents, flagProperties } = this.props;

    const flagWidth = width;
    const flagHeight = flagWidth * (2 / 3);

    // Set up defaults in case we need them
    const {
      distance = extents[FLAG_PROPERTIES.distance][0],
      planetaryMass = extents[FLAG_PROPERTIES.planetaryMass][0],
      planetaryRadius = extents[FLAG_PROPERTIES.planetaryRadius][0],
      stellarMass = extents[FLAG_PROPERTIES.stellarMass][0],
      stellarRadius = extents[FLAG_PROPERTIES.stellarRadius][0],
      planetaryNeighbours = extents[FLAG_PROPERTIES.planetaryNeighbours][0],
      constellation = extents[FLAG_PROPERTIES.constellation][0]
    } = flagProperties;

    return (
      <BaseFlag
        width={flagWidth}
        height={flagHeight}
        backgroundColor={this.distanceScale(distance)}
      >
        {/*
          Check for planetaryMass as this is the first thing needed
          to render triangle. We can use default for planetaryRadius.
        */}
        {flagProperties.planetaryMass !== undefined && (
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
        )}

        {/*
          Check for stellarMass as this is the first thing needed
          to render triangle. We can use default for stellarRadius.
        */}
        {flagProperties.stellarMass !== undefined && (
          <StellarTriangle
            height={this.stellarRadiusScale(stellarRadius)}
            borderWidth={stellarBorderHeight(
              flagHeight,
              flagWidth,
              this.stellarRadiusScale(stellarRadius)
            )}
            borderColor={stellarBorderColor(this.stellarMassScale(stellarMass))}
          />
        )}
      </BaseFlag>
    );
  }
}

export default Flag;
