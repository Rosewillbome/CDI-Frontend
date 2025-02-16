import { create } from "zustand";

export const useSideberStore = create((set) => ({
  title: "Combined Drought Index",
  indicator: "CDI",
  timerange: "2025",
  month: "january",
  district: "All",
  setIndicator: (newTitle) => set((state) => ({ title: newTitle })),
  setIndicator: (newIndicator) => set((state) => ({ indicator: newIndicator })),
  setTimerange: (newTimerange) => set((state) => ({ timerange: newTimerange })),
  setMonth: (newMonth) => set((state) => ({ month: newMonth })),
  setDistrict: (newDistrict) => set((state) => ({ district: newDistrict })),
}));
