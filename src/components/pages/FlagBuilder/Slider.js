import React, { Component } from 'react';
import styled from '@emotion/styled';
import { scaleLinear, scalePoint, scaleQuantize } from 'd3-scale';
import { select, event as d3Event } from 'd3-selection';
import { drag } from 'd3-drag';
import throttle from 'lodash.throttle';

import { ReactComponent as SliderThumb } from '../../../assets/SliderNode.svg';
import { FLAG_PROPERTIES } from '../../../const';

const sliderHeight = 40;
const trackHeight = 2;
const thumbSize = 30;
const padding = thumbSize * 2;
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

const ORDINAL_SCALES = [
  FLAG_PROPERTIES.planetaryNeighbours,
  FLAG_PROPERTIES.constellation
];

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

  getScale() {
    const { flagProperty, extents, width } = this.props;

    const isOrdinalScale = ORDINAL_SCALES.indexOf(flagProperty) > -1;
    const sliderWidth = getSliderWidth(width);
    const extent = extents[flagProperty] || [1, 100];

    if (isOrdinalScale) {
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

  handleChange = value => {
    const { setUserFlag, userFlag, flagProperty } = this.props;
    setUserFlag({
      ...userFlag,
      [flagProperty]: value
    });
  };

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
          <Track width={sliderWidth} height={trackHeight} />
          {value && (
            <Thumb
              ref={this.thumbRef}
              x={scale(value) - thumbSize / 2}
              y={-(thumbSize / 2) + 2}
              strokeWidth={trackHeight}
              width={thumbSize}
              height={thumbSize}
              fill="blueviolet"
            />
          )}
        </g>
      </SVG>
    );
  }
}

export default Slider;
