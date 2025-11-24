'use client';

import {
  Autocomplete,
  TextField,
  Box,
  Paper,
  Typography,
  CircularProgress,
  alpha,
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
import ClearIcon from '@mui/icons-material/Clear';

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
            color: '#9be7ff',
            background: alpha('#64b5f6', 0.2),
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
              backgroundColor: alpha('#64b5f6', 0.08),
              borderRadius: 2.5,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              '& fieldset': {
                borderColor: alpha('#64b5f6', 0.3),
                borderWidth: 1.5,
                transition: 'all 0.3s ease',
              },
              '&:hover fieldset': {
                borderColor: alpha('#64b5f6', 0.5),
                boxShadow: `0 0 0 2px ${alpha('#64b5f6', 0.1)}`,
              },
              '&.Mui-focused fieldset': {
                borderColor: '#64b5f6',
                borderWidth: 2,
                boxShadow: `0 0 0 4px ${alpha('#64b5f6', 0.15)}, 0 4px 12px ${alpha('#64b5f6', 0.2)}`,
              },
              '& input': {
                color: '#e8e8f0',
                fontWeight: 500,
                '&::placeholder': {
                  color: alpha('#b0b0c0', 0.6),
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
                  color: alpha('#64b5f6', 0.7),
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
                      color: '#64b5f6',
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
                      color: alpha('#b0b0c0', 0.7),
                      mr: 0.5,
                      p: 0.5,
                      borderRadius: 1,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#e8e8f0',
                        background: alpha('#64b5f6', 0.1),
                      },
                    }}
                  >
                    <ClearIcon fontSize="small" />
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
                backgroundColor: alpha('#64b5f6', 0.1),
              },
              py: 1.5,
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: alpha('#64b5f6', 0.1),
                  border: `1px solid ${alpha('#64b5f6', 0.2)}`,
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
                    fontWeight: 600,
                    color: '#e8e8f0',
                    textTransform: 'capitalize',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
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
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      background: alpha('#64b5f6', 0.15),
                      color: '#9be7ff',
                      border: `1px solid ${alpha('#64b5f6', 0.3)}`,
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
              background: 'linear-gradient(145deg, #1a1a2e 0%, #151520 100%)',
              border: `1px solid ${alpha('#64b5f6', 0.25)}`,
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(100, 181, 246, 0.1)',
              mt: 1.5,
              maxHeight: 450,
              overflow: 'auto',
              backdropFilter: 'blur(20px)',
              '& .MuiAutocomplete-listbox': {
                p: 0.5,
              },
              '& .MuiAutocomplete-noOptions': {
                color: '#b0b0c0',
                py: 4,
              },
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: alpha('#64b5f6', 0.05),
              },
              '&::-webkit-scrollbar-thumb': {
                background: alpha('#64b5f6', 0.3),
                borderRadius: '4px',
                '&:hover': {
                  background: alpha('#64b5f6', 0.5),
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
                color: alpha('#b0b0c0', 0.8),
                fontWeight: 500,
              }}
            >
              No Pokemon found for "{searchQuery}"
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: alpha('#b0b0c0', 0.6),
                mt: 1,
                display: 'block',
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
                color: alpha('#64b5f6', 0.3),
                mb: 1,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: alpha('#b0b0c0', 0.8),
                fontWeight: 500,
              }}
            >
              Type at least 2 characters to search
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: alpha('#b0b0c0', 0.6),
                mt: 0.5,
                display: 'block',
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
          background: alpha('#64b5f6', 0.2),
          color: '#9be7ff',
          border: `1px solid ${alpha('#64b5f6', 0.4)}`,
        },
      }}
      loadingText={
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <CircularProgress size={20} sx={{ color: '#64b5f6', mb: 1 }} />
          <Typography variant="caption" sx={{ color: alpha('#b0b0c0', 0.8) }}>
            Searching...
          </Typography>
        </Box>
      }
    />
  );
};

