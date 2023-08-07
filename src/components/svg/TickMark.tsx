import React, {memo} from 'react';
import {TAU} from 'react-native-redash';

import {Mark} from './Mark';
import {setClockwise} from '../../utils/worklets';
import {SharedNumber, SharedVector} from '../../types';

export interface TickMarkProps {
  r: SharedNumber;
  trackWidth: SharedNumber;
  center: SharedVector;
  color: string;
  showText: boolean;
  thickness: number;
  clockwise: boolean;
  length: number;
  total: number;
  unit: number;
  longLength: number;
}

export const TickMark = memo(
  ({
    r,
    trackWidth,
    center,
    showText,
    color,
    thickness,
    length,
    clockwise,
    total,
    unit,
    longLength,
  }: TickMarkProps) => {
    const allValues = Array.from({length: total}).map((_, i) => {
      const theta = setClockwise((i * TAU) / total, clockwise);
      const isLong = i % unit === 0;
      return {
        theta,
        isLong,
      };
    });
    const allTicks = allValues.filter(v => (length ? true : v.isLong));
    return (
      <React.Fragment>
        {allTicks.map((v, i) => {
          const {theta, isLong} = v;
          return (
            <Mark
              key={i}
              theta={theta}
              text={isLong ? String(i) : undefined}
              {...{
                r,
                trackWidth,
                center,
                showText,
                color,
                thickness,
                length,
                longLength,
              }}
            />
          );
        })}
      </React.Fragment>
    );
  },
);
