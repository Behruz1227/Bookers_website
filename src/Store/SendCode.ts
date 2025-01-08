import { create } from 'zustand';

// Store interfeysi
interface SendCodeStore {
    SendCode: any;
    error: any;
    loading: boolean;
    setSendCode: (SendCode: any) => void;
    setError: (error: any) => void;
    setLoading: (loading: boolean) => void;
}

// Zustand store
const useSendCodeStore = create<SendCodeStore>((set) => ({
    SendCode: null,
    error: null,
    loading: false,
    // Telefonni tekshirishni o'rnatish
    setSendCode: (SendCode) => set({ SendCode }),
    // Xatolikni o'rnatish
    setError: (error) => set({ error }),
    // Yuklanish holatini o'rnatish
    setLoading: (loading) => set({ loading }),
}));

export default useSendCodeStore;
