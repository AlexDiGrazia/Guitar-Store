export const formatToUSDCurrency = (number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPhoneNumber = (str) => {
  if (str.length == 7 && !str.includes("-")) {
    const array = str.split("");
    array.splice(3, 0, " - ");
    const newStr = array.join("");
    return newStr;
  } else {
    return str;
  }
};
