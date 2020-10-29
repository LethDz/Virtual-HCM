export const getDateNowToString = (divider) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const todayString = `${yyyy}${divider}${mm}${divider}${dd}`;

  return todayString;
};

// format to DD/MM/YYYY
export const changeToFormatDateVN = (dateString, divider) => {
  const date = new Date(dateString);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = date.getFullYear();

  return `${dd}${divider}${mm}${divider}${yyyy}`;
};

export const isoFormatDate = (dateString) => {
  console.log(dateString);
  let dateParts = dateString.split('/');
  // month is 0-based, that's why we need dataParts[1] - 1
  const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  console.log(dateParts);
  const newDateFormat = dateObject.toISOString().split('T')[0];

  return newDateFormat;
};
