import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, Rect, Path, Pattern } from 'react-native-svg';
import { getColorsFromSeed, getPatternFromSeed } from '@/components/seedUtils';

const SvgBackground = ({ seed }) => {
  const { backgroundColor, patternColor } = getColorsFromSeed(seed);
  const pattern = getPatternFromSeed(seed);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg height="100%" width="100%">
        <Defs>
          <Pattern
            id="bgPattern"
            patternUnits="userSpaceOnUse"
            width={pattern.width}
            height={pattern.height}
            viewBox={pattern.viewBox}
          >
            <Path d={pattern.path} fill={patternColor} />
          </Pattern>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={backgroundColor} />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#bgPattern)" />
      </Svg>
    </View>
  );
};

export default SvgBackground;
