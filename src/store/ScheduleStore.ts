import { create } from "zustand";

interface ScheduleSideModeState {
  sideMode: "note" | "edit" | "add";
  setSideMode: (mode: "note" | "edit" | "add") => void;
}

export const useScheduleSideModeStore = create<ScheduleSideModeState>((set) => ({
  sideMode: "note",
  setSideMode: (mode: "note" | "edit" | "add") => set({ sideMode: mode })
}));
