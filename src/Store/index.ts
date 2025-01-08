import { create } from 'zustand';

// Store interface
interface LoginIndexStore {
    loginRole: string | null;
    loginHolat: boolean ;
    lang: string;
    setLoginRole: (role: string | null) => void;
    setLoginHolat: (holat: boolean ) => void;
    setLoginLang: (lang: string) => void;
}

const LoginIndex = create<LoginIndexStore>((set) => ({
    loginRole: null, // Corrected property name
    loginHolat: false, // Corrected property name
    lang: 'uz', // Corrected property name
    setLoginRole: (loginRole) => set({ loginRole }),
    setLoginHolat: (loginHolat) => set({ loginHolat }),
    setLoginLang: (lang) => set({ lang }), // Corrected property name
}));

export default LoginIndex;
