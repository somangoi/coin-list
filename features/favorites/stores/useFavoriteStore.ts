import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
  favoriteIds: string[];
  addFavorite: (coinId: string) => void;
  removeFavorite: (coinId: string) => void;
  isFavorite: (coinId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      addFavorite: (coinId: string) => {
        set((state) => ({
          favoriteIds: [...state.favoriteIds, coinId],
        }));
      },
      removeFavorite: (coinId: string) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((id) => id !== coinId),
        }));
      },
      isFavorite: (coinId: string) => {
        return get().favoriteIds.includes(coinId);
      },
    }),
    {
      name: 'favorite-coins',
    }
  )
);
