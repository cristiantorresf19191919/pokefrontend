'use client';

import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Container,
  Fade,
  AppBar,
  Toolbar,
  IconButton,
  LinearProgress,
  Grid,
} from '@mui/material';
import Image from 'next/image';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { GetPokemonDetailsQuery } from '@/gql/graphql';
import { PRIMARY_COLOR, GRAYSCALE, POKEMON_TYPE_COLORS, getPokemonTypeByNumber, getPokemonTypeColor } from '@/lib/theme/pokemonTypes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import { useRouter } from 'next/navigation';

interface PokemonDetailViewProps {
  id: number;
  initialData?: GetPokemonDetailsQuery | null;
}

// Helper to get a type color for the header based on Pokemon number
const getHeaderColor = (number: number): string => {
  const type = getPokemonTypeByNumber(number);
  return getPokemonTypeColor(type);
};

// Helper to get a type name for display
const getTypeName = (number: number): string => {
  return getPokemonTypeByNumber(number);
};

export const PokemonDetailView = ({ id, initialData }: PokemonDetailViewProps) => {
  const { pokemon, isLoading, error } = usePokemonDetails(id, initialData);
  const router = useRouter();
  const headerColor = pokemon ? getHeaderColor(pokemon.number) : PRIMARY_COLOR;
  const typeName = pokemon ? getTypeName(pokemon.number) : 'normal';

  const defaultHeaderColor = PRIMARY_COLOR;
  const displayHeaderColor = pokemon ? getHeaderColor(pokemon.number) : defaultHeaderColor;

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: defaultHeaderColor }}>
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={48} sx={{ color: GRAYSCALE.white }} />
            <Typography
              variant="body2"
              sx={{
                color: GRAYSCALE.white,
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              }}
            >
              Loading Pokémon details...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !pokemon) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: defaultHeaderColor }}>
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Box
            sx={{
              textAlign: 'center',
              p: 4,
              borderRadius: 2,
              backgroundColor: GRAYSCALE.white,
              border: `1px solid ${GRAYSCALE.light}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: PRIMARY_COLOR,
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              }}
              gutterBottom
            >
              {error ? 'Error loading Pokémon' : 'Pokémon not found'}
            </Typography>
            {error && (
              <Typography
                variant="body2"
                sx={{
                  color: GRAYSCALE.medium,
                  fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                }}
              >
                {error.message}
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: headerColor }}>
      <Fade in timeout={400}>
        <article itemScope itemType="https://schema.org/Thing">
          {/* Colored Header with Pokemon Image */}
          <Box
            sx={{
              backgroundColor: headerColor,
              position: 'relative',
              minHeight: { xs: 280, sm: 320 },
              pb: { xs: 8, sm: 10 },
            }}
          >
            {/* Pokeball pattern in background */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                backgroundImage: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 50%, transparent 50%)`,
                backgroundSize: '200px 200px',
              }}
            />

            <AppBar
              position="static"
              sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }}
            >
              <Toolbar
                sx={{
                  px: { xs: 2, sm: 3 },
                  py: 2,
                  minHeight: { xs: '64px', sm: '72px' },
                }}
              >
                <IconButton
                  edge="start"
                  onClick={() => router.back()}
                  sx={{
                    color: GRAYSCALE.white,
                    mr: 2,
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography
                  variant="h1"
                  component="h1"
                  itemProp="name"
                  sx={{
                    flex: 1,
                    fontWeight: 700,
                    fontSize: { xs: '20px', sm: '24px' },
                    lineHeight: { xs: '28px', sm: '32px' },
                    color: GRAYSCALE.white,
                    textTransform: 'capitalize',
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                  }}
                >
                  {pokemon.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '16px', sm: '20px' },
                    lineHeight: { xs: '24px', sm: '28px' },
                    color: GRAYSCALE.white,
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                  }}
                  itemProp="identifier"
                >
                  #{String(pokemon.number).padStart(3, '0')}
                </Typography>
              </Toolbar>
            </AppBar>

            {/* Pokemon Image - Overlapping the white card */}
            <Box
              sx={{
                position: 'relative',
                width: { xs: 200, sm: 250 },
                height: { xs: 200, sm: 250 },
                mx: 'auto',
                mt: { xs: 2, sm: 3 },
                zIndex: 1,
              }}
            >
              <Image
                src={pokemon.imageUrl}
                alt={`${pokemon.name} - Pokemon #${String(pokemon.number).padStart(3, '0')} - Official artwork`}
                fill
                style={{ objectFit: 'contain' }}
                priority
                sizes="(max-width: 768px) 200px, 250px"
              />
            </Box>
          </Box>

          <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, mt: { xs: -6, sm: -8 } }}>
            {/* White Content Card */}
            <Box
              sx={{
                backgroundColor: GRAYSCALE.white,
                borderRadius: '16px 16px 0 0',
                p: { xs: 3, sm: 4 },
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {/* Type Badge */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Chip
                  label={typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                  sx={{
                    height: 32,
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '16px',
                    backgroundColor: headerColor,
                    color: GRAYSCALE.white,
                    borderRadius: '8px',
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                    px: 2,
                  }}
                />
              </Box>

              {/* About Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '16px',
                    textAlign: 'center',
                    mb: 3,
                    color: GRAYSCALE.dark,
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60%',
                      height: '1px',
                      borderBottom: `1px dashed ${headerColor}`,
                      opacity: 0.3,
                    },
                  }}
                >
                  About
                </Typography>

                {/* Weight, Height, Abilities Row */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {/* Weight */}
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <ScaleIcon
                        sx={{
                          fontSize: 20,
                          color: GRAYSCALE.dark,
                          mb: 0.5,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '16px',
                          color: GRAYSCALE.dark,
                          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                        }}
                      >
                        —
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 400,
                          fontSize: '10px',
                          lineHeight: '12px',
                          color: GRAYSCALE.medium,
                          mt: 0.5,
                          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                        }}
                      >
                        Weight
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Height */}
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <HeightIcon
                        sx={{
                          fontSize: 20,
                          color: GRAYSCALE.dark,
                          mb: 0.5,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '16px',
                          color: GRAYSCALE.dark,
                          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                        }}
                      >
                        —
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 400,
                          fontSize: '10px',
                          lineHeight: '12px',
                          color: GRAYSCALE.medium,
                          mt: 0.5,
                          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                        }}
                      >
                        Height
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Abilities */}
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ minHeight: 20, mb: 0.5 }}>
                        {pokemon.abilities && pokemon.abilities.length > 0 && (
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 400,
                              fontSize: '12px',
                              lineHeight: '16px',
                              color: GRAYSCALE.dark,
                              fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                            }}
                          >
                            {pokemon.abilities[0].name}
                          </Typography>
                        )}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 400,
                          fontSize: '10px',
                          lineHeight: '12px',
                          color: GRAYSCALE.medium,
                          mt: 0.5,
                          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                        }}
                      >
                        Moves
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Description - Not available in schema, showing placeholder */}
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: GRAYSCALE.dark,
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                    textAlign: 'left',
                    mb: 3,
                  }}
                >
                  {pokemon.abilities && pokemon.abilities.length > 0
                    ? `${pokemon.name} has ${pokemon.abilities.length} ability${pokemon.abilities.length > 1 ? 'ies' : ''}: ${pokemon.abilities.map(a => a.name).join(', ')}.`
                    : `Information about ${pokemon.name}.`}
                </Typography>
              </Box>

              {/* Base Stats Section */}
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '16px',
                    textAlign: 'center',
                    mb: 3,
                    color: GRAYSCALE.dark,
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60%',
                      height: '1px',
                      borderBottom: `1px dashed ${headerColor}`,
                      opacity: 0.3,
                    },
                  }}
                >
                  Base Stats
                </Typography>

                {/* Stats List - Since we don't have stats, showing placeholder */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'].map((statName) => (
                    <Box key={statName} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          fontSize: '12px',
                          lineHeight: '16px',
                          color: headerColor,
                          minWidth: 50,
                          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                        }}
                      >
                        {statName}
                      </Typography>
                      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '16px',
                            color: GRAYSCALE.dark,
                            minWidth: 40,
                            fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                          }}
                        >
                          —
                        </Typography>
                        <Box sx={{ flex: 1, position: 'relative' }}>
                          <LinearProgress
                            variant="determinate"
                            value={0}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: GRAYSCALE.background,
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: headerColor,
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Container>
        </article>
      </Fade>
    </Box>
  );
};
