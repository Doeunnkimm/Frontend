const addSeparator = (num, separator = ',') => {
  let result = '';

  while (num.length > 3) {
    result = `${separator}${num.slice(-3)}${result}`;
    num = num.slice(0, -3);
  }

  if (num) {
    result = num + result;
  }
  return result;
};

export default addSeparator;
