export function throwErrorIfNameContainsNumbers(str) {
  return !/[0-9]/.test(str)
           ? ''
           : 'Names may not contain numbers';
 }
 
 export function throwErrorIfZipCodeContainsLetters(zipcode) {
   return !/[a-zA-z]/.test(zipcode)
            ? ''
            : 'Zipcode may not contain letters';
  }