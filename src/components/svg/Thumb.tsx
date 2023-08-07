import React from 'react';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import {Circle} from 'react-native-svg';
import {polar2Canvas} from 'react-native-redash';

import {SharedNumber} from '../../types';
import {useSliderContext} from '../../context/SliderContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface ThumbProps {
  color: string;
  theta: SharedNumber;
  radius?: number;
}

export function Thumb({color, theta, radius}: ThumbProps) {
  const {r, center, trackWidth} = useSliderContext();

  const thumbRadius = radius ? radius : trackWidth.value / 2;

  const position = useDerivedValue(() =>
    polar2Canvas({theta: theta.value, radius: r.value}, center.value),
  );

  const animatedProps = useAnimatedProps(() => {
    return {
      cx: position.value.x,
      cy: position.value.y,
      r: thumbRadius,
    };
  }, [position]);

  return <AnimatedCircle animatedProps={animatedProps} fill={color} />;
}
