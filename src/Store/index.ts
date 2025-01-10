import { create } from 'zustand';

// Store interface
interface LoginIndexStore {
    loginRole: string | null;
    loginHolat: boolean ;
    otzivHolat: boolean; // Corrected property name
    lang: string;
    setLoginRole: (role: string | null) => void;
    setLoginHolat: (holat: boolean ) => void;
    setOtzivHolat: (otzivHolat: boolean) => void; // Corrected property name
    setLoginLang: (lang: string) => void;
}

const LoginIndex = create<LoginIndexStore>((set) => ({
    loginRole: null, // Corrected property name
    loginHolat: false, // Corrected property name
    otzivHolat: false, // Corrected property name
    lang: 'uz', // Corrected property name
    setLoginRole: (loginRole) => set({ loginRole }),
    setLoginHolat: (loginHolat) => set({ loginHolat }),
    setOtzivHolat: (otzivHolat) => set({ otzivHolat }),
    setLoginLang: (lang) => set({ lang }), // Corrected property name
}));

export default LoginIndex;
