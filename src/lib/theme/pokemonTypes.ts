// Pokemon Type Colors from Figma Design System
export const POKEMON_TYPE_COLORS: Record<string, string> = {
  bug: '#A7B723',
  dark: '#75574C',
  dragon: '#7037FF',
  electric: '#F9CF30',
  fairy: '#E69EAC',
  fighting: '#C12239',
  fire: '#F57D31',
  flying: '#A891EC',
  ghost: '#705598',
  normal: '#AAA67F',
  grass: '#74CB48',
  ground: '#DEC16B',
  ice: '#9AD6DF',
  poison: '#A43E9E',
  psychic: '#FB5584',
  rock: '#869E31',
  steel: '#B7B9D0',
  water: '#6493EB',
};

// Grayscale Colors from Figma
export const GRAYSCALE = {
  dark: '#212121',
  medium: '#666666',
  light: '#E0E0E0',
  background: '#EFEFEF',
  white: '#FFFFFF',
};

// Primary Color
export const PRIMARY_COLOR = '#DC0A2D';

// Get Pokemon type color (defaults to normal if not found)
export const getPokemonTypeColor = (type: string): string => {
  return POKEMON_TYPE_COLORS[type.toLowerCase()] || POKEMON_TYPE_COLORS.normal;
};

