export const CDI_legend = [
  {
    labels: "normal",
    range: "> 1.0",
    color: "#D2FBD2",
    left_operator: "1.0>",
    right_operator: null,
    from: 1.0,
    to: 3.0,
    Description: "No drought",
  },
  {
    labels: "Mild",
    range: "0.8 - 1.0",
    color: "#FFFFBE",
    left_operator: "0.8>",
    right_operator: "<=1.0",
    from: 0.8,
    to: 1.0,
    Description:
      "Going into drought, short term dryness slowing planting, growth of crops. Also coming out of a drought – water deficits, partial loss of crops and pasture",
  },
  {
    labels: "Moderate",
    range: "0.6 - 0.8",
    color: "#E6987B",
    left_operator: "0.6>",
    right_operator: "<=0.8",
    from: 0.6,
    to: 0.8,
    Description: "Damage to crops, pastures, drying of shallow reservoirs; voluntary water rationing",
  },
  {
    labels: "Severe",
    range: "0.6 - 0.4",
    color: "#D03A27",
    left_operator: "0.4>",
    right_operator: "<=0.6",
    from: 0.4,
    to: 0.6,
    Description: "Wider scale of loss of crops and pastures, imposed water rationing and livestock migration",
  },
  {
    labels: "Extreme",
    range: "< 0.4",
    color: "#940905",
    left_operator: "0>",
    right_operator: "<=0.4",
    from: 0,
    to: 0.4,
    Description: "Major loss of crops and pasture, extreme fire danger, total water shortages, drying of deep reservoirs and usage restrictions",
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
    Description: "Above average rainfall",
  },
  {
    labels: "Average rainfall",
    range: "0.8 - 1.0",
    color: "#FFFFBE",
    left_operator: "0.8>",
    right_operator: "<=1.0",
    from: 0.8,
    to: 1.0,
    Description: "Average rainfall",
  },
  {
    labels: "Below average rainfall",
    range: "< 0.8 - 0.4",
    color: "#E6987B",
    left_operator: "0.4>",
    right_operator: "<=0.8",
    from: 0.4,
    to: 0.8,
    Description: "Below average rainfall",
  },

  {
    labels: "Significantly below average rainfall",
    range: "< 0.4",
    color: "#940905",
    left_operator: "0>",
    right_operator: "<=0.4",
    from: 0,
    to: 0.4,
    Description: "Significantly below average rainfall",
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
    Description: "Normal to below normal temperatures",
  },
  {
    labels: "Average rainfall",
    range: "0.4 - 0.8",
    color: "#FFFFBE",
    left_operator: "0.4>",
    right_operator: "<=0.8",
    from: 0.4,
    to: 0.8,
    Description: "Average rainfall",
  },

  {
    labels: "Exeptionally higher than normal temperatures",
    range: "< 0.4",
    color: "#940905",
    left_operator: "0>",
    right_operator: "<=0.4",
    from: 0,
    to: 0.4,
    Description: "Exeptionally higher than normal temperatures",
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
