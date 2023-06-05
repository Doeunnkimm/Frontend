/**
 * 💎 아이템 53. 타입스크립트 기능보다는 ECMAScript 기능을 사용하기
 *
 *  1. 열거형(enum)
 *      열거형 보다는 리터럴 타임의 유니온을 사용하자
 */

// 1. 열거형(enum)
// enum Flavor {
//   VANILLA = 0,
//   CHOCOLATE = 1,
//   STRAWBERRY = 2,
// }

// let flavor = Flavor.CHOCOLATE; // 타입이 Flavor

// enum Flavor {
//   VANILLA = 'vanilla',
//   CHOCOLATE = 'chocolate',
//   STRAWBERRY = 'strawberry',
// }

// let flavor = Flavor.CHOCOLATE; // 타입이 Flavor
// flavor = 'strawberry';
// ~~~~~~ '"strawberry"' 형식은 'Flavor' 형식에 할당할 수 없습니다.
// --> 명목적 타이핑 때문에

type Flavor = 'vanilla' | 'chocolate' | 'strawberry';

let flavor: Flavor = 'chocolate';
flavor = 'vanilla';
// flavor = 'mint chip';
// ~~~~~~'"mint chip"' 형식은 'Flavor' 형식에 할당할 수 없습니다.

/**
 * 💎 아이템 54. 객체를 순회하는 노하우
 */

// forEach vs for-in vs for-of

// 🔵 forEach 반복문
// ⭐ 특징
//    1. Array 객체에서만 사용 가능한 메서드
//       ES6부터는 Map, Set 등에서도 지원
var items = ['item1', 'item2', 'item3'];
items.forEach((item: string) => {
  console.log(item);
});

// 🔵 for-in 반복문
// ⭐ 특징
//    1. 객체들의 속성들을 반복하여 작업 수행
//    2. 모든 객체에서 사용이 가능
//    3. key 값에는 접근할 수 있지만, value 값에 접근 X
var obj = {
  a: 1,
  b: 2,
  c: 3,
};
for (const prop in obj) {
  console.log(prop, obj[prop]);
}

// 🔵 for-of 반복문
// ⭐ 특징
//    1. ES6에 추가된 새로운 컬렉션 전용 반복 구문
var iterable = [10, 20, 30];
for (const value of iterable) {
  console.log(value);
}

// for-in 반복문과 for-of 반복문의 차이점
// for-in : 객체의 모든 열거 가능한 속성에 대해 반복 --> 객체 순환
// for-of : [Symbol.iterator] 속성을 가지는 컬렉션 전용 --> 배열 순환

interface Information {
  name: string;
  age: number;
  address: string;
}
const information = {
  name: 'Doeunnkimm',
  age: 23,
  address: 'paju',
};
for (const value of Object.entries(information)) {
  console.log(value);
  // ["name", "Doeunnkimm"]
  // ["age", 23]
  // ["address", "paju"]
}

// best !
const informationFn = (info: Information) => {
  for (const [key, value] of Object.entries(info)) {
    const result = info[key];
  }
};

// keyof를 사용해도 에러는 사라지만
const informationFn2 = (info: Information) => {
  let k: keyof Information;
  for (k in info) {
    const result = info[k]; //타입이 string | number 타입
  }
};
// result가 string | number 타입으로 한정되어 너무 좁아 문제가 된다.
// --> 런타임의 동작을 예상하기 어렵다.
