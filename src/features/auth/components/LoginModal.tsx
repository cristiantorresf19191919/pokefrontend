'use client';

import { useState, FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import { useLogin } from '../hooks/useLogin';
import { PRIMARY_COLOR, GRAYSCALE } from '@/lib/theme/pokemonTypes';
import Image from 'next/image';

interface LoginModalProps {
  open: boolean;
  onSuccess?: () => void;
}

export const LoginModal = ({ open, onSuccess }: LoginModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading, error: loginError } = useLogin();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const success = await login(username, password);
      
      if (success) {
        setUsername('');
        setPassword('');
        setError(null);
        onSuccess?.();
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const displayError = error || (loginError?.message ?? null);

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <DialogContent sx={{ p: 4, pb: 3 }}>
        <Fade in={open} timeout={400}>
          <Box>
            {/* Pokeball Logo */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 64,
                  height: 64,
                }}
              >
                <Image
                  src="/pokeball.svg"
                  alt="Pokeball"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            </Box>

            {/* Title */}
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '32px',
                textAlign: 'center',
                mb: 1,
                color: GRAYSCALE.dark,
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              }}
            >
              Welcome to Pokédex
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                mb: 3,
                color: GRAYSCALE.medium,
                fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              }}
            >
              Please sign in to continue
            </Typography>

            {/* Error Alert */}
            {displayError && (
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                }}
              >
                {displayError}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(null);
                }}
                margin="normal"
                required
                disabled={isLoading}
                autoComplete="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: GRAYSCALE.medium }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                margin="normal"
                required
                disabled={isLoading}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: GRAYSCALE.medium }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: GRAYSCALE.medium }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading || !username.trim() || !password.trim()}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: PRIMARY_COLOR,
                  fontWeight: 700,
                  fontSize: '16px',
                  textTransform: 'none',
                  fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
                  '&:hover': {
                    backgroundColor: '#B9081F',
                  },
                  '&:disabled': {
                    backgroundColor: GRAYSCALE.light,
                    color: GRAYSCALE.medium,
                  },
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Box>
        </Fade>
      </DialogContent>
    </Dialog>
  );
};

