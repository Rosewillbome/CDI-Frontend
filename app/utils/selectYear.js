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
  ["January", "01"],
  ["February", "02"],
  ["March", "03"],
  ["April", "04"],
  ["May", "05"],
  ["June", "06"],
  ["July", "07"],
  ["August", "08"],
  ["September", "09"],
  ["October", "10"],
  ["November", "11"],
  ["December", "12"],
];

export const filterByMonth = (data) => {
  if (!data || !data[0]) return null; // Prevent errors if data is undefined
  const timestamp = data[0];
  const date = new Date(timestamp);
  const month_current = date.getMonth(); // 0-based index
  // console.log("months[month_current]",months[month_current][0])
  return months[month_current][0];
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
  "SEMBABULE",
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
  let left_operator;
  let right_operator;
  if (legendString?.length > 0) {
    left_operator = legendString[0]
      ? getRegexExpression(legendString[0])
      : null;

    right_operator = legendString[1]
      ? getRegexExpression(legendString[1])
      : null;
  }
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
        break;
    }
  }

  return filteredData;
};

export const capitalize = (s) => {
  return s && String(s[0]).toUpperCase() + String(s).slice(1);
};

export const filter_static_data = (data, month, year) => {
  console.log(
    "dataa",
    [],
    "month",
    month?.toString()?.trim(),
    "year",
    year?.toString()?.trim()
  );
  const static_data = data?.filter(
    (static_dataa) =>
      static_dataa[0]?.toString()?.trim() === month?.toString()?.trim() &&
      static_dataa[1]?.toString()?.trim() === year?.toString().trim()
  );
  console.log("static_data", static_data[0]);
  return static_data;
};

export const getYearsList = () => {
  let startYear = 2001;
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );
};

export const returnYears = (startYear, endYear) => {
  let data = [];
  if (endYear - startYear === 0) {
    data = startYear;
  } else {
    let da = [];
    for (let i = startYear; i <= endYear; i++) {
      da.push(i);
    }
    data = da;
  }
  return data;
};

export const handleDownload = (Data, month, endYear) => {
  const fts = async () => {
    const fileUrl = `${process.env.NEXT_PUBLIC_API}uploaded/uploads/data/RFE/${
      filter_static_data(Data, month, endYear)[0]?.[3]
    }`;

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("File not found or server error");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileUrl.split("/").pop() || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  fts()
};
