export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const isNumber = value => {
  if (!value) { return false; }
  return !isNaN(value);
}

export function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}


/*
Clean and object by removing any "null" values from the object
*/
export function fullClean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined
      || obj[propName] === "" || obj[propName] === 0) {
      delete obj[propName];
    }
  }
  return obj
}