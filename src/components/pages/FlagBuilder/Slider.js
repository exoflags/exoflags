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
import Axis from './Axis';

const sliderHeight = 90;
const axisHeight = 100;
const trackHeight = 2;
const thumbSize = 30;
const padding = thumbSize * 2;
const labelPadding = 20;
const tickHeight = 8;
const getSliderWidth = width => width - 2 * padding;

const SVG = styled.svg`
  display: block;
  /* border: 1px solid red; */
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

const Tick = ({ position, label }) => (
  <g transform={`translate(${position}, 0)`}>
    <line
      x1={0}
      x2={0}
      y1={0}
      y2={tickHeight}
      stroke="#d8d8d8"
      strokeWidth={1}
    />
    {label !== undefined && (
      <text
        y={tickHeight + 8}
        fill="white"
        textAnchor="middle"
        alignmentBaseline="hanging"
      >
        {label}
      </text>
    )}
  </g>
);

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
        <g stroke="#A5A5A5" strokeWidth="2" fill="none">
          <g>
            <ellipse rx="4" ry="14"></ellipse>
            <ellipse rx="8" ry="32"></ellipse>
          </g>
        </g>
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
      renderer: () => (
        <g
          stroke="none"
          stroke-width="1"
          fill="none"
          fillRule="evenodd"
          transform={`translate(0, -12)`}
        >
          <g transform="translate(-1762.000000, -732.000000)" fill="#FFFFFF">
            <polygon points="1762 732 1787 744.5 1762 757"></polygon>
          </g>
        </g>
      )
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
      value: 0.054875,
      renderer: () => <circle r={6} fill="white" />
    },
    {
      id: 2,
      value: 1,
      renderer: () => <circle r={12} fill="#3b7cf6" />
    },
    {
      id: 3,
      value: 168.134,
      renderer: () => <circle r={40} fill="white" />
    }
  ],
  [FLAG_PROPERTIES.planetaryNeighbours]: [],
  [FLAG_PROPERTIES.constellation]: []
};

/*
  TODO: determine minimum, e.g. start and end labels
  
*/

const AXIS_LABELS = {
  [FLAG_PROPERTIES.distance]: [
    {
      id: 1,
      text: ['Earth:', '0 Parsecs'],
      value: 0,
      textAnchor: 'start'
    },
    {
      id: 2,
      text: ['Closest', 'Galactic', 'Neighbour', '7659 Parsecs'],
      value: 7659,
      textAnchor: 'start'
    },
    {
      id: 3,
      text: ['Farthest', 'Observed', 'Exoplanet', '8495.92 Parsecs'],
      value: 8495.92,
      textAnchor: 'start'
    },
    {
      id: 4,
      text: ['Farthest', 'Likely', 'Planetary', 'Formations', '10000 Parsecs'],
      value: 10000,
      textAnchor: 'end'
    }
  ],
  [FLAG_PROPERTIES.stellarMass]: [
    {
      id: 1,
      text: ['Smallest definition', 'of stellar mass', '0.07 Solar Masses'],
      value: 0.07,
      textAnchor: 'start'
    },
    {
      id: 2,
      text: ['Most massive host', 'star observed to date'],
      value: 280, // TODO: need actual figure here!
      textAnchor: 'start'
    },
    {
      id: 3,
      text: ['Theoretical limit', 'to solar mass:', '350 solar', 'masses'],
      value: 350, // TODO: need actual values for this
      textAnchor: 'end'
    }
  ],
  [FLAG_PROPERTIES.stellarRadius]: [
    // {
    //   id: 1,
    //   text: ['Smallest', 'Definition of', 'Planetary Radius'],
    //   value: 0,
    //   textAnchor: 'start'
    // },
    {
      id: 2,
      text: ['Solar', 'Radius'],
      value: 1,
      textAnchor: 'start'
    },
    {
      id: 3,
      text: [
        'Largest current',
        'observed stellar',
        'radius, UY Scuti:',
        '1708 Solar radii'
      ],
      value: 1708,
      textAnchor: 'start'
    },
    {
      id: 4,
      text: [
        'Proposed limit of',
        'possible stellar radius:',
        '2600 Solar radii'
      ],
      value: 2600,
      textAnchor: 'end'
    }
  ],
  [FLAG_PROPERTIES.planetaryMass]: [
    {
      id: 1,
      text: ['Smallest Definition of', 'exoplanetary mass'],
      value: 0,
      textAnchor: 'start'
    },
    // {
    //   id: 2,
    //   text: [
    //     'Most massive',
    //     'planet observed',
    //     'to data CD-33',
    //     '2722b: ~31',
    //     'Jupiter masses'
    //   ],
    //   value: 31,
    //   textAnchor: 'start'
    // },
    {
      id: 3,
      text: ['Limit of mass', 'possible in', 'exoplanet', 'formation'],
      value: 17668.05852,
      textAnchor: 'end'
    }
  ],
  [FLAG_PROPERTIES.planetaryRadius]: [
    // {
    //   id: 1,
    //   text: [
    //     'Smallest',
    //     'theoretical',
    //     'definition of',
    //     'planetary',
    //     'radius:',
    //     '350km'
    //   ],
    //   value: 0.054875,
    //   textAnchor: 'start'
    // },
    {
      id: 2,
      text: ['Earth', 'radius:', '1 Er'],
      value: 1,
      textAnchor: 'start'
    },
    // {
    //   id: 3,
    //   text: ['Largest', 'Observed', 'Planetary Radius', 'To Date: 1400 Er'],
    //   value: ,
    //   textAnchor: 'start'
    // },
    {
      id: 4,
      text: [
        'Proposed limit of',
        'possible',
        'planetary radius' /* , '48000 Er' */
      ],
      value: 168.134,
      textAnchor: 'end'
    }
  ],
  [FLAG_PROPERTIES.planetaryNeighbours]: [
    {
      id: 1,
      text: ['0 Planets', 'in host system'],
      value: 0,
      textAnchor: 'start'
    },
    {
      id: 2,
      text: ['10 Planets', 'in host system'],
      value: 10,
      textAnchor: 'end'
    }
  ],
  [FLAG_PROPERTIES.constellation]: []
};

class Slider extends Component {
  thumbRef = React.createRef();
  axisRef = React.createRef();

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

  renderLabels(scale) {
    const { flagProperty, extents, width } = this.props;

    /*
      For point scales, render labels for each point
      specific type of render method for each
      null for rest
    */

    if (flagProperty === FLAG_PROPERTIES.planetaryNeighbours) {
      const values = extents[flagProperty];
      const height = 40;

      return (
        <SVG height={height + 10} width={width}>
          <g transform={`translate(${padding}, 0)`}>
            {values.map(value => {
              const filename = `${value}Planet${value === 1 ? '' : 's'}`;
              const href = PLANETARY_NEIGHBOURS_CTX(`./${filename}.svg`);

              return (
                <image
                  key={href}
                  height={height}
                  width={40}
                  x={scale(value) - height / 2}
                  y={0}
                  xlinkHref={href}
                />
              );
            })}
          </g>
        </SVG>
      );
    }

    if (flagProperty === FLAG_PROPERTIES.constellation) {
      const values = extents[flagProperty];
      const height = 90;

      return (
        <SVG height={height} width={width}>
          <g transform={`translate(${padding}, ${height})`}>
            {values.map(value => {
              return (
                <text
                  key={value}
                  fill="white"
                  fontSize={10}
                  alignmentBaseline="middle"
                  transform={`translate(${scale(value)}, 0) rotate(-90)`}
                >
                  {value}
                </text>
              );
            })}
          </g>
        </SVG>
      );
    }

    return null;
  }

  renderAxisLabels(scale, labels, hasAxis) {
    const { flagProperty } = this.props;

    const translateY = hasAxis ? tickHeight * 3 : 0;

    return labels.map(({ id, value, text, textAnchor }) => {
      return (
        <g key={id} transform={`translate(${scale(value)}, ${translateY})`}>
          {text.map((d, i) => (
            <text
              key={i}
              transform={`translate(0, ${i * 10})`}
              fill="white"
              fontSize={10}
              alignmentBaseline="hanging"
              textAnchor={textAnchor}
            >
              {d}
            </text>
          ))}
        </g>
      );
    });
  }

  render() {
    const { extents, width, userFlag, flagProperty } = this.props;

    const value = userFlag[flagProperty];
    const sliderWidth = getSliderWidth(width);
    const scale = this.getScale();
    const hasAxis =
      flagProperty !== FLAG_PROPERTIES.planetaryNeighbours &&
      flagProperty !== FLAG_PROPERTIES.constellation;
    const labels = AXIS_LABELS[flagProperty];

    return (
      <div>
        {this.renderLabels(scale)}

        <SVG height={sliderHeight} width={width}>
          <g
            transform={`translate(${padding}, ${sliderHeight / 2 -
              trackHeight / 2})`}
          >
            <Track width={sliderWidth} height={trackHeight} />

            {this.renderMarks(scale)}

            {value !== undefined && this.renderThumb(scale, value)}
          </g>
        </SVG>

        {labels.length > 0 && (
          <SVG height={axisHeight} width={width}>
            <g transform={`translate(${padding}, 20)`}>
              {hasAxis && <Axis flagProperty={flagProperty} scale={scale} />}

              {this.renderAxisLabels(scale, labels, hasAxis)}
            </g>
          </SVG>
        )}
      </div>
    );
  }
}

export default Slider;
