/**
 * ⛅ 아이템48. API 주석에 TSDoc 사용하기
 */

// 인사말을 생성합니다. 결과를 보기 좋게 꾸며집니다.
// function greet(name: string, title: string) {
//   return `Hello ${name} ${title}`;
// }

/** 인사말을 생성합니다. 결과를 보기 좋게 꾸며집니다. */
// function greet(name: string, title: string) {
//   return `Hello ${name} ${title}`;
// }

/**
 * 인사말을 생성합니다.
 * @param name 인사할 사람의 이름
 * @param title 그 사람의 칭호
 * @returns 사람이 보기 좋은 형태의 인사말
 */
function greet(name: string, title: string) {
  return `Hello ${name} ${title}`;
}

/** 특정 시간과 장소에서 수행된 측정 */
interface Measurement {
  /** 어디에서 측정되었나? */
  position: string;
  /** 언제 측정되었나? epoch에서부터 초 단위로 */
  time: number;
  /** 측정된 운동량 */
  momentum: string;
}

// TSDoc 주석은 마크다운 형식으로 꾸며질 수 있다.
/**
 * 이 interface 는 **세 가지** 속성을 가집니다.
 * 1. x
 * 2. y
 * 3. Z
 */
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 아이템 50. 오버로딩 타입보다는 조건부 타입을 사용하기
 */

// function double<T extends number | string>(x: T): T;
// function double(x: any) {
//   return x + x;
// }
// const num = double(12); // 타입이 12 --> 리터럴 타입
// const str = double('x'); // 타입이 "x" --> 리터럴 타입

// function double<T extends number | string>(x: T): T {
//   return x + x;
//          ~~~~~~ '+' 연산자를 'T' 및 'T' 형식에 적용할 수 없습니다.
// }
// const num = double(12);
// const str = double('x');

// ⭐ 가장 좋은 방법은 조건부 타입 !
function double<T extends number | string>(
  x: T
): T extends string ? string : number;
function double(x: any) {
  return x + x;
}
const num = double(12); // 타입이 number
const str = double('x'); // 타입이 string

function f(x: number | string) {
  return double(x);
}
const what_num = f(12); // 타입이 number | string
const what_str = f('x'); // 타입이 number | string

type ReturnTypeFunction<T> = T extends (...args: any) => infer R ? R : never;

function sum(a: number, b: number): number {
  return a + b;
}
type SumReturnType = ReturnTypeFunction<typeof sum>; // 타입이 number

class MyClass {
  property: string;
}
type MyClassReturnType = ReturnTypeFunction<MyClass>; // 타입이 never

type isString<T> = T extends string ? true : false;

type A = isString<number>; // 타입이 false
type B = isString<boolean>; // 타입이 false

// 오버로딩 타입 예제
// 오버로딩(overloading)은 하나의 함수에 여러 개의 시그니처를 정의하고,
// 해당 함수를 호출할 때 입력된 값의 타입에 따라 적절한 시그니처에 맞게 함수가 호출되게 하는 기술
function functionName(arg1: string): string;
function functionName(arg2: number): number;
function functionName(arg: any) {
  return arg;
}
// 예를 들어 숫자 혹은 문자가 들어올 수 있는 함수라고 한다면
// 오버로딩 방법을 사용한다고 했을 때 코드는 아래와 같다.
// function concat(x: string): string;
// function concat(x: number): number;
// function concat(x: any) {
//   return x + x;
// }
// 위와 같이 오버로딩 방법을 사용하면 number일 때와 string일 때 모두 받을 수 있지만
// 아래와 같은 상황에서 버그가 발견된다.
// function anyFunc(x: string | number) {
//   return concat(x);
// }

// 조건부 타입을 사용하면 버그를 해결할 수 있다.
function concat<T extends string | number>(
  x: T
): T extends string ? string : number;

function concat(x: any) {
  return x + x;
}

function anyFunc(x: string | number) {
  return concat(x);
}

// ✨ 오버로딩 방법보다는 조건부 타입을 사용하는 것이 더 좋다.
//    조건부 타입은 추가적인 오버로딩 없이 유니온 타입을 지원할 수 있다.
