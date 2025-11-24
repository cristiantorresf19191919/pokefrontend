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

// Pokemon number to type mapping (for Pokemon without type in API)
// This is a basic mapping for common Pokemon - can be expanded
export const getPokemonTypeByNumber = (number: number): string => {
  const typeMap: Record<number, string> = {
    // Generation 1 Starters
    1: 'grass',   // Bulbasaur
    2: 'grass',   // Ivysaur
    3: 'grass',   // Venusaur
    4: 'fire',    // Charmander
    5: 'fire',    // Charmeleon
    6: 'fire',    // Charizard
    7: 'water',   // Squirtle
    8: 'water',   // Wartortle
    9: 'water',   // Blastoise
    // Generation 1 Common
    10: 'bug',    // Caterpie
    11: 'bug',    // Metapod
    12: 'bug',    // Butterfree
    13: 'bug',    // Weedle
    14: 'bug',    // Kakuna
    15: 'bug',    // Beedrill
    16: 'normal', // Pidgey
    17: 'normal', // Pidgeotto
    18: 'normal', // Pidgeot
    19: 'normal', // Rattata
    20: 'normal', // Raticate
    25: 'electric', // Pikachu
    26: 'electric', // Raichu
    37: 'fire',   // Vulpix
    38: 'fire',   // Ninetales
    39: 'normal', // Jigglypuff
    40: 'normal', // Wigglytuff
    50: 'ground', // Diglett
    51: 'ground', // Dugtrio
    52: 'normal', // Meowth
    53: 'normal', // Persian
    54: 'water',  // Psyduck
    55: 'water',  // Golduck
    58: 'fire',   // Growlithe
    59: 'fire',   // Arcanine
    60: 'water',  // Poliwag
    61: 'water',  // Poliwhirl
    62: 'water',  // Poliwrath
    63: 'psychic', // Abra
    64: 'psychic', // Kadabra
    65: 'psychic', // Alakazam
    66: 'fighting', // Machop
    67: 'fighting', // Machoke
    68: 'fighting', // Machamp
    69: 'grass',   // Bellsprout
    70: 'grass',   // Weepinbell
    71: 'grass',   // Victreebel
    72: 'water',  // Tentacool
    73: 'water',  // Tentacruel
    74: 'rock',   // Geodude
    75: 'rock',   // Graveler
    76: 'rock',   // Golem
    77: 'fire',   // Ponyta
    78: 'fire',   // Rapidash
    79: 'water',  // Slowpoke
    80: 'water',  // Slowbro
    81: 'electric', // Magnemite
    82: 'electric', // Magneton
    90: 'water',  // Shellder
    91: 'water',  // Cloyster
    92: 'ghost',  // Gastly
    93: 'ghost',  // Haunter
    94: 'ghost',  // Gengar
    95: 'rock',   // Onix
    96: 'psychic', // Drowzee
    97: 'psychic', // Hypno
    98: 'water',  // Krabby
    99: 'water',  // Kingler
    100: 'electric', // Voltorb
    101: 'electric', // Electrode
    102: 'grass',  // Exeggcute
    103: 'grass',  // Exeggutor
    104: 'ground', // Cubone
    105: 'ground', // Marowak
    106: 'fighting', // Hitmonlee
    107: 'fighting', // Hitmonchan
    108: 'normal', // Lickitung
    109: 'poison', // Koffing
    110: 'poison', // Weezing
    111: 'ground', // Rhyhorn
    112: 'ground', // Rhydon
    113: 'normal', // Chansey
    114: 'grass',  // Tangela
    115: 'normal', // Kangaskhan
    116: 'water',  // Horsea
    117: 'water',  // Seadra
    118: 'water',  // Goldeen
    119: 'water',  // Seaking
    120: 'water',  // Staryu
    121: 'water',  // Starmie
    122: 'psychic', // Mr. Mime
    123: 'bug',    // Scyther
    124: 'ice',    // Jynx
    125: 'electric', // Electabuzz
    126: 'fire',   // Magmar
    127: 'bug',    // Pinsir
    128: 'normal', // Tauros
    129: 'water',  // Magikarp
    130: 'water',  // Gyarados
    131: 'water',  // Lapras
    132: 'normal', // Ditto
    133: 'normal', // Eevee
    134: 'water',  // Vaporeon
    135: 'electric', // Jolteon
    136: 'fire',   // Flareon
    137: 'normal', // Porygon
    138: 'rock',   // Omanyte
    139: 'rock',   // Omastar
    140: 'rock',   // Kabuto
    141: 'rock',   // Kabutops
    142: 'rock',   // Aerodactyl
    143: 'normal', // Snorlax
    144: 'ice',    // Articuno
    145: 'electric', // Zapdos
    146: 'fire',   // Moltres
    147: 'dragon', // Dratini
    148: 'dragon', // Dragonair
    149: 'dragon', // Dragonite
    150: 'psychic', // Mewtwo
    151: 'psychic', // Mew
  };
  
  return typeMap[number] || 'normal';
};

