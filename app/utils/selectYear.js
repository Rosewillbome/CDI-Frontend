export const showYears = () => {
    const startYear = 2000;
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(currentYear - startYear + 1), (val, index) => startYear + index);
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