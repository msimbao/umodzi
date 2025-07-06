import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, Rect, Path, Pattern } from 'react-native-svg';
import { getColor, getPattern } from './seedUtils';

const SvgBackground = ({
  seed = 'default-seed',
  patternIndex,            // Optional: index of pattern in heroPatterns
  backgroundColor,         // Optional: override background color
  patternColor             // Optional: override pattern color
}) => {
  const pattern = getPattern(seed, patternIndex);
  const bg = getColor(seed, 'bg', backgroundColor);
  const fg = getColor(seed, 'fg', patternColor);

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
            <Path d={pattern.path} fill={fg} />
          </Pattern>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={bg} />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#bgPattern)" />
      </Svg>
    </View>
  );
};

export default SvgBackground;
