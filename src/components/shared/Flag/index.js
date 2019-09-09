import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import {
  FLAG_PROPERTIES,
  PLANETARY_NEIGHBOURS_CTX,
  CONSTELLATION_CTX
} from '../../../const';
import {
  BaseFlag,
  StellarTriangle,
  PlanetaryTriangle,
  PlanetaryNeighbours,
  Constellation
} from './Elements';

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

class Flag extends Component {
  constructor(props) {
    super(props);
    const { extents } = props;

    this.distanceScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.distance])
      .range(['#0000FF', '#FF0000']); // background colours

    this.stellarRadiusScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.stellarRadius])
      .range([8.333, 100]); // width percentages

    this.stellarMassScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.stellarMass])
      .range([0.05, 0.8]); // opacity values

    this.planetaryRadiusScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.planetaryRadius])
      .range([5, 100]); // width percentages

    this.planetaryMassScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.planetaryMass])
      .range([0.15, 1]); // opacity values

    // TODO: set up actual ranges for the scales below
    // Perhaps these don't need to be scales, just image refs
    // or functions to dynamically get image paths.
    // Will need to ensure image names match constellations in data,
    // or create a mapping.
    this.planetaryNeighboursScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.planetaryNeighbours])
      .range([1, 100]);

    this.constellationScale = scaleLinear()
      .domain(extents[FLAG_PROPERTIES.constellation])
      .range([1, 100]);
  }

  getConstellation() {
    const { extents, flagProperties } = this.props;
    const { constellation } = flagProperties;

    if (constellation) {
      return constellation;
    }
    const constellations = extents[FLAG_PROPERTIES.constellation];
    const randomIdx = Math.floor(Math.random() * constellations.length);

    return constellations[randomIdx];
  }

  getPlanetaryNeighboursFilename() {
    const { flagProperties } = this.props;
    const { planetaryNeighbours } = flagProperties;

    const filename = `${planetaryNeighbours}Planet${
      planetaryNeighbours === 1 ? '' : 's'
    }`;

    return PLANETARY_NEIGHBOURS_CTX(`./${filename}.svg`);
  }

  getConstellationFilename(name) {
    let filename;

    try {
      filename = CONSTELLATION_CTX(`./${name.replace(/ /g, '_')}.svg`);
    } catch (error) {
      console.log(error);
      filename = CONSTELLATION_CTX('./Antlia.svg');
    }

    return filename;
  }

  render() {
    const {
      width,
      flagProperties,
      stepIdx,
      extents,
      basicFlag = false
    } = this.props;

    const flagWidth = width;
    const flagHeight = flagWidth * (2 / 3);

    // N.B. from FLAG_BUILDER_STEPS
    const stellarMassIdx = 1;
    const planetaryMassIdx = 3;
    const planetaryNeighboursIdx = 5;
    const constellationIdx = 6;

    const {
      distance = extents[FLAG_PROPERTIES.distance][0],
      stellarMass = extents[FLAG_PROPERTIES.stellarMass][0],
      stellarRadius = extents[FLAG_PROPERTIES.stellarRadius][0],
      planetaryMass = extents[FLAG_PROPERTIES.planetaryMass][0],
      planetaryRadius = extents[FLAG_PROPERTIES.planetaryRadius][0],
      planetaryNeighbours = extents[FLAG_PROPERTIES.planetaryNeighbours][0]
    } = flagProperties;

    const constellationName = this.getConstellation();
    const planetaryNeighboursFilename = this.getPlanetaryNeighboursFilename();
    const constellationFilename = this.getConstellationFilename(
      constellationName
    );

    return (
      <BaseFlag
        width={flagWidth}
        height={flagHeight}
        backgroundColor={this.distanceScale(distance)}
      >
        {(basicFlag || stepIdx >= stellarMassIdx) && (
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

        {(basicFlag || stepIdx >= planetaryMassIdx) && (
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

        {(basicFlag || stepIdx >= planetaryNeighboursIdx) && (
          <PlanetaryNeighbours
            src={planetaryNeighboursFilename}
            alt={`${planetaryNeighbours} planetary neighbours`}
          />
        )}

        {(basicFlag || stepIdx >= constellationIdx) && (
          <Constellation src={constellationFilename} alt={constellationName} />
        )}
      </BaseFlag>
    );
  }
}

export default Flag;
