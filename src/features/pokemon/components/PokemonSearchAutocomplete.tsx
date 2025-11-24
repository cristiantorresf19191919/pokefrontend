'use client';

import {
  Autocomplete,
  TextField,
  Box,
  Paper,
  Typography,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Fade,
  Chip,
} from '@mui/material';
import Image from 'next/image';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { PRIMARY_COLOR, GRAYSCALE } from '@/lib/theme/pokemonTypes';

export const PokemonSearchAutocomplete = () => {
  const { searchQuery, setSearchQuery, results, isLoading, hasResults, clearSearch } = usePokemonSearch();
  const router = useRouter();

  const options = useMemo(() => {
    return results.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.imageUrl,
      label: pokemon.name,
    }));
  }, [results]);

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query || query.length < 2) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <Box
          key={index}
          component="span"
          sx={{
            fontWeight: 700,
            color: PRIMARY_COLOR,
            backgroundColor: 'rgba(220, 10, 45, 0.1)',
            borderRadius: 0.5,
            px: 0.5,
          }}
        >
          {part}
        </Box>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const handleSelect = (pokemon: { id: number; name: string } | null) => {
    if (pokemon) {
      router.push(`/pokemon/${pokemon.id}`);
      setSearchQuery('');
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        return option.name;
      }}
      inputValue={searchQuery}
      onInputChange={(_, newValue) => {
        setSearchQuery(newValue);
      }}
      onChange={(_, newValue) => {
        if (newValue && typeof newValue !== 'string') {
          handleSelect(newValue);
        }
      }}
      loading={isLoading}
      filterOptions={(x) => x} // Disable client-side filtering, we use server-side
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Pokemon by name..."
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: GRAYSCALE.white,
              borderRadius: 2,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '& fieldset': {
                borderColor: GRAYSCALE.light,
                borderWidth: 1,
                transition: 'all 0.2s ease',
              },
              '&:hover fieldset': {
                borderColor: GRAYSCALE.medium,
              },
              '&.Mui-focused fieldset': {
                borderColor: PRIMARY_COLOR,
                borderWidth: 2,
              },
              '& input': {
                color: GRAYSCALE.dark,
                fontWeight: 400,
                fontSize: '14px',
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                '&::placeholder': {
                  color: GRAYSCALE.medium,
                  opacity: 1,
                  fontWeight: 400,
                },
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: 1,
                  color: GRAYSCALE.medium,
                }}
              >
                <SearchIcon fontSize="small" />
              </Box>
            ),
            endAdornment: (
              <>
                {isLoading && (
                  <CircularProgress
                    size={18}
                    sx={{
                      color: PRIMARY_COLOR,
                      mr: 1,
                    }}
                  />
                )}
                {searchQuery && !isLoading && (
                  <Box
                    component="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSearch();
                    }}
                    sx={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: GRAYSCALE.medium,
                      mr: 0.5,
                      p: 0.5,
                      borderRadius: 1,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: GRAYSCALE.dark,
                        backgroundColor: GRAYSCALE.background,
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Box>
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        if (typeof option === 'string') return null;
        return (
          <ListItem
            {...props}
            component="div"
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: GRAYSCALE.background,
              },
              py: 1.5,
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: GRAYSCALE.background,
                  border: `1px solid ${GRAYSCALE.light}`,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Image
                    src={option.imageUrl}
                    alt={option.name}
                    fill
                    style={{ objectFit: 'contain', padding: '4px' }}
                  />
                </Box>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontWeight: 500,
                    color: GRAYSCALE.dark,
                    textTransform: 'capitalize',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '14px',
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                  }}
                >
                  {highlightMatch(option.name, searchQuery)}
                </Typography>
              }
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Chip
                    label={`#${String(option.id).padStart(3, '0')}`}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '10px',
                      fontWeight: 500,
                      background: GRAYSCALE.background,
                      color: GRAYSCALE.medium,
                      border: `1px solid ${GRAYSCALE.light}`,
                      fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                    }}
                  />
                </Box>
              }
            />
          </ListItem>
        );
      }}
      PaperComponent={({ children, ...other }) => (
        <Fade in timeout={200}>
          <Paper
            {...other}
            sx={{
              backgroundColor: GRAYSCALE.white,
              border: `1px solid ${GRAYSCALE.light}`,
              boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
              mt: 1,
              maxHeight: 400,
              overflow: 'auto',
              '& .MuiAutocomplete-listbox': {
                p: 0.5,
              },
              '& .MuiAutocomplete-noOptions': {
                color: GRAYSCALE.medium,
                py: 4,
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              },
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: GRAYSCALE.background,
              },
              '&::-webkit-scrollbar-thumb': {
                background: GRAYSCALE.medium,
                borderRadius: '4px',
                '&:hover': {
                  background: GRAYSCALE.dark,
                },
              },
            }}
          >
            {children}
          </Paper>
        </Fade>
      )}
      noOptionsText={
        searchQuery.length >= 2 ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: GRAYSCALE.medium,
                fontWeight: 500,
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              }}
            >
              No Pokemon found for "{searchQuery}"
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: GRAYSCALE.medium,
                mt: 1,
                display: 'block',
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              }}
            >
              Try a different search term
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <SearchIcon
              sx={{
                fontSize: 48,
                color: GRAYSCALE.light,
                mb: 1,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: GRAYSCALE.medium,
                fontWeight: 500,
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              }}
            >
              Type at least 2 characters to search
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: GRAYSCALE.medium,
                mt: 0.5,
                display: 'block',
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              }}
            >
              Search by Pokemon name
            </Typography>
          </Box>
        )
      }
      sx={{
        minWidth: { xs: '100%', sm: 320, md: 400 },
        maxWidth: { xs: '100%', sm: 400, md: 500 },
        '& .MuiAutocomplete-inputRoot': {
          padding: '6px 12px',
        },
        '& .MuiAutocomplete-tag': {
          background: 'rgba(220, 10, 45, 0.1)',
          color: PRIMARY_COLOR,
          border: `1px solid ${PRIMARY_COLOR}`,
        },
      }}
      loadingText={
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <CircularProgress size={20} sx={{ color: PRIMARY_COLOR, mb: 1 }} />
          <Typography
            variant="caption"
            sx={{
              color: GRAYSCALE.medium,
              fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
            }}
          >
            Searching...
          </Typography>
        </Box>
      }
    />
  );
};

