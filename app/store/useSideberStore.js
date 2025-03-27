import { create } from "zustand";

export const useSideberStore = create((set) => ({
  title: "Combined Drought Index",
  indicator: "CDI",
  timerange: "2024",
  month: "December",
  district: "APAC",
  districtOne: "MASAKA",
  districtTwo: "MASAKA",
  timerangeOne: "",
  timerangeTwo: "",
  monthOne: "",
  monthTwo: "",
  filterBylegend: [],
  sliderYear: "2022",
  tabs: "map-view",
  endYear: 2024,
  startYear: 2020,
  setEndYear: (newEndYear) => set((state) => ({ endYear: newEndYear })),
  setStartYear: (newStartYear) => set((state) => ({ startYear: newStartYear })),

  setFilterBylegend: (newFilterBylegend) =>
    set((state) => ({ filterBylegend: newFilterBylegend })),
  setMonthTwo: (newMonthTwo) => set((state) => ({ monthTwo: newMonthTwo })),
  setMonthOne: (newMonthOne) => set((state) => ({ monthOne: newMonthOne })),
  setTimerangeOne: (newTimerangeOne) =>
    set((state) => ({ timerangeOne: newTimerangeOne })),
  setTimerangeTwo: (newTimerangeTwo) =>
    set((state) => ({ timerangeTwo: newTimerangeTwo })),
  setDistrictTwo: (newDistrictTwo) =>
    set((state) => ({ districtTwo: newDistrictTwo })),
  setDistrictOne: (newDistrictOne) =>
    set((state) => ({ districtOne: newDistrictOne })),
  setIndicator: (newTitle) => set((state) => ({ title: newTitle })),
  setIndicator: (newIndicator) => set((state) => ({ indicator: newIndicator })),
  setTimerange: (newTimerange) => set((state) => ({ timerange: newTimerange })),
  setMonth: (newMonth) => set((state) => ({ month: newMonth })),
  setDistrict: (newDistrict) => set((state) => ({ district: newDistrict })),
  setSliderYear: (newsliderYear) =>
    set((state) => ({ sliderYear: newsliderYear })),
  setTabs: (tabss) => set((state) => ({ tabs: tabss })),
}));
