

import { create } from "zustand";

interface VacanciesStore {
    Response: any;
    setResponse: (response: any) => void;
}

const useVacanciesStore = create<VacanciesStore>((set) => ({
    Response: null,
    setResponse: (response) => set({ Response: response }),
}));

export default useVacanciesStore;

