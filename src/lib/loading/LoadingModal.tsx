'use client';

import { Box, keyframes } from '@mui/material';

const jump = keyframes`
  0%, 80%, 100% {
    transform: scale(0) translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2) translateY(-10px);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'all',
        animation: `${fadeIn} 0.2s ease-in`,
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
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: '#fff',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
              animation: `${jump} 1.4s infinite ease-in-out`,
              animationDelay: `${index * 0.16}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

