import { create } from 'zustand';

interface MasterCategoryStore {
    MasterCategory: any; // Changed to lowercase to match common naming conventions.
    error: any;
    loading: boolean;
    setMasterCategory: (category: any) => void;
    setError: (error: any) => void;
    setLoading: (loading: boolean) => void;
}

const useMasterCategoryStore = create<MasterCategoryStore>((set) => ({
    MasterCategory: null,
    error: null,
    loading: false,
    // Set the category
    setMasterCategory: (MasterCategory) => set({ MasterCategory }),
    // Set the error
    setError: (error) => set({ error }),
    // Set the loading state
    setLoading: (loading) => set({ loading }),
}));

export default useMasterCategoryStore;
