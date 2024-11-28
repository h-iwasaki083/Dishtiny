import { create } from 'zustand';

// Zustandストアを作成

type Store = {
  number: number;
  setNumber: (newNumber: number) => void;
  ingredients: string[];
  setIngredients: (newIngredients: string[]) => void;
};

const useStore = create<Store>((set) => ({
  number: 3,
  setNumber: (newNumber) => set({ number: newNumber }),  // numberを更新する関数
  ingredients: ['にんじん', 'はくさい', 'eggs'],
  setIngredients: (newIngredients) => set({ ingredients: newIngredients }),
}));

export default useStore;
