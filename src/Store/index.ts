import { create } from 'zustand';

// Store interface
interface LoginIndexStore {
    loginRole: string | null;
    loginHolat: boolean ;
    otzivHolat: boolean; // Corrected property name
    vacanciesHolat: boolean;
    masterClassHolat: boolean; // New property for MasterClass
    lang: string;
    setLoginRole: (role: string | null) => void;
    setLoginHolat: (holat: boolean ) => void;
    setOtzivHolat: (otzivHolat: boolean) => void; // Corrected property name
    setVacanciesHolat: (vacanciesHolat: boolean) => void;
    setMasterClassHolat: (masterClassHolat: boolean) => void; // New property for MasterClass
    setLoginLang: (lang: string) => void;
}

const LoginIndex = create<LoginIndexStore>((set) => ({
    loginRole: null, // Corrected property name
    loginHolat: false, // Corrected property name
    otzivHolat: false, // Corrected property name
    vacanciesHolat: false,
    masterClassHolat: false,
    lang: 'uz', // Corrected property name
    setLoginRole: (loginRole) => set({ loginRole }),
    setLoginHolat: (loginHolat) => set({ loginHolat }),
    setOtzivHolat: (otzivHolat) => set({ otzivHolat }),
    setVacanciesHolat: (vacanciesHolat) => set({ vacanciesHolat }), // Corrected property name
    setMasterClassHolat: (masterClassHolat) => set({ masterClassHolat }), // New property for MasterClass
    setLoginLang: (lang) => set({ lang }), // Corrected property name
}));

export default LoginIndex;
