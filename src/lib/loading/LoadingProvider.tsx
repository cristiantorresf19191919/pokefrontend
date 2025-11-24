'use client';

import { LoadingModal } from './LoadingModal';
import { useLoadingStore } from './useLoadingStore';

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <>
      {children}
      <LoadingModal open={isLoading} />
    </>
  );
};

