import Rand from 'rand-seed';
import { heroPatterns } from '@/components/patterns';

/**
 * Returns a pattern by index (or randomly based on seed if undefined)
 */
export const getPattern = (seed, patternIndex) => {
  if (
    typeof patternIndex === 'number' &&
    patternIndex >= 0 &&
    patternIndex < heroPatterns.length
  ) {
    return heroPatterns[patternIndex];
  }

  const rng = new Rand(seed);
  const index = Math.floor(rng.next() * heroPatterns.length);
  return heroPatterns[index];
};

/**
 * Returns a color — uses provided value or generates one from seed
 */
export const getColor = (seed, label, providedColor) => {
  if (providedColor) return providedColor;

  const rng = new Rand(`${seed}-${label}`);
  const h = Math.floor(rng.next() * 360);
  const l = Math.floor(40 + rng.next() * 30);

  return `hsl(${h}, 60%, ${l}%)`;
};
