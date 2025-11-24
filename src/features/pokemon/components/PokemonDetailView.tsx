'use client';

import { Box, Typography, Chip, CircularProgress, Paper, Grid } from '@mui/material';
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
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !pokemon) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">
          {error ? `Error loading Pokemon: ${error.message}` : 'Pokemon not found'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 400,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Image
                src={pokemon.imageUrl}
                alt={pokemon.name}
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              {pokemon.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              #{pokemon.number}
            </Typography>

            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Abilities
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {pokemon.abilities.map((ability) => (
                  <Chip
                    key={ability.name}
                    label={ability.name}
                    color={ability.isHidden ? "primary" : "secondary"}
                    variant="outlined"
                    size="medium"
                    title={ability.isHidden ? "Hidden Ability" : "Regular Ability"}
                  />
                ))}
              </Box>
            </Box>

            {pokemon.moves && pokemon.moves.length > 0 && (
              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Moves ({pokemon.moves.length})
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', maxHeight: 200, overflowY: 'auto' }}>
                  {pokemon.moves.map((move, index) => (
                    <Chip
                      key={`${move.name}-${index}`}
                      label={move.levelLearnedAt ? `${move.name} (Lv. ${move.levelLearnedAt})` : move.name}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}

            {pokemon.forms && pokemon.forms.length > 0 && (
              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Forms ({pokemon.forms.length})
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {pokemon.forms.map((form, index) => (
                    <Chip
                      key={`${form.name}-${index}`}
                      label={form.name}
                      size="small"
                      color="info"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};


