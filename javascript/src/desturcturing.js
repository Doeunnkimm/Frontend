// 배열 선언
const animalList = ['CAT', 'DOG', 'TIGER'];

// 각각 변수 담기
const cat = animalList[0];
const dog = animalList[1];
const tiger = animalList[2];

// 각각 호출
console.log(cat);
console.log(dog);
console.log(tiger);

// 비구조화 할당 방식을 이용하면 4줄을 1줄 코드로 변경 가능
const [cat1, dog1, tiger1] = ['CAT', 'DOG', 'TIGER'];
console.log(cat1);
console.log(dog1);
console.log(tiger1);

// obj 객체를 newObj 객체에 복제
var obj = {
  a: 10,
  b: 20,
};

var newObj = { ...obj };
console.log(newObj);

// arr 배열을 newArr 배열에 복제
var arr = [1, 2, 3];
var newArr = [...arr];
console.log(newArr);

const animalList2 = ['CAT', 'DOG', 'TIGER'];
const [cat2, ...restAnimalList2] = animalList2;
// 앞의 요소 1개와 나머지 요소를 분리하고 싶을 때 위 예시 코드처럼 사용 가능

console.log(cat2);
console.log(restAnimalList2);

// 비구조할당 방식의 기본값 지정
const [cat3, dog3, tiger3, monkey3 = 'MONKEY'] = ['CAT', 'DOG', 'TIGER'];
console.log(cat3);
console.log(dog3);
console.log(tiger3);
console.log(monkey3);

// 기존 배열값을 변수에 한번에 할당
const animal = ['CAT', 'DOG', 'TIGER'];
const [cat4, dog4, tiger4] = animal;
console.log(cat4);
console.log(dog4);
console.log(tiger4);

// 기존 객체 값을 해체(ES6전 코드)
// 객체 선언
const animals = {
  cat: 'CAT',
  dog: 'DOG',
  tiger: 'TIGER',
};

// 각각 변수 담기
const cat5 = animals.cat;
const dog5 = animals.dog;
const tiger5 = animals.tiger;

// 각각 호출
console.log(cat5);
console.log(dog5);
console.log(tiger5);

// 비구조화 할당 방식으로 객체선언과 호출
const { cat6, dog6, tiger6 } = {
  cat6: 'CAT',
  dog6: 'DOG',
  tiger6: 'TIGER',
};

console.log(cat6);
console.log(dog6);
console.log(tiger6);

// 나머지 패턴
const { cat7, ...animal3 } = {
  cat7: 'CAT',
  dog7: 'DOG',
  tiger7: 'TIGER',
};
console.log(cat7);
console.log(animal3);

// 기본값 지정
const {
  cat8,
  dog8,
  tiger8,
  monkey8 = 'MONKEY',
} = {
  cat8: 'CAT',
  dog8: 'DOG',
  tiger8: 'TIGER',
};
console.log(cat8);
console.log(dog8);
console.log(tiger8);
console.log(monkey8);

// 기존 객체 속성값을 변수에 한번에 할당
const animal4 = { cat9: 'CAT', dog9: 'DOG', tiger9: 'TIGER' };
const { cat9, dog9, tiger9 } = animal4;

console.log(cat9);
console.log(dog9);
console.log(tiger9);
