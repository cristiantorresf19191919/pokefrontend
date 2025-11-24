'use client';

import { Box, keyframes, Typography } from '@mui/material';

const jump = keyframes`
  0%, 80%, 100% {
    transform: scale(0) translateY(0);
    opacity: 0.4;
  }
  40% {
    transform: scale(1.3) translateY(-12px);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    backdropFilter: blur(0px);
  }
  to {
    opacity: 1;
    backdropFilter: blur(12px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    boxShadow: 0 0 20px rgba(100, 181, 246, 0.4), 0 0 40px rgba(100, 181, 246, 0.2);
  }
  50% {
    boxShadow: 0 0 30px rgba(100, 181, 246, 0.6), 0 0 60px rgba(100, 181, 246, 0.3);
  }
`;

interface LoadingModalProps {
  open: boolean;
}

export const LoadingModal = ({ open }: LoadingModalProps) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 10, 15, 0.92)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'all',
        animation: `${fadeIn} 0.3s ease-in`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            alignItems: 'center',
          }}
        >
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #64b5f6 0%, #9be7ff 100%)',
                boxShadow: '0 0 20px rgba(100, 181, 246, 0.5), 0 0 40px rgba(100, 181, 246, 0.2)',
                animation: `${jump} 1.4s infinite ease-in-out, ${pulse} 2s infinite ease-in-out`,
                animationDelay: `${index * 0.16}s, 0s`,
              }}
            />
          ))}
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(155, 231, 255, 0.8)',
            fontWeight: 500,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
          }}
        >
          Loading...
        </Typography>
      </Box>
    </Box>
  );
};
