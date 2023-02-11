// 배열에서
const arr = [1, 2, 3];
let test_arr1 = [4, 5, 6];
let test_arr2 = [4, 5, 6];

test_arr1.push(arr);
console.log(test_arr1); // [ 4, 5, 6, [ 1, 2, 3 ] ]

test_arr2.push(...arr);
console.log(test_arr2); // [ 4, 5, 6, 1, 2, 3 ]

// 객체에서
const obj = {
  name: 'doeunn',
  age: 23,
};

const test_obj = {
  test1: 1,
  test2: 2,
};

const a_merge = {obj, test_obj};
const b_merge = {...obj, ...test_obj};

console.log(a_merge);
// { obj: { name: 'doeunn', age: 23 }, test_obj: { test1: 1, test2: 2 } }
console.log(b_merge);
// { name: 'doeunn', age: 23, test1: 1, test2: 2 }

// 리스트 안에 객체를 추가
const datas = [
  {
    name: '호민',
    age: 23,
  },
  {
    name: '병건',
    age: '24',
  },
];
// 사용자로부터 값을 받아 datas에 정보를 추가하려고 한다.
const inputData = {
  name: '풍',
  age: 26,
};

const newArray1 = [...datas, inputData];
console.log(newArray1);
/*
[
  { name: '호민', age: 23 },
  { name: '병건', age: '24' },
  { name: '풍', age: 26 }
]
*/
