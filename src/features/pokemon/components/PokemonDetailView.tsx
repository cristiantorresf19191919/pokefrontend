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
            
            {pokemon.description && (
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                {pokemon.description}
              </Typography>
            )}

            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Types
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {pokemon.types.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    color="primary"
                    variant="outlined"
                    size="medium"
                  />
                ))}
              </Box>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {pokemon.height && (
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Height
                  </Typography>
                  <Typography variant="h6">
                    {pokemon.height} m
                  </Typography>
                </Grid>
              )}
              {pokemon.weight && (
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Weight
                  </Typography>
                  <Typography variant="h6">
                    {pokemon.weight} kg
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};


