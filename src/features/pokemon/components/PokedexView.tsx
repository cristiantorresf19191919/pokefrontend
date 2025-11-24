'use client';

import { Grid, Box, Select, MenuItem, Button, CircularProgress, Typography, Container, Fade } from '@mui/material';
import { usePokemonList } from '../hooks/usePokemonList';
import { usePokemonFilterStore } from '../stores/usePokemonFilterStore';
import { PokemonCard } from './PokemonCard';
import { PokemonSearchAutocomplete } from './PokemonSearchAutocomplete';
import { GetPokemonsQuery } from '@/gql/graphql';

interface PokedexViewProps {
  initialData?: GetPokemonsQuery | null;
}

export const PokedexView = ({ initialData }: PokedexViewProps) => {
  // Access Logic Layers
  const { pokemons, loadMore, isLoading, hasNextPage, error, totalCount } = usePokemonList(initialData);
  const { sortBy, setSortBy } = usePokemonFilterStore();

  if (error) {
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
            Error loading Pokemon
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {error.message}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
      {/* Header Section */}
      <header>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 3, md: 4 },
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #64b5f6 0%, #9be7ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5,
              }}
            >
              Pokédex
            </Typography>
            {totalCount !== undefined && (
              <Typography variant="body2" color="text.secondary">
                {totalCount} Pokémon discovered
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <PokemonSearchAutocomplete />
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'number')}
              size="small"
              sx={{
                minWidth: 180,
                '& .MuiSelect-select': {
                  py: 1.5,
                },
              }}
            >
              <MenuItem value="number">Sort by ID</MenuItem>
              <MenuItem value="name">Sort by Name</MenuItem>
            </Select>
          </Box>
        </Box>
      </header>

      {/* Grid Layout */}
      {pokemons.length === 0 && !isLoading ? (
        <Fade in>
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 3,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Pokémon found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </Box>
        </Fade>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
          {pokemons.map((pokemon, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
              <Fade in timeout={300 + index * 50}>
                <Box>
                  <PokemonCard pokemon={pokemon} />
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Infinite Scroll / Load More Trigger */}
      {pokemons.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: { xs: 4, md: 6 },
            mb: 2,
          }}
        >
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={24} />
              <Typography variant="body2" color="text.secondary">
                Loading more Pokémon...
              </Typography>
            </Box>
          ) : (
            hasNextPage && (
              <Button
                variant="outlined"
                onClick={loadMore}
                size="large"
                sx={{
                  minWidth: 160,
                  px: 4,
                }}
              >
                Load More
              </Button>
            )
          )}
        </Box>
      )}
    </Container>
  );
};


