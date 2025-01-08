import { create } from 'zustand';

// Store interface
interface LoginIndexStore {
    loginRole: string | null;
    loginHolat: boolean ;
    setLoginRole: (role: string | null) => void;
    setLoginHolat: (holat: boolean ) => void;
}

const LoginIndex = create<LoginIndexStore>((set) => ({
    loginRole: null, // Corrected property name
    loginHolat: false, // Corrected property name
    setLoginRole: (loginRole) => set({ loginRole }),
    setLoginHolat: (loginHolat) => set({ loginHolat }),
}));

export default LoginIndex;
