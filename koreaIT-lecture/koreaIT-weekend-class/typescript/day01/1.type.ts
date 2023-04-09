// let num: number = 'seongyoung'; // error
let num: number = 18;

// let str: string = 10; // error
let str: string = 'Hello, TypeScript !';

// let bool: boolean = 10; // error
let bool: boolean = false;

let nullVar: null = null;

// 함수 타입
// 타입추론
function add1(num1: number, num2: number) {
  return num1 + num2;
}

// 좋지 않은 예시
// any, unknown, object, Function
// 타입이 명확히 제시 되어있지 않은 것들

// any : 어떠한 타입이든 될 수 있는 언어
// unknown : 타입을 알 수 없음 (그래도 any 보다는 unknown이 나음..)
let anything: any = 'string';
let obj: Object = {
  // 어떠한 키 값이 있던 객체
};

function map1(callback: Function) {}

// 배열, 튜플
// let arr: number[] = [1, 2, 3, 'hi', 5] // error
let arr: number[] = [1, 2, 3, 4, 5];
let arr2: Array<number> = [1, 2, 3, 4, 5];

// let tup1: [string, number] = ['안녕하세요', 123, '111']; // 배열 길이 고정
let tup2: [string, number] = ['안녕하세요', 123]; // 배열 길이 고정

// Map
const myMap = new Map<string, number>();
myMap.set('one', 1);

const noMap = [
  // 아래와 같이 동일한 key와 value를 사용하고 있다면 Map 구조를 사용하는 것이 더 성능적으로도 좋다
  {
    type: 'alert',
    content: '안녕하세요',
  },
  {
    type: 'confirm',
    content: '안녕하세요',
  },
];

// 함수 반환 타입
// 반환 타입이 없을 떄 -> void
const print1 = (): void => {
  console.log('name');
};

// 무한루프, 에러처리할 때 주로 never 타입을 사용함
const error = (message: string): never => {
  throw new Error(message);
};

console.log('실행됨');
