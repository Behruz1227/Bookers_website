

import { create } from "zustand";

interface MasterClassStore {
    Response: any;
    setMasterClass: (response: any) => void;
}

const useMasterClassStore = create<MasterClassStore>((set) => ({
    Response: null,
    setMasterClass: (response) => set({ Response: response }),
}));

export default useMasterClassStore;

