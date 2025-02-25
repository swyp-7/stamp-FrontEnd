import { create } from "zustand";

interface ScheduleSideModeState {
  sideMode: "note" | "edit" | "add";
  // eslint-disable-next-line no-unused-vars
  setSideMode: (mode: "note" | "edit" | "add") => void;
}

export const useScheduleSideModeStore = create<ScheduleSideModeState>((set) => ({
  sideMode: "note",
  setSideMode: (mode: "note" | "edit" | "add") => set({ sideMode: mode })
}));
