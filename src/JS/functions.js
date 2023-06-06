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

export const verifyAllFieldsComplete = (stateObj) => {
  let allFieldsComplete = true;
  Object.values(stateObj).forEach(
    (value) =>
      (allFieldsComplete = value.length === 0 ? false : allFieldsComplete)
  );
  return allFieldsComplete;
};

export const verifyNoErrors = (stateObj) => {
  let allFieldsComplete = true;
  if (stateObj === {}) {
    return allFieldsComplete;
  } else {
    Object.values(stateObj).forEach(
      (value) =>
        (allFieldsComplete = value.length > 0 ? false : allFieldsComplete)
    );
  }
  return allFieldsComplete;
};
