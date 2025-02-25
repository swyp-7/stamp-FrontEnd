import { create } from "zustand";

interface StoreInfoState {
  storeData: Record<string, any> | undefined;
  // eslint-disable-next-line no-unused-vars
  setStoreData: (data: Record<string, any>) => void;
}

export const useStoreInfoStore = create<StoreInfoState>((set) => ({
  storeData: undefined,
  setStoreData: (data: Record<string, any>) => set({ storeData: data })
}));
