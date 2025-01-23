import { create } from 'zustand';

interface HelpTypetore {
    HelpType: any; // Changed to lowercase to match common naming conventions.
    error: any;
    loading: boolean;
    setHelpType: (HelpType: any) => void;
    setError: (error: any) => void;
    setLoading: (loading: boolean) => void;
}

const useHelpTypeStore = create<HelpTypetore>((set) => ({
    HelpType: null,
    error: null,
    loading: false,
    // Set the category
    setHelpType: (HelpType) => set({ HelpType }),
    // Set the error
    setError: (error) => set({ error }),
    // Set the loading state
    setLoading: (loading) => set({ loading }),
}));

export default useHelpTypeStore;
