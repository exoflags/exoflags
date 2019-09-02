import React, { Component } from 'react';
import styled from '@emotion/styled';
import { scaleLinear } from 'd3-scale';
import { select, event as d3Event } from 'd3-selection';
import { drag } from 'd3-drag';

import { ReactComponent as SliderThumb} from '../assets/SliderNode.svg';

/*
  TODO:
  - slider scale needs to be the same as the active flag property
    - perhaps these need to live up a level...
  - we want an *instance* of that scale however, as the range will be different (flag vs fullscreen)
  - different optional ticks for different properties
    - can make separate components for these, they'll always be in the same place

  - needs some sort of handleChange function
  - this can be something like () => setUserFlagValue('type', value)
*/

const sliderHeight = 40;
const trackHeight = 2;
const thumbSize = 30;
const padding = thumbSize * 2;
const getSliderWidth = (width) => width - (2 * padding)

const SVG = styled.svg`
  display: block;
  border: 1px solid blue;
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

class Slider extends Component {
  xScale = scaleLinear().clamp(true)
  thumbRef = React.createRef()

  state = {
    value: 50
  }

  componentDidMount() {
    this.initSlider();
  }

  initSlider() {
    this.thumb = select(this.thumbRef.current);

    this.thumb.call(
      drag().on('drag', () => {
        const position = this.xScale.invert(d3Event.x)
        // TODO: should set state at level above later (i.e. flag page)
        // as value will also come from props
        this.setState(state => ({ value: position }))
      })
    )
  }

  render() {
    const { value } = this.state;
    const {
      extent = [1, 100],
      width = 400
    } = this.props;

    const sliderWidth = getSliderWidth(width)

    this.xScale.domain(extent).range([0, sliderWidth])

    return (
      <SVG height={sliderHeight} width={width}>
        <g transform={`translate(${padding}, ${(sliderHeight / 2) - (trackHeight / 2)})`}>
          <Track width={sliderWidth} height={trackHeight} />
          {value && (
            <Thumb
              ref={this.thumbRef}
              x={this.xScale(value) - (thumbSize / 2)}
              y={-(thumbSize / 2) + 2}
              strokeWidth={trackHeight}
              width={thumbSize}
              height={thumbSize}
              fill="blueviolet"
            />
          )}
        </g>
      </SVG>
    )
  }
}

export default Slider;