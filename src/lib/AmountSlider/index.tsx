import React from 'react';

import {Amount} from './Amount';
import Slider from '../../components/Slider';
import {SliderOptions, TickMarkOptions, TrackOptions} from '../../types';

export interface AmountSliderProps extends SliderOptions {
  amount: number;
  thumbColor?: string;
  thumbRadius?: number;
  filledColor?: string;
  onChange?: (amount: number) => void;
  thumbIcon?: React.ReactNode;
  trackOptions?: TrackOptions;
  tickMarkOptions?: TickMarkOptions;
  onMove?: (amount: number) => void;
  startDeg?: number;
  endDeg?: number;
  padding?: number;
}

export function AmountSlider({
  size,
  clockwise,
  thumbColor = '#FFA500',
  thumbRadius,
  filledColor = '#FFE5B4',
  amount,
  onChange,
  onMove,
  startDeg,
  endDeg,
  thumbIcon,
  trackOptions = {},
  tickMarkOptions = {},
  padding = 0,
}: AmountSliderProps) {
  return (
    <Slider
      size={size}
      padding={padding}
      clockwise={clockwise}
      trackOptions={trackOptions}
      tickMarkOptions={tickMarkOptions}
      thumbOptions={{colors: ['#FFA500'], icons: [thumbIcon]}}>
      <Amount
        amount={amount}
        thumbColor={thumbColor}
        thumbRadius={thumbRadius}
        filledColor={filledColor}
        onChange={onChange}
        onMove={onMove}
        startDeg={startDeg}
        endDeg={endDeg}
      />
    </Slider>
  );
}
