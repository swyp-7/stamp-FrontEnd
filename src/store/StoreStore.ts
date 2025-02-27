import { create } from "zustand";

interface StoreInfoState {
  storeData: Record<string, any> | undefined;
  cookieData: string | undefined;
  // eslint-disable-next-line no-unused-vars
  setStoreData: (data: Record<string, any>) => void;
  // eslint-disable-next-line no-unused-vars
  updateStore: (store: Record<string, any>) => void;
  // eslint-disable-next-line no-unused-vars
  updateCookie: (cookie: string) => void;
}

export const useStoreInfoStore = create<StoreInfoState>((set) => ({
  storeData: undefined,
  cookieData: undefined,
  setStoreData: (data: Record<string, any>) => set({ storeData: data }),
  updateStore: (store) =>
    set((state) => ({
      storeData: state.storeData ? { ...state.storeData, store } : { store }
    })),
  updateCookie: (cookie: string) => set({ cookieData: cookie })
}));
