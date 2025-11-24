import { create } from 'zustand';

type SortOption = 'name' | 'number';

interface PokemonFilterState {
  sortBy: SortOption;
  searchQuery: string;
  setSortBy: (sort: SortOption) => void;
  setSearchQuery: (query: string) => void;
}

export const usePokemonFilterStore = create<PokemonFilterState>((set) => ({
  sortBy: 'number', // Default matching your Postman collection
  searchQuery: '',
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));


