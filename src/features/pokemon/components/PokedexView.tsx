'use client';

import { useState } from 'react';
import { Box, Button, CircularProgress, Typography, Container, Fade, AppBar, Toolbar } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { usePokemonList } from '../hooks/usePokemonList';
import { usePokemonFilterStore } from '../stores/usePokemonFilterStore';
import { PokemonCard } from './PokemonCard';
import { PokemonSearchAutocomplete } from './PokemonSearchAutocomplete';
import { SortDialog } from './SortDialog';
import { GetPokemonsQuery } from '@/gql/graphql';
import { PRIMARY_COLOR, GRAYSCALE } from '@/lib/theme/pokemonTypes';

interface PokedexViewProps {
  initialData?: GetPokemonsQuery | null;
}

export const PokedexView = ({ initialData }: PokedexViewProps) => {
  // Access Logic Layers
  const { pokemons, loadMore, isLoading, hasNextPage, error } = usePokemonList(initialData);
  const { sortBy } = usePokemonFilterStore();
  const [sortDialogOpen, setSortDialogOpen] = useState(false);

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
    <Box sx={{ minHeight: '100vh', backgroundColor: GRAYSCALE.white }}>
      {/* Red Header - Mobile First */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: PRIMARY_COLOR,
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            {/* Pokéball Icon */}
            <Box
              sx={{
                width: 24,
                height: 24,
                position: 'relative',
                display: { xs: 'block', sm: 'block' },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: GRAYSCALE.white,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: PRIMARY_COLOR,
                    transform: 'translateY(-50%)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: PRIMARY_COLOR,
                    border: `2px solid ${GRAYSCALE.white}`,
                  },
                }}
              />
            </Box>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '20px', sm: '24px' },
                lineHeight: { xs: '28px', sm: '32px' },
                color: GRAYSCALE.white,
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              }}
            >
              Pokédex
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 }, px: { xs: 1, sm: 2 } }}>
        {/* Search and Sort Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 3,
            alignItems: { xs: 'stretch', sm: 'center' },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <PokemonSearchAutocomplete />
          </Box>
          <Button
            variant="outlined"
            onClick={() => setSortDialogOpen(true)}
            startIcon={<SortIcon />}
            sx={{
              minWidth: { xs: '100%', sm: 140 },
              backgroundColor: GRAYSCALE.white,
              borderColor: GRAYSCALE.light,
              color: GRAYSCALE.dark,
              textTransform: 'none',
              fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              '&:hover': {
                borderColor: PRIMARY_COLOR,
                backgroundColor: GRAYSCALE.white,
              },
            }}
          >
            Sort: {sortBy === 'number' ? 'Number' : 'Name'}
          </Button>
          <SortDialog
            open={sortDialogOpen}
            onClose={() => setSortDialogOpen(false)}
          />
        </Box>

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
              <Typography
                variant="h6"
                sx={{
                  color: GRAYSCALE.medium,
                  fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                }}
                gutterBottom
              >
                No Pokémon found
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: GRAYSCALE.medium,
                  fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                }}
              >
                Try adjusting your search or filters
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)',
              },
              gap: { xs: 1.5, sm: 2, md: 2.5 },
            }}
          >
            {pokemons.map((pokemon: { id: number; name: string; number: number; imageUrl: string; abilities: Array<{ name: string; isHidden: boolean }> }, index: number) => (
              <Fade in timeout={300 + index * 50} key={pokemon.id}>
                <Box>
                  <PokemonCard pokemon={pokemon} />
                </Box>
              </Fade>
            ))}
          </Box>
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
                <Typography
                  variant="body2"
                  sx={{
                    color: GRAYSCALE.medium,
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                  }}
                >
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
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                  }}
                >
                  Load More
                </Button>
              )
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};


