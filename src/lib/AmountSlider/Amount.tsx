import React from 'react';
import {canvas2Polar, Vector, TAU} from 'react-native-redash';
import {runOnJS, useSharedValue} from 'react-native-reanimated';

import {
  useSliderContext,
  useTickMarkContext,
} from '../../context/SliderContext';
import {Container} from '../../components/Container';
import {FilledGauge, Thumb} from '../../components/svg';
import {GestureContext} from '../../components/Gesture';
import {amount2Theta, normalize, theta2Amount} from '../../utils/worklets';

export interface AmountProps {
  amount: number;
  thumbColor: string;
  thumbRadius?: number;
  filledColor: string;
  onChange?: (amount: number) => void;
  onMove?: (amount: number) => void;
  startDeg?: number;
  endDeg?: number;
}

export function Amount({
  amount,
  thumbColor,
  thumbRadius,
  filledColor,
  onChange,
    onMove,
  startDeg = 0,
  endDeg = 359,
}: AmountProps) {
  const {center, clockwise} = useSliderContext();
  const {total} = useTickMarkContext();

  const zeroTheta = useSharedValue(amount2Theta(startDeg, 360, clockwise));
  const endTheta = useSharedValue(amount2Theta(endDeg, 360, clockwise));
  const theta = useSharedValue(amount2Theta(amount, total, clockwise));

  const onGestureActive = ({x, y}: Vector, context: GestureContext) => {
    'worklet';
    if (context.target.value?.curr) {
      if (onMove) {
        runOnJS(onMove)(theta2Amount(theta.value, total, clockwise))
      }
      const {theta: newTheta} = canvas2Polar({x, y}, center.value);
      const delta = newTheta - context.offset;
      theta.value = normalize(theta.value + delta);
      context.offset = newTheta;
    }
  };

  const onGestureEnd = ({x, y}: Vector, context: GestureContext) => {
    'worklet';
    context.target.value = null;

    if (onChange) {
      runOnJS(onChange)(theta2Amount(theta.value, total, clockwise));
    }
  };

  return (
    <Container
      thetas={[theta]}
      onGestureActive={onGestureActive}
      onGestureEnd={onGestureEnd}>
      <FilledGauge
        color={filledColor}
        startTheta={zeroTheta}
        endTheta={theta}
      />
      <Thumb theta={theta} color={thumbColor} radius={thumbRadius}/>
    </Container>
  );
}
