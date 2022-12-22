// ES2015의 화살표 함수(arrow function)는 기존 함수 표현식에 비해 간결하다.
// 또한 함수를 정의하는 영역의 this를 그대로 전달받을 수 있다.

const test1 = function (a, b) {
  return a + b;
};

const test2 = (a, b) => {
  return a + b;
};

const test3 = (a, b) => a + b;

console.log(test1(3, 4));
console.log(test2(3, 4));
console.log(test3(3, 4));
