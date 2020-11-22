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
  const dateParts = dateString.split('/');
  // month is 0-based, that's why we need dataParts[1] - 1
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
};

// Date Comparator for Ag-grid
export const dateComparator = (date1, date2) => {
  const date1Number = dateToMilliseconds(date1);
  const date2Number = dateToMilliseconds(date2);
  if (date1Number === null && date2Number === null) {
    return 0;
  }

  if (date1Number === null) {
    return -1;
  }

  if (date2Number === null) {
    return 1;
  }

  return date1Number - date2Number;
};

export const dateToMilliseconds = (dateString) => {
  if (dateString === undefined || dateString === null) {
    return null;
  }

  let isoFormat = '';

  if (dateString.includes(' ')) {
    const datePart = dateString.split(' ')[0];
    const timePart = dateString.split(' ')[1];
    isoFormat = `${isoFormatDate(datePart)} ${timePart}`;
  } else {
    isoFormat = isoFormatDate(dateString);
  }

  const date = new Date(isoFormat);
  const milliseconds = date.getTime();

  return milliseconds;
};
