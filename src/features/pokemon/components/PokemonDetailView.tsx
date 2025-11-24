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
} from '@mui/material';
import Image from 'next/image';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { GetPokemonDetailsQuery } from '@/gql/graphql';
import { PRIMARY_COLOR, GRAYSCALE, getPokemonTypeColor } from '@/lib/theme/pokemonTypes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

interface PokemonDetailViewProps {
  id: number;
  initialData?: GetPokemonDetailsQuery | null;
}

// Helper to get a color for the header based on Pokemon number
const getHeaderColor = (number: number): string => {
  // Use a simple hash to get a consistent color per Pokemon
  const colors = [
    '#74CB48', // Grass
    '#F57D31', // Fire
    '#6493EB', // Water
    '#F9CF30', // Electric
    '#A7B723', // Bug
    '#A43E9E', // Poison
    '#75574C', // Dark
    '#705598', // Ghost
    '#AAA67F', // Normal
  ];
  return colors[number % colors.length];
};

export const PokemonDetailView = ({ id, initialData }: PokemonDetailViewProps) => {
  const { pokemon, isLoading, error } = usePokemonDetails(id, initialData);
  const router = useRouter();
  const headerColor = pokemon ? getHeaderColor(pokemon.number) : PRIMARY_COLOR;

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: GRAYSCALE.white }}>
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={48} />
            <Typography
              variant="body2"
              sx={{
                color: GRAYSCALE.medium,
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
      <Box sx={{ minHeight: '100vh', backgroundColor: GRAYSCALE.white }}>
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
    <Box sx={{ minHeight: '100vh', backgroundColor: GRAYSCALE.white }}>
      <Fade in timeout={400}>
        <article itemScope itemType="https://schema.org/Thing">
          {/* Colored Header */}
          <AppBar
            position="static"
            sx={{
              backgroundColor: headerColor,
              boxShadow: 'none',
              borderRadius: 0,
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

          <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 2 }, py: { xs: 2, sm: 3 } }}>
            {/* Pokemon Image */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1',
                maxHeight: { xs: 300, sm: 400 },
                backgroundColor: GRAYSCALE.background,
                borderRadius: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Image
                src={pokemon.imageUrl}
                alt={`${pokemon.name} - Pokemon #${String(pokemon.number).padStart(3, '0')} - Official artwork`}
                fill
                style={{ objectFit: 'contain', padding: '24px' }}
                priority
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </Box>

            {/* Content Card */}
            <Box
              sx={{
                backgroundColor: GRAYSCALE.white,
                borderRadius: 2,
                p: { xs: 2, sm: 3 },
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
              }}
            >
              {/* Abilities Section */}
              {pokemon.abilities && pokemon.abilities.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {pokemon.abilities.map((ability) => (
                      <Chip
                        key={ability.name}
                        label={ability.name}
                        size="medium"
                        sx={{
                          height: 32,
                          fontWeight: 500,
                          fontSize: '12px',
                          lineHeight: '16px',
                          backgroundColor: GRAYSCALE.background,
                          color: GRAYSCALE.dark,
                          border: `1px solid ${GRAYSCALE.light}`,
                          borderRadius: 1,
                          fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                          '&:hover': {
                            backgroundColor: GRAYSCALE.light,
                          },
                        }}
                        title={ability.isHidden ? 'Hidden Ability' : 'Regular Ability'}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* About Section */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '16px',
                    textAlign: 'center',
                    mb: 2,
                    color: GRAYSCALE.dark,
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                  }}
                >
                  About
                </Typography>

                {/* Moves Section */}
                {pokemon.moves && pokemon.moves.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: GRAYSCALE.medium,
                        mb: 1,
                        fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                      }}
                    >
                      Moves ({pokemon.moves.length})
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 0.75,
                        flexWrap: 'wrap',
                        maxHeight: 200,
                        overflowY: 'auto',
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: GRAYSCALE.background,
                      }}
                    >
                      {pokemon.moves.slice(0, 20).map((move, index) => (
                        <Chip
                          key={`${move.name}-${index}`}
                          label={
                            move.levelLearnedAt
                              ? `${move.name} (Lv. ${move.levelLearnedAt})`
                              : move.name
                          }
                          size="small"
                          sx={{
                            height: 24,
                            fontSize: '10px',
                            lineHeight: '14px',
                            backgroundColor: GRAYSCALE.white,
                            color: GRAYSCALE.dark,
                            border: `1px solid ${GRAYSCALE.light}`,
                            borderRadius: 1,
                            fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                            '&:hover': {
                              backgroundColor: GRAYSCALE.background,
                            },
                          }}
                        />
                      ))}
                      {pokemon.moves.length > 20 && (
                        <Chip
                          label={`+${pokemon.moves.length - 20} more`}
                          size="small"
                          sx={{
                            height: 24,
                            fontSize: '10px',
                            backgroundColor: GRAYSCALE.background,
                            color: GRAYSCALE.medium,
                            fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                )}

                {/* Forms Section */}
                {pokemon.forms && pokemon.forms.length > 0 && (
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: GRAYSCALE.medium,
                        mb: 1,
                        fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                      }}
                    >
                      Forms ({pokemon.forms.length})
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {pokemon.forms.map((form, index) => (
                        <Chip
                          key={`${form.name}-${index}`}
                          label={form.name}
                          size="small"
                          sx={{
                            height: 28,
                            fontSize: '12px',
                            backgroundColor: GRAYSCALE.background,
                            color: GRAYSCALE.dark,
                            border: `1px solid ${GRAYSCALE.light}`,
                            borderRadius: 1,
                            fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        </article>
      </Fade>
    </Box>
  );
};
