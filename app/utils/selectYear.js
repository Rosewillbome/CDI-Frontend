export const showYears = () => {
  const startYear = 2000;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    new Array(currentYear - startYear + 1),
    (val, index) => startYear + index
  );
  return years;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const filterByMonth = (data) => {
  if (!data || !data[0]) return null; // Prevent errors if data is undefined
  const timestamp = data[0];
  const date = new Date(timestamp);
  const month_current = date.getMonth(); // 0-based index
  return months[month_current];
};

export const filterByYear = (data) => {
  if (!data || !data[0]) return null; // Prevent errors if data is undefined
  const timestamp = data[0];
  const date = new Date(timestamp);
  const year_current = date.getFullYear(); // 0-based index
  return year_current;
};
export const districts = [
  "KAMULI",
  "KAMWENGE",
  "KANUNGU",
  "KAPCHORWA",
  "KAPELEBYONG",
  "KARENGA",
  "KASESE",
  "KASSANDA",
  "KATAKWI",
  "KAYUNGA",
  "KAZO",
  "KIBAALE",
  "KIBOGA",
  "KIBUKU",
  "KIKUUBE",
  "KIRUHURA",
  "KIRYANDONGO",
  "KISORO",
  "KITAGWENDA",
  "KITGUM",
  "KOBOKO",
  "KOLE",
  "KOTIDO",
  "KUMI",
  "KWANIA",
  "KWEEN",
  "KYANKWANZI",
  "KYEGEGWA",
  "KYENJOJO",
  "KYOTERA",
  "LAMWO",
  "LIRA",
  "LUUKA",
  "LUWERO",
  "LWENGO",
  "LYANTONDE",
  "MADI OKOLLO",
  "MANAFWA",
  "MARACHA",
  "MASAKA",
  "MASINDI",
  "MAYUGE",
  "MBALE",
  "MBARARA",
  "MITOOMA",
  "MITYANA",
  "MOROTO",
  "MOYO",
  "MPIGI",
  "MUBENDE",
  "MUKONO",
  "NABILATUK",
  "NAKAPIRIPIRIT",
  "NAKASEKE",
  "NAKASONGOLA",
  "NAMAYINGO",
  "NAMISINDWA",
  "NAMUTUMBA",
  "NAPAK",
  "NEBBI",
  "NGORA",
  "NTOROKO",
  "NTUNGAMO",
  "NWOYA",
  "OBONGI",
  "OMORO",
  "OTUKE",
  "OYAM",
  "PADER",
  "PAKWACH",
  "PALLISA",
  "RAKAI",
  "RUBANDA",
  "RUBIRIZI",
  "RUKIGA",
  "RUKUNGIRI",
  "RWAMPARA",
  "SERERE",
  "SHEEMA",
  "SIRONKO",
  "SOROTI",
  "SSEMBABULE",
  "TORORO",
  "WAKISO",
  "YUMBE",
  "ZOMBO",
];

export const getRegexExpression = (valueInput) => {
  // Regex to match floating-point numbers and expressions
  const regex = /([><=]+)(\d*\.?\d+)|(\d*\.?\d+)([><=]+)/;
  const match = valueInput.match(regex);

  if (match) {
    // Extract the integer or floating-point value
    const numericValue = parseFloat(match[2] || match[3]); // Handle both cases
    // Extract the expression (e.g., <=, >, etc.)
    const expression = match[1] || match[4]; // Handle both cases
    return { numericValue, expression };
  } else {
    return null;
  }
};

export const filterDataByLegend = (legendString, dataa) => {
  const left_operator = legendString[0]
    ? getRegexExpression(legendString[0])
    : null;

  const right_operator = legendString[1]
    ? getRegexExpression(legendString[1])
    : null;

  let filteredData = dataa;

  // Apply left operator filter
  if (left_operator) {
    const { numericValue, expression } = left_operator;
    switch (expression) {
      case ">":
        filteredData = filteredData.filter((d) => d[1] > numericValue);
        break;
      case "<":
        filteredData = filteredData.filter((d) => d[1] < numericValue);
        break;
      case ">=":
        filteredData = filteredData.filter((d) => d[1] >= numericValue);
        break;
      case "<=":
        filteredData = filteredData.filter((d) => d[1] <= numericValue);
        break;
      default:
        console.warn(`Unsupported expression: ${expression}`);
        break;
    }
  }

  // Apply right operator filter
  if (right_operator) {
    const { numericValue, expression } = right_operator;
    switch (expression) {
      case ">":
        filteredData = filteredData.filter((d) => d[1] > numericValue);
        break;
      case "<":
        filteredData = filteredData.filter((d) => d[1] < numericValue);
        break;
      case ">=":
        filteredData = filteredData.filter((d) => d[1] >= numericValue);
        break;
      case "<=":
        filteredData = filteredData.filter((d) => d[1] <= numericValue);
        break;
      default:
        console.warn(`Unsupported expression: ${expression}`);
        break;
    }
  }

  console.log("filteredData", filteredData);
  return filteredData;
};
