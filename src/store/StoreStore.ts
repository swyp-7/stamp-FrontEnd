import { create } from "zustand";

interface StoreInfoState {
  storeData: Record<string, any> | undefined;
  mobileData: any | undefined;
  cookieData: string | undefined;
  mobileCookieData: string | undefined;
  // eslint-disable-next-line no-unused-vars
  setStoreData: (data: Record<string, any>) => void;
  // eslint-disable-next-line no-unused-vars
  updateStore: (store: Record<string, any>) => void;
  // eslint-disable-next-line no-unused-vars
  setMobileData: (data: Record<string, any>) => void;
  // eslint-disable-next-line no-unused-vars
  updateMobileData: (data: Record<string, any>) => void;
  // eslint-disable-next-line no-unused-vars
  updateCookie: (cookie: string) => void;
  // eslint-disable-next-line no-unused-vars
  updateMobileCookie: (cookie: string) => void;
}

export const useStoreInfoStore = create<StoreInfoState>((set) => ({
  storeData: {},
  mobileData: undefined,
  cookieData: undefined,
  mobileCookieData: undefined,
  setStoreData: (data: Record<string, any>) => set({ storeData: data }),
  updateStore: (store) =>
    set((state) => ({
      storeData: state.storeData ? { ...state.storeData, store } : { store }
    })),
  setMobileData: (data: Record<string, any>) => set({ mobileData: data }),
  updateMobileData: (data: Record<string, any>) =>
    set((state) => ({
      mobileData: state.mobileData ? { ...state.mobileData, ...data } : data
    })),
  updateCookie: (cookie: string) => set({ cookieData: cookie }),
  updateMobileCookie: (cookie: string) => set({ mobileCookieData: cookie })
}));
