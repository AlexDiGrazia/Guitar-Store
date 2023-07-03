export const formatToUSDCurrency = (number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPhoneNumber = (e) => {
  let mask = e.target.value.replace(/\s/g, "").replace(/[^0-9]/g, "");
  if (mask.length) {
    if (mask.length == 7 && !mask.includes("-")) {
      const array = mask.split("");
      array.splice(3, 0, " - ");
      const newStr = array.join("");
      return newStr;
    } else {
      return mask;
    }
  }
  return mask;
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

export const getLastFourOfCreditCard = (str) => {
  return str.replace(/\s/g, "").slice(str.length - 7, str.length);
};

export const getCartTotal = (str) => {
  return Object.values(str).reduce((a, b) => a + b);
};
