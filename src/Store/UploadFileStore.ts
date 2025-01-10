
import { create } from "zustand";

interface UploadFileState {
  fileResponse: any | null;
  isLoading: boolean;
  error: string | null;
  setFileResponse: (response: any) => void;
}

const useUploadFileStore = create<UploadFileState>((set) => ({
  fileResponse: null,
  isLoading: false,
  error: null,
  setFileResponse: (response) => set({ fileResponse: response }),
}));

export default useUploadFileStore;
