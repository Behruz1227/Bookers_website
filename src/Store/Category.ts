import { create } from 'zustand';

interface CategoryStore {
    category: any; // Changed to lowercase to match common naming conventions.
    error: any;
    loading: boolean;
    setCategory: (category: any) => void;
    setError: (error: any) => void;
    setLoading: (loading: boolean) => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
    category: null,
    error: null,
    loading: false,
    // Set the category
    setCategory: (category) => set({ category }),
    // Set the error
    setError: (error) => set({ error }),
    // Set the loading state
    setLoading: (loading) => set({ loading }),
}));

export default useCategoryStore;
