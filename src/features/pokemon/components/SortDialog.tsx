'use client';

import {
  Dialog,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { PRIMARY_COLOR, GRAYSCALE } from '@/lib/theme/pokemonTypes';
import { usePokemonFilterStore } from '../stores/usePokemonFilterStore';

interface SortDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SortDialog = ({ open, onClose }: SortDialogProps) => {
  const { sortBy, setSortBy } = usePokemonFilterStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortBy = event.target.value as 'name' | 'number';
    setSortBy(newSortBy);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          maxWidth: '280px',
          width: '100%',
        },
      }}
    >
      {/* Red Header */}
      <Box
        sx={{
          backgroundColor: PRIMARY_COLOR,
          py: 2,
          px: 3,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '20px',
            color: GRAYSCALE.white,
            fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
          }}
        >
          Sort by:
        </Typography>
      </Box>

      {/* White Body with Radio Buttons */}
      <Box
        sx={{
          backgroundColor: GRAYSCALE.white,
          py: 2,
          px: 3,
        }}
      >
        <RadioGroup
          value={sortBy}
          onChange={handleChange}
          sx={{
            gap: 1,
          }}
        >
          <FormControlLabel
            value="number"
            control={
              <Radio
                sx={{
                  color: PRIMARY_COLOR,
                  '&.Mui-checked': {
                    color: PRIMARY_COLOR,
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 20,
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: GRAYSCALE.dark,
                  fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                }}
              >
                Number
              </Typography>
            }
            sx={{
              margin: 0,
              '& .MuiFormControlLabel-label': {
                marginLeft: 1.5,
              },
            }}
          />
          <FormControlLabel
            value="name"
            control={
              <Radio
                sx={{
                  color: PRIMARY_COLOR,
                  '&.Mui-checked': {
                    color: PRIMARY_COLOR,
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 20,
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: GRAYSCALE.dark,
                  fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                }}
              >
                Name
              </Typography>
            }
            sx={{
              margin: 0,
              '& .MuiFormControlLabel-label': {
                marginLeft: 1.5,
              },
            }}
          />
        </RadioGroup>
      </Box>
    </Dialog>
  );
};

