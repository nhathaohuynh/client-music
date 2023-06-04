export const ConvertFollow = (number) => {
  const formater = Intl.NumberFormat("en", { notation: "compact" });
  return formater.format(number);
};
export const isCheckEmptyObject = (object) => {
  for (let prop in object) return false;
  return true;
};

export const dotAfterThreeDigits = (stringNumber) => {
  return stringNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
