export const CDI_legend = [
  {
    labels: "> 1.0 No Drought",
    range: "> 1.0",
    color: "#D2FBD2",
    left_operator: "1.0>",
    right_operator: null,
    from: 1.0,
    to: 3.0,
  },
  {
    labels: "Mild",
    range: "0.8 - 1.0",
    color: "#FFFFBE",
    left_operator: "0.8>",
    right_operator: "<=1.0",
    from: 0.8,
    to: 1.0,
  },
  {
    labels: "Moderate",
    range: "< 0.8 - 0.6",
    color: "#E6987B",
    left_operator: "0.6>",
    right_operator: "<=0.8",
    from: 0.6,
    to: 0.8,
  },
  {
    labels: "Severe",
    range: "0.6 - 0.4",
    color: "#D03A27",
    left_operator: "0.4>",
    right_operator: "<=0.6",
    from: 0.4,
    to: 0.6,
  },
  {
    labels: "Extreme",
    range: "< 0.4",
    color: "#940905",
    left_operator: "0>",
    right_operator: "<=0.4",
    from: 0,
    to: 0.4,
  },
];

export const PDI_legend = [
  {
    labels: "Above average rainfall",
    range: "> 1.0",
    color: "#D2FBD2",
    left_operator: "1.0>",
    right_operator: null,
    from: 1.0,
    to: 3.0,
  },
  {
    labels: "Average rainfall",
    range: "0.8 - 1.0",
    color: "#FFFFBE",
    left_operator: "0.8>",
    right_operator: "<=1.0",
    from: 0.8,
    to: 1.0,
  },
  {
    labels: "Below average rainfall",
    range: "< 0.8 - 0.4",
    color: "#E6987B",
    left_operator: "0.4>",
    right_operator: "<=0.8",
    from: 0.4,
    to: 0.8,
  },

  {
    labels: "Significantly below average rainfall",
    range: "< 0.4",
    color: "#940905",
    left_operator: "0>",
    right_operator: "<=0.4",
    from: 0,
    to: 0.4,
  },
];

export const TDI_legend = [
  {
    labels: "Normal to below normal temperatures",
    range: "> 0.8",
    color: "#D2FBD2",
    left_operator: "0.8>",
    right_operator: null,
    from: 0.8,
    to: 3.0,
  },
  {
    labels: "Average rainfall",
    range: "0.4 - 0.8",
    color: "#FFFFBE",
    left_operator: "0.4>",
    right_operator: "<=0.8",
    from: 0.4,
    to: 0.8,
  },

  {
    labels: "Exeptionally higher than normal temperatures",
    range: "< 0.4",
    color: "#940905",
    left_operator: "0>",
    right_operator: "<=0.4",
    from: 0,
    to: 0.4,
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
