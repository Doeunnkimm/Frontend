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

/**
 * ⛅ 아이템 51. 의존성 분리를 위해 미러 타입 사용하기
 *
 * 타입스크립트의 미러링(Mirroring) 기법
 * --> 실제 값에 대응하는 타입이 없을 때 또는 복잡한 타입 구조에서
 *     코드의 '반복성'을 줄이기 위해 유틸리티 타입과 관련된 연산을 사용하는 것
 */
interface Person {
  name: string;
  age: number;
  id: number;
}

interface Product {
  name: string;
  price: number;
  id: number;
}

type CommonAttributes<T, U> = {
  [t in keyof T & keyof U]: T[t];
};

type SharedProperties = CommonAttributes<Person, Product>;

const shared: SharedProperties = {
  name: '이름',
  id: 1,
};
// CommonAttributes는 Person과 Product 간의 공통 프로퍼티를 추출하여
// 새로운 타입을 생성한다.
// 결과적으로 SharedProperties 타입은 { name: string, id: number }이 된다.
// 이는 두 인터페이스 또는 객체에 같은 이름의 프로퍼티를 반복하지 않고,
// 타입 미러링 기법을 통해 중복을 줄이는 효율적인 방법이다.

// --> 오히려 타입을 다루는 데 어려움이 있을 수 있다.
//      미러링 기법을 사용하기보다는 유틸리티 타입을 사용하는 방법도 고려해보자.

/**
 * ⛅ 아이템52. 테스팅 타입의 함정에 주의하기
 *
 * 함수 타입에 관한 중요한 개념
 * 동일성(equality)와 할당 가능성(assignability)
 */

/**
 * 1. 동일성(equality)
 * 함수의 타입의 동일성은 두 함수 타입이 서로 완벽하게 일치할 때,
 * 즉 그들의 매개변수와 반환 타입이 같은 경우를 의미
 * 이때, 두 함수의 타입은 완전히 교환 가능하며 서로에게 '같다(equal)'고 간주되는 상태이다.
 */
type Func1 = (arg1: string) => number;
type Func2 = (arg1: string) => number;
// --> 동일성: Func1과 Func2는 동일한 함수 타입이다.

/**
 * 2. 할당 가능성(Assignability)
 * 함수 타입의 할당 가능성은 특정 함수 타입이 다른 함수 타입에 할당될 수 있을지를 확인하는 것
 * 이때, 매개변수와 반환 타입이 대상 타입과 호환 가능해야 할당 가능하다고 할 수 있다.
 */
type SourceFunc = (arg1: string) => number;
type TargetFunc = (arg1: string, arg2: number) => number;

// 할당 가능성: SourceFunc은 TargetFunc에 할당 가능하다.
const assignableFunc: TargetFunc = (arg1: string) => 42;

//--> 타입스크립트에서 함수 타입을 테스트하거나 사용하는데
//    혼동 없이 진행할 수 있게 된다.
