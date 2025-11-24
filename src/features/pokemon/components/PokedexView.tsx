'use client';

import { Grid, Box, Select, MenuItem, Button, CircularProgress, Typography } from '@mui/material';
import { usePokemonList } from '../hooks/usePokemonList';
import { usePokemonFilterStore } from '../stores/usePokemonFilterStore';
import { PokemonCard } from './PokemonCard';
import { GetPokemonsQuery } from '@/gql/graphql';

interface PokedexViewProps {
  initialData?: GetPokemonsQuery | null;
}

export const PokedexView = ({ initialData }: PokedexViewProps) => {
  // Access Logic Layers
  const { pokemons, loadMore, isLoading, hasNextPage, error } = usePokemonList(initialData);
  const { sortBy, setSortBy } = usePokemonFilterStore();

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">
          Error loading Pokemon: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Control Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'number')}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="number">Sort by ID</MenuItem>
          <MenuItem value="name">Sort by Name</MenuItem>
        </Select>
      </Box>

      {/* Grid Layout */}
      {pokemons.length === 0 && !isLoading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography>No Pokemon found</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {pokemons.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Infinite Scroll / Load More Trigger */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          hasNextPage && (
            <Button variant="outlined" onClick={loadMore}>
              Load More
            </Button>
          )
        )}
      </Box>
    </Box>
  );
};


