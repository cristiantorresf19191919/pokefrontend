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
  rock: '#B69E31',
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

// Pokemon number to types mapping (for Pokemon without type in API)
// Returns array of types for dual-type Pokemon
export const getPokemonTypesByNumber = (number: number): string[] => {
  const typeMap: Record<number, string[]> = {
    // Generation 1 Starters
    1: ['grass', 'poison'],   // Bulbasaur
    2: ['grass', 'poison'],   // Ivysaur
    3: ['grass', 'poison'],   // Venusaur
    4: ['fire'],              // Charmander
    5: ['fire'],              // Charmeleon
    6: ['fire', 'flying'],    // Charizard
    7: ['water'],             // Squirtle
    8: ['water'],             // Wartortle
    9: ['water'],             // Blastoise
    // Generation 1 Common
    10: ['bug'],              // Caterpie
    11: ['bug'],              // Metapod
    12: ['bug', 'flying'],    // Butterfree
    13: ['bug', 'poison'],    // Weedle
    14: ['bug', 'poison'],    // Kakuna
    15: ['bug', 'poison'],    // Beedrill
    16: ['normal', 'flying'], // Pidgey
    17: ['normal', 'flying'], // Pidgeotto
    18: ['normal', 'flying'], // Pidgeot
    19: ['normal'],           // Rattata
    20: ['normal'],           // Raticate
    25: ['electric'],         // Pikachu
    26: ['electric'],         // Raichu
    37: ['fire'],             // Vulpix
    38: ['fire'],             // Ninetales
    39: ['normal', 'fairy'],  // Jigglypuff
    40: ['normal', 'fairy'],  // Wigglytuff
    50: ['ground'],           // Diglett
    51: ['ground'],           // Dugtrio
    52: ['normal'],           // Meowth
    53: ['normal'],           // Persian
    54: ['water'],            // Psyduck
    55: ['water'],            // Golduck
    58: ['fire'],            // Growlithe
    59: ['fire'],            // Arcanine
    60: ['water'],           // Poliwag
    61: ['water'],           // Poliwhirl
    62: ['water', 'fighting'], // Poliwrath
    63: ['psychic'],         // Abra
    64: ['psychic'],         // Kadabra
    65: ['psychic'],         // Alakazam
    66: ['fighting'],        // Machop
    67: ['fighting'],        // Machoke
    68: ['fighting'],        // Machamp
    69: ['grass', 'poison'], // Bellsprout
    70: ['grass', 'poison'], // Weepinbell
    71: ['grass', 'poison'], // Victreebel
    72: ['water', 'poison'], // Tentacool
    73: ['water', 'poison'], // Tentacruel
    74: ['rock', 'ground'],  // Geodude
    75: ['rock', 'ground'],  // Graveler
    76: ['rock', 'ground'],  // Golem
    77: ['fire'],            // Ponyta
    78: ['fire'],            // Rapidash
    79: ['water', 'psychic'], // Slowpoke
    80: ['water', 'psychic'], // Slowbro
    81: ['electric', 'steel'], // Magnemite
    82: ['electric', 'steel'], // Magneton
    90: ['water'],          // Shellder
    91: ['water', 'ice'],    // Cloyster
    92: ['ghost', 'poison'], // Gastly
    93: ['ghost', 'poison'], // Haunter
    94: ['ghost', 'poison'], // Gengar
    95: ['rock', 'ground'],  // Onix
    96: ['psychic'],         // Drowzee
    97: ['psychic'],         // Hypno
    98: ['water'],          // Krabby
    99: ['water'],          // Kingler
    100: ['electric'],       // Voltorb
    101: ['electric'],       // Electrode
    102: ['grass', 'psychic'], // Exeggcute
    103: ['grass', 'psychic'], // Exeggutor
    104: ['ground'],        // Cubone
    105: ['ground'],        // Marowak
    106: ['fighting'],      // Hitmonlee
    107: ['fighting'],      // Hitmonchan
    108: ['normal'],        // Lickitung
    109: ['poison'],        // Koffing
    110: ['poison'],        // Weezing
    111: ['ground', 'rock'], // Rhyhorn
    112: ['ground', 'rock'], // Rhydon
    113: ['normal'],        // Chansey
    114: ['grass'],         // Tangela
    115: ['normal'],        // Kangaskhan
    116: ['water'],         // Horsea
    117: ['water'],         // Seadra
    118: ['water'],         // Goldeen
    119: ['water'],         // Seaking
    120: ['water'],         // Staryu
    121: ['water', 'psychic'], // Starmie
    122: ['psychic', 'fairy'], // Mr. Mime
    123: ['bug', 'flying'],  // Scyther
    124: ['ice', 'psychic'], // Jynx
    125: ['electric'],      // Electabuzz
    126: ['fire'],          // Magmar
    127: ['bug'],           // Pinsir
    128: ['normal'],        // Tauros
    129: ['water'],         // Magikarp
    130: ['water', 'flying'], // Gyarados
    131: ['water', 'ice'],   // Lapras
    132: ['normal'],        // Ditto
    133: ['normal'],        // Eevee
    134: ['water'],         // Vaporeon
    135: ['electric'],      // Jolteon
    136: ['fire'],          // Flareon
    137: ['normal'],        // Porygon
    138: ['rock', 'water'],  // Omanyte
    139: ['rock', 'water'],  // Omastar
    140: ['rock', 'water'],  // Kabuto
    141: ['rock', 'water'],  // Kabutops
    142: ['rock', 'flying'], // Aerodactyl
    143: ['normal'],        // Snorlax
    144: ['ice', 'flying'],  // Articuno
    145: ['electric', 'flying'], // Zapdos
    146: ['fire', 'flying'], // Moltres
    147: ['dragon'],        // Dratini
    148: ['dragon'],        // Dragonair
    149: ['dragon', 'flying'], // Dragonite
    150: ['psychic'],       // Mewtwo
    151: ['psychic'],       // Mew
  };
  
  return typeMap[number] || ['normal'];
};

// Legacy function for single type (returns first type)
export const getPokemonTypeByNumber = (number: number): string => {
  const types = getPokemonTypesByNumber(number);
  return types[0];
};

// Pokemon stats mock data (until API supports it)
export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonPhysicalData {
  weight: number; // in kg
  height: number; // in m
}

// Mock stats data - replace with API data when available
export const getPokemonStats = (number: number): PokemonStats => {
  // This is placeholder data - should come from API
  const statsMap: Record<number, PokemonStats> = {
    12: { hp: 60, attack: 45, defense: 50, specialAttack: 90, specialDefense: 80, speed: 70 }, // Butterfree
    4: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 }, // Charmander
  };
  
  return statsMap[number] || { hp: 50, attack: 50, defense: 50, specialAttack: 50, specialDefense: 50, speed: 50 };
};

// Mock physical data - replace with API data when available
export const getPokemonPhysicalData = (number: number): PokemonPhysicalData => {
  const dataMap: Record<number, PokemonPhysicalData> = {
    12: { weight: 32.0, height: 1.1 }, // Butterfree
    4: { weight: 8.5, height: 0.6 }, // Charmander
  };
  
  return dataMap[number] || { weight: 0, height: 0 };
};

// Mock description data - replace with API data when available
export const getPokemonDescription = (number: number): string => {
  const descriptions: Record<number, string> = {
    12: 'In battle, it flaps its wings at great speed to release highly toxic dust into the air.', // Butterfree
    4: 'It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.', // Charmander
  };
  
  return descriptions[number] || 'A Pokemon with unique abilities and characteristics.';
};

