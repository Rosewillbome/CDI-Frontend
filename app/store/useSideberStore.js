import { create } from "zustand";

export const useSideberStore = create((set) => ({
  indicator: "CDI",
  timerange: "2025",
  month: "january",
  district: "acholi",
  setIndicator: (newIndicator) => set((state) => ({ indicator: newIndicator })),
  setTimerange: (newTimerange) => set((state) => ({ timerange: newTimerange })),
  setMonth: (newMonth) => set((state) => ({ month: newMonth })),
  setDistrict: (newDistrict) => set((state) => ({ district: newDistrict })),
}));
