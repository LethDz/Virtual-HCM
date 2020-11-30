export const progressBarComparator = (value_1, value_2) => {
  const value1 = value_1.accept;
  const value2 = value_2.accept;
  console.log(value1)
  if (value1 === null && value2 === null) {
    return 0;
  }

  if (value1 === null) {
    return -1;
  }

  if (value2 === null) {
    return 1;
  }

  return value1 - value2;
};
