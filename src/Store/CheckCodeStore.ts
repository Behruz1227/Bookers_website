import { create } from 'zustand';
interface CheckCodeStore {
    CheckCode: any;
    error: any;
    loading: boolean;
    setCheckCode: (CheckCode: any) => void;
    setError: (error: any) => void;
    setLoading: (loading: boolean) => void;
}
const useCheckCodeStore = create<CheckCodeStore>((set) => ({
    CheckCode: null,
    error: null,
    loading: false,
    // Telefonni tekshirishni o'rnatish
    setCheckCode: (CheckCode) => set({ CheckCode }),
    // Xatolikni o'rnatish
    setError: (error) => set({ error }),
    // Yuklanish holatini o'rnatish
    setLoading: (loading) => set({ loading }),
}));

export default useCheckCodeStore;
