import { create } from "zustand";

interface StoreInfoState {
  storeData: Record<string, any> | undefined;
  // eslint-disable-next-line no-unused-vars
  setStoreData: (data: Record<string, any>) => void;
  // eslint-disable-next-line no-unused-vars
  updateStore: (store: Record<string, any>) => void;
}

export const useStoreInfoStore = create<StoreInfoState>((set) => ({
  storeData: undefined,
  setStoreData: (data: Record<string, any>) => set({ storeData: data }),
  updateStore: (store) =>
    set((state) => ({
      storeData: state.storeData ? { ...state.storeData, store } : { store }
    }))
}));
