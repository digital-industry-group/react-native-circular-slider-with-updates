import React from 'react';
import {TAU} from 'react-native-redash';

import ScaleLine from './ScaleLine';
import {setClockwise} from '../utils/fp';
import {useScalePropsContext} from '../context/GaugeContext';

export default function ScaleRing() {
  const {total, unit, clockwise} = useScalePropsContext();

  return (
    <>
      {Array.from({length: total}).map((_, i) => {
        const theta = setClockwise((i * TAU) / total, clockwise);
        const isLong = i % unit === 0;
        return (
          <ScaleLine
            key={i}
            theta={theta}
            text={isLong ? String(i) : undefined}
          />
        );
      })}
    </>
  );
}
