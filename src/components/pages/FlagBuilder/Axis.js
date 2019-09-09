import React, { createRef, useEffect } from 'react';
import { select } from 'd3-selection';
import { axisTop } from 'd3-axis';

const axisRef = createRef();
const tickHeight = 8;

const Axis = ({ flagProperty, scale }) => {
  useEffect(() => {
    const axis = axisTop(scale);
    const axisG = select(axisRef.current);

    axisG.call(axis);

    const ticks = axisG.selectAll('.tick');

    axisG.select('path').attr('stroke', '#d8d8d8');

    ticks
      .selectAll('text')
      .attr('y', 0 + tickHeight)
      .attr('alignment-baseline', 'hanging');

    ticks.selectAll('line').attr('stroke', '#d8d8d8');
  }, [flagProperty, scale]);

  return <g ref={axisRef} />;
};

export default Axis;
