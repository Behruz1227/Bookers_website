import { create } from 'zustand';

// Store interfeysi
interface PhoneCheckStore {
    PhoneCheck: any;
    error: any ;
    loading: boolean;
    setPhoneCheck: (PhoneCheck: any) => void;
    setError: (error: any) => void;
    setLoading: (loading: boolean) => void;
}

// Zustand store
const usePhoneCheckStore = create<PhoneCheckStore>((set) => ({
    PhoneCheck: null,
    error: null,
    loading: false,
    // Telefonni tekshirishni o'rnatish
    setPhoneCheck: (PhoneCheck) => set({ PhoneCheck }),
    // Xatolikni o'rnatish
    setError: (error) => set({ error }),
    // Yuklanish holatini o'rnatish
    setLoading: (loading) => set({ loading }),
}));

export default usePhoneCheckStore;
