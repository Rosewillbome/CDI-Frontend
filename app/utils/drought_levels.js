export const DROUGHT_SEVERITY_LEVELS = [
  {
    label: "> 1.0 No Drought",
    range: "> 1.0",
    color: "#D2FBD2",
    left_operator: "1.0>",
    right_operator: null,
  },
  {
    label: "Mild",
    range: "0.8 - 0.6",
    color: "#FFFFBE",
    left_operator: "0.8>",
    right_operator: "<=1.0",
  },
  {
    label: "Moderate",
    range: "< 0.8 - 0.6",
    color: "#E6987B",
    left_operator: "0.6>",
    right_operator: "<=0.8",
  },
  {
    label: "Severe",
    range: "0.6 - 0.4",
    color: "#D03A27",
    left_operator: "0.4>",
    right_operator: "<=0.6",
  },
  {
    label: "Extreme",
    range: "< 0.4",
    color: "#940905",
    left_operator: "0>",
    right_operator: "<=0.4",
  },
];

export const getIndex = (data) => {
  if (data?.toLowerCase() === "cdi") {
    return "Combined Drought Index (CDI)";
  } else if (data?.toLowerCase() === "pdi") {
    return "Precipitation Drought Index (PDI)";
  } else if (data?.toLowerCase() === "tdi") {
    return "Temperature Drought Index (TDI)";
  }
};
