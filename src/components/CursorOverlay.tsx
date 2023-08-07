import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {polar2Canvas} from 'react-native-redash';
import {Pressable, StyleSheet} from 'react-native';
import React from 'react';

import {SharedNumber} from '../types';
import {useSliderContext} from '../context/SliderContext';

interface CursorOverlayProps {
  theta: SharedNumber;
  onPressIn?: () => void;
  children?: React.ReactNode;
}

const CursorOverlay = ({theta, onPressIn, children}: CursorOverlayProps) => {
  const {r, center, trackWidth} = useSliderContext();

  const position = useDerivedValue(() =>
    polar2Canvas({theta: theta.value, radius: r.value}, center.value),
  );

  const animatedStyle = useAnimatedStyle(() => {
    const {x, y} = position.value;

    return {
      width: trackWidth.value * 2,
      height: trackWidth.value * 2,
      borderRadius: trackWidth.value / 2,
      transform: [
        {translateX: x - trackWidth.value / 2},
        {translateY: y - trackWidth.value / 2},
      ],
    };
  });

  return (
    <Pressable onPressIn={onPressIn}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default CursorOverlay;
