'use client';

import { useLazyQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';

const SEARCH_POKEMON = gql`
  query SearchPokemon($query: String!) {
    searchPokemon(query: $query) {
      id
      name
      imageUrl
    }
  }
`;

// Cache for search results to avoid redundant requests
const searchCache = new Map<string, any[]>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: any[];
  timestamp: number;
}

export const usePokemonSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 350); // Slightly longer for better UX
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastQueryRef = useRef<string>('');
  
  const [searchPokemon] = useLazyQuery(SEARCH_POKEMON, {
    fetchPolicy: 'cache-first', // Use cache first, then network
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: false,
  });

  // Check cache before making request
  const getCachedResult = useCallback((query: string): any[] | null => {
    const cacheKey = query.toLowerCase().trim();
    const cached = searchCache.get(cacheKey) as CacheEntry | undefined;
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    
    if (cached) {
      searchCache.delete(cacheKey); // Remove expired cache
    }
    
    return null;
  }, []);

  // Set cache entry
  const setCacheResult = useCallback((query: string, data: any[]) => {
    const cacheKey = query.toLowerCase().trim();
    searchCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
    
    // Limit cache size to prevent memory issues
    if (searchCache.size > 50) {
      const firstKey = searchCache.keys().next().value;
      searchCache.delete(firstKey);
    }
  }, []);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();
    
    // Reset if query is too short
    if (trimmedQuery.length < 2) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      lastQueryRef.current = '';
      return;
    }

    // Skip if same query
    if (trimmedQuery === lastQueryRef.current) {
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Check cache first
    const cached = getCachedResult(trimmedQuery);
    if (cached) {
      setResults(cached);
      setIsLoading(false);
      setError(null);
      lastQueryRef.current = trimmedQuery;
      return;
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    setIsLoading(true);
    setError(null);
    lastQueryRef.current = trimmedQuery;

    // Make the request
    searchPokemon({
      variables: { query: trimmedQuery },
      context: {
        fetchOptions: {
          signal: abortController.signal,
        },
      },
    })
      .then(({ data, error: queryError }) => {
        // Check if request was aborted
        if (abortController.signal.aborted) {
          return;
        }

        if (queryError) {
          setError(queryError);
          setResults([]);
          setIsLoading(false);
          return;
        }

        const searchResults = data?.searchPokemon || [];
        setResults(searchResults);
        setCacheResult(trimmedQuery, searchResults);
        setIsLoading(false);
      })
      .catch((err) => {
        // Ignore abort errors
        if (err.name === 'AbortError' || abortController.signal.aborted) {
          return;
        }
        
        if (!abortController.signal.aborted) {
          setError(err);
          setResults([]);
          setIsLoading(false);
        }
      });

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedQuery, searchPokemon, getCachedResult, setCacheResult]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setResults([]);
    setError(null);
    lastQueryRef.current = '';
    
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    results,
    isLoading,
    error,
    clearSearch,
    hasResults: results.length > 0,
  };
};

