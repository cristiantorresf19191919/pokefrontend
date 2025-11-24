'use client';

import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Paper,
  Grid,
  Container,
  Divider,
  alpha,
  Fade,
} from '@mui/material';
import Image from 'next/image';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { GetPokemonDetailsQuery } from '@/gql/graphql';

interface PokemonDetailViewProps {
  id: number;
  initialData?: GetPokemonDetailsQuery | null;
}

export const PokemonDetailView = ({ id, initialData }: PokemonDetailViewProps) => {
  const { pokemon, isLoading, error } = usePokemonDetails(id, initialData);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={48} />
          <Typography variant="body2" color="text.secondary">
            Loading Pokémon details...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error || !pokemon) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            textAlign: 'center',
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(145deg, rgba(211, 47, 47, 0.1) 0%, rgba(198, 40, 40, 0.05) 100%)',
            border: '1px solid rgba(211, 47, 47, 0.3)',
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            {error ? 'Error loading Pokémon' : 'Pokémon not found'}
          </Typography>
          {error && (
            <Typography variant="body2" color="text.secondary">
              {error.message}
            </Typography>
          )}
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <Fade in timeout={400}>
        <article itemScope itemType="https://schema.org/Thing">
          <Paper
            sx={{
              p: { xs: 3, md: 5 },
              background: 'linear-gradient(145deg, #1a1a2e 0%, #151520 100%)',
              border: '1px solid rgba(100, 181, 246, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            <Grid container spacing={{ xs: 3, md: 5 }}>
            {/* Image Section */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1',
                  maxHeight: 500,
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: `radial-gradient(circle at 50% 50%, ${alpha('#64b5f6', 0.15)} 0%, transparent 70%)`,
                  border: `1px solid ${alpha('#64b5f6', 0.2)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3,
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
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={7}>
            <Box>
              <header>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h3"
                    component="h1"
                    itemProp="name"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      textTransform: 'capitalize',
                      background: 'linear-gradient(135deg, #64b5f6 0%, #9be7ff 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {pokemon.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      background: alpha('#64b5f6', 0.1),
                      border: `1px solid ${alpha('#64b5f6', 0.2)}`,
                    }}
                    itemProp="identifier"
                  >
                    #{String(pokemon.number).padStart(3, '0')}
                  </Typography>
                </Box>
              </header>

                <Divider sx={{ my: 3, borderColor: alpha('#64b5f6', 0.1) }} />

                {/* Abilities */}
                {pokemon.abilities && pokemon.abilities.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: '#9be7ff',
                      }}
                    >
                      Abilities
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                      {pokemon.abilities.map((ability) => (
                        <Chip
                          key={ability.name}
                          label={ability.name}
                          size="medium"
                          sx={{
                            height: 36,
                            fontWeight: 500,
                            background: ability.isHidden
                              ? alpha('#64b5f6', 0.25)
                              : alpha('#9be7ff', 0.15),
                            color: ability.isHidden ? '#9be7ff' : '#b0b0c0',
                            border: `1px solid ${ability.isHidden ? alpha('#64b5f6', 0.5) : alpha('#9be7ff', 0.3)}`,
                            '&:hover': {
                              background: ability.isHidden
                                ? alpha('#64b5f6', 0.35)
                                : alpha('#9be7ff', 0.25),
                            },
                          }}
                          title={ability.isHidden ? 'Hidden Ability' : 'Regular Ability'}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Moves */}
                {pokemon.moves && pokemon.moves.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: '#9be7ff',
                      }}
                    >
                      Moves ({pokemon.moves.length})
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        flexWrap: 'wrap',
                        maxHeight: 300,
                        overflowY: 'auto',
                        p: 1,
                        borderRadius: 2,
                        background: alpha('#64b5f6', 0.03),
                        border: `1px solid ${alpha('#64b5f6', 0.1)}`,
                      }}
                    >
                      {pokemon.moves.map((move, index) => (
                        <Chip
                          key={`${move.name}-${index}`}
                          label={
                            move.levelLearnedAt
                              ? `${move.name} (Lv. ${move.levelLearnedAt})`
                              : move.name
                          }
                          size="small"
                          sx={{
                            height: 28,
                            fontSize: '0.75rem',
                            background: alpha('#64b5f6', 0.1),
                            color: '#b0b0c0',
                            border: `1px solid ${alpha('#64b5f6', 0.2)}`,
                            '&:hover': {
                              background: alpha('#64b5f6', 0.2),
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Forms */}
                {pokemon.forms && pokemon.forms.length > 0 && (
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: '#9be7ff',
                      }}
                    >
                      Forms ({pokemon.forms.length})
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                      {pokemon.forms.map((form, index) => (
                        <Chip
                          key={`${form.name}-${index}`}
                          label={form.name}
                          size="medium"
                          sx={{
                            height: 36,
                            fontWeight: 500,
                            background: alpha('#42a5f5', 0.15),
                            color: '#9be7ff',
                            border: `1px solid ${alpha('#42a5f5', 0.3)}`,
                            '&:hover': {
                              background: alpha('#42a5f5', 0.25),
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
        </article>
      </Fade>
    </Container>
  );
};


