export const pick = (obj, ...propNames) => {
  if (!obj || !propNames) {
    return {};
  }

  return Object.keys(obj).reduce((acc, key) => {
    if (propNames.includes(key)) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
};

// 연이어 호출해도 마지막 호출 기준으로 타이머 시간이 지난 경우에만 콜백 함수를 호출
// → 특정 함수의 호출 횟수를 제한하는 기능
export const debounce = (fn, wait) => {
  let timeout = null;

  return (...args) => {
    const later = () => {
      timeout = -1;
      fn(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(later, wait);
  };
};

export const isNumber = value => typeof value === 'number';

export const parseJSON = value => {
  if (!value) {
    return value;
  }

  const result = JSON.parse(value);

  return typeof result === 'string' ? JSON.parse(result) : result;
};
