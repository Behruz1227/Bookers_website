import { create } from 'zustand';

// Store interfeysi
interface LoginCheckStore {
    LoginCheck: any;
    error: any;
    loading: boolean;
    setLoginCheck: (LoginCheck: any) => void;
    setError: (error: any) => void;
    setLoading: (loading: boolean) => void;
}

// Zustand store
const useLoginCheckStore = create<LoginCheckStore>((set) => ({
    LoginCheck: null,
    error: null,
    loading: false,
    // Telefonni tekshirishni o'rnatish
    setLoginCheck: (LoginCheck) => set({ LoginCheck }),
    // Xatolikni o'rnatish
    setError: (error) => set({ error }),
    // Yuklanish holatini o'rnatish
    setLoading: (loading) => set({ loading }),
}));

export default useLoginCheckStore;
