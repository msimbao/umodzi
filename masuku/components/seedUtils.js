import Rand from 'rand-seed';
import { heroPatterns } from './patterns';

export const getColorsFromSeed = (seed) => {
  const rng = new Rand(seed);
  const h = () => Math.floor(rng.next() * 360);
  const l = () => Math.floor(40 + rng.next() * 30);

  return {
    backgroundColor: `hsl(${h()}, 60%, ${l()}%)`,
    patternColor: `hsl(${h()}, 60%, ${l()}%)`,
  };
};
 
export const getPatternFromSeed = (seed) => {
  const rng = new Rand(seed);
  const index = Math.floor(rng.next() * heroPatterns.length);
  return heroPatterns[index];
};
