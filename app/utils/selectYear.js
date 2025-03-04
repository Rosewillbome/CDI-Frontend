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
