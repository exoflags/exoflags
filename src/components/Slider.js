import React, { Component } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from '@emotion/styled';
import { scaleLinear } from 'd3-scale';
import { select, event as d3Event } from 'd3-selection';
import { drag } from 'd3-drag';

/*
  TODO:
  - will need to use autosizer on the level above to pass width in
  - slider scale needs to be the same as the active flag property
    - perhaps these need to live up a level...
  - we want an *instance* of that scale however, as the range will be different (flag vs fullscreen)
  - different optional ticks for different properties
    - can make separate components for these, they'll always be in the same place

  - needs some sort of handleChange function
  - this can be something like () => setUserFlagValue('type', value)
*/

const Wrapper = styled.div`
  border: 1px solid red;
`;

const SVG = styled.svg`
  display: block;
`;

const Track = styled.rect`
  fill: ${props => props.theme.colors.white};
`;

const Thumb = styled.circle`
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const sliderHeight= 40;
const trackHeight = 2;
const thumbRadius = 9;
const padding = thumbRadius;
const getSliderWidth = (width) => width - (2 * padding)

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
        console.log(position, this.xScale(position))
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
      <Wrapper>
        <SVG height={sliderHeight} width={width}>
          <g transform={`translate(${padding}, ${(sliderHeight / 2) - (trackHeight / 2)})`}>
            <Track width={sliderWidth} height={trackHeight} />
            {value && (
              <Thumb
                ref={this.thumbRef}
                r={thumbRadius}
                cx={this.xScale(value)}
                cy={trackHeight / 2}
                fill="blueviolet"
              />
            )}
          </g>
        </SVG>
      </Wrapper>
    )
  }
}

export default Slider;
