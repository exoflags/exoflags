import React, { Component } from 'react';
import styled from '@emotion/styled';
import { scaleLinear, scalePoint, scaleQuantize } from 'd3-scale';
import { select, event as d3Event } from 'd3-selection';
import { drag } from 'd3-drag';
import throttle from 'lodash.throttle';

import { ReactComponent as SliderThumb } from '../../../assets/SliderNode.svg';
import {
  FLAG_PROPERTIES,
  PLANETARY_NEIGHBOURS_CTX,
  CONSTELLATION_CTX
} from '../../../const';

const sliderHeight = 140;
const trackHeight = 2;
const thumbSize = 30;
const padding = thumbSize * 2;
const labelPadding = 20;
const getSliderWidth = width => width - 2 * padding;

const SVG = styled.svg`
  display: block;
`;

const Track = styled.rect`
  fill: ${props => props.theme.colors.white};
`;

const Thumb = styled(SliderThumb)`
  transform-origin: 50% 50%;
  transform: rotate(45deg) translateY(17px);

  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const POINT_SCALES = [
  FLAG_PROPERTIES.planetaryNeighbours,
  FLAG_PROPERTIES.constellation
];

const MARKS = {
  [FLAG_PROPERTIES.distance]: [
    {
      id: 1,
      value: 0,
      renderer: () => <circle r={12} fill="#3b7cf6" />
    },
    {
      id: 2,
      value: 7659,
      renderer: () => (
        <ellipse
          rx={10}
          ry={20}
          stroke="black"
          strokeWidth={2}
          fill="none"
          style={{ filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))' }}
        />
      )
    },
    {
      id: 3,
      value: 8495.92,
      renderer: () => <circle r={8} fill="#63986c" />
    },
    {
      id: 4,
      value: 10000,
      renderer: () => <rect x={-9} y={-8} height={18} width={18} fill="white" />
    }
  ],
  [FLAG_PROPERTIES.stellarMass]: [],
  [FLAG_PROPERTIES.stellarRadius]: [
    {
      id: 1,
      value: 0.01906968,
      renderer: () => <circle r={6} fill="white" />
    },
    {
      id: 2,
      value: 1,
      renderer: () => <circle r={12} fill="#3b7cf6" />
    },
    {
      id: 3,
      value: 17668.05852,
      renderer: () => <circle r={40} fill="white" />
    }
  ],
  [FLAG_PROPERTIES.planetaryMass]: [],
  [FLAG_PROPERTIES.planetaryRadius]: [
    {
      id: 1,
      value: 0.33626999999999996,
      renderer: () => <circle r={6} fill="white" />
    },
    {
      id: 2,
      value: 1,
      renderer: () => <circle r={12} fill="#3b7cf6" />
    },
    {
      id: 3,
      value: 77.3421,
      renderer: () => <circle r={40} fill="white" />
    }
  ],
  [FLAG_PROPERTIES.planetaryNeighbours]: [],
  [FLAG_PROPERTIES.constellation]: []
};

class Slider extends Component {
  thumbRef = React.createRef();

  constructor(props) {
    super(props);

    this.handleChange = throttle(this.handleChange, 15);
  }

  componentDidMount() {
    this.initSlider();
  }

  initSlider() {
    this.thumb = select(this.thumbRef.current);
    this.thumb.call(
      drag().on('drag', () => {
        const { flagProperty } = this.props;
        const scale = this.getScale();
        const position = scale.invert(d3Event.x);

        this.handleChange(position);
      })
    );
  }

  handleChange = value => {
    const { setUserFlag, userFlag, flagProperty } = this.props;
    setUserFlag({
      ...userFlag,
      [flagProperty]: value
    });
  };

  getScale() {
    const { flagProperty, extents, width } = this.props;

    const isPointScale = POINT_SCALES.indexOf(flagProperty) > -1;
    const sliderWidth = getSliderWidth(width);
    const extent = extents[flagProperty] || [1, 100];

    if (isPointScale) {
      const scale = scalePoint()
        .domain(extent)
        .range([0, sliderWidth]);

      scale.invert = (function() {
        const domain = scale.domain();
        const range = scale.range();
        const quantScale = scaleQuantize()
          .domain(range)
          .range(domain);

        return function(value) {
          return quantScale(value);
        };
      })();

      return scale;
    }

    return scaleLinear()
      .clamp(true)
      .domain(extent)
      .range([0, sliderWidth]);
  }

  renderMarks(scale) {
    const { flagProperty } = this.props;
    const marks = MARKS[flagProperty];

    return marks.map(({ id, value, renderer }) => {
      return (
        <g key={id} transform={`translate(${scale(value)}, 0)`}>
          {renderer()}
        </g>
      );
    });
  }

  renderThumb(scale, value) {
    const { extents, flagProperty } = this.props;
    const thumbX = value !== undefined && scale(value) - thumbSize / 2;
    const thumbY = -(thumbSize / 2) + 2;
    const thumbGraphicScale = scaleLinear()
      .domain(extents[flagProperty])
      .range([30, 80]);

    return (
      <>
        {(flagProperty === FLAG_PROPERTIES.stellarMass ||
          flagProperty === FLAG_PROPERTIES.planetaryMass) && (
          <path
            d={`M ${thumbX + 2} ${2} Q ${thumbX +
              thumbSize / 2} ${thumbGraphicScale(value)} ${thumbX +
              thumbSize -
              3} 2`}
            stroke="white"
            strokeLinecap="round"
            strokeWidth={2}
            fill="none"
          />
        )}

        <Thumb
          ref={this.thumbRef}
          x={thumbX}
          y={thumbY}
          width={thumbSize}
          height={thumbSize}
        />
      </>
    );
  }

  renderLabels() {
    const { flagProperty, extents } = this.props;

    /*
      For point scales, render labels for each point
      specific type of render method for each
      null for rest
    */

    if (flagProperty === FLAG_PROPERTIES.planetaryNeighbours) {
      const scale = this.getScale();
      const values = extents[flagProperty];
      const height = 40;

      return (
        <g>
          {values.map(value => {
            const filename = `${value}Planet${value === 1 ? '' : 's'}`;
            const href = PLANETARY_NEIGHBOURS_CTX(`./${filename}.svg`);

            return (
              <image
                key={href}
                height={height}
                x={scale(value) - height / 2}
                y={-height - labelPadding}
                xlinkHref={href}
              />
            );
          })}
        </g>
      );
    }

    if (flagProperty === FLAG_PROPERTIES.constellation) {
      const scale = this.getScale();
      const values = extents[flagProperty];

      return (
        <g>
          {values.map(value => {
            return (
              <text
                key={value}
                fill="white"
                fontSize={10}
                alignmentBaseline="middle"
                transform={`translate(${scale(
                  value
                )}, -${labelPadding}) rotate(-90)`}
              >
                {value}
              </text>
            );
          })}
        </g>
      );
    }

    return null;
  }

  render() {
    const { extents, width, userFlag, flagProperty } = this.props;

    const value = userFlag[flagProperty];
    const sliderWidth = getSliderWidth(width);
    const scale = this.getScale();

    return (
      <SVG height={sliderHeight} width={width}>
        <g
          transform={`translate(${padding}, ${sliderHeight / 2 -
            trackHeight / 2})`}
        >
          {this.renderLabels()}

          <Track width={sliderWidth} height={trackHeight} />

          {this.renderMarks(scale)}

          {value !== undefined && this.renderThumb(scale, value)}
        </g>
      </SVG>
    );
  }
}

export default Slider;
