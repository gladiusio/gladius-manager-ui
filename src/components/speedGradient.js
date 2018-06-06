import React from 'react';
import stepFunction, { step } from '../util/stepFunction';
import speedPropType from '../propTypes/speed';

const gradientStepper = stepFunction(
  step(40, '#31c7c3'),
  step(70, '#fa9200'),
  step(Number.MAX_SAFE_INTEGER, '#ff4070'),
);

function SpeedGradient(props) {
  const style = {
    color: gradientStepper(props.speed.value),
  };

  return (
    <span style={style}>
      {props.speed.value}{props.speed.unit}
    </span>
  );
}

SpeedGradient.propTypes = {
  speed: speedPropType.isRequired,
};

export default SpeedGradient;
