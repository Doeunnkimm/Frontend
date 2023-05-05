/*
    편집기 상의 타입 오류를 살펴보는 것도 타입 시스템의 성향을 파악하는 데 좋은 방법 !
*/

// function getElement(elOrId: string | HTMLElement | null): HTMLElement {
//   if (typeof elOrId === 'object') {
//     // return elOrId;
//     // 'HTMLElement | null' 형식은 'HTMLElement' 형식에 할당할 수 없습니다. 'null' 형식은 'HTMLElement' 형식에 할당할 수 없습니다.ts(2322)
//   } else if (elOrId === null) {
//     return document.body;
//   } else {
//     const el = document.getElementById(elOrId);
//     //   return el
//     // HTMLElement | null' 형식은 'HTMLElement' 형식에 할당할 수 없습니다. 'null' 형식은 'HTMLElement' 형식에 할당할 수 없습니다.ts(2322)
//   }
// }

/*
    첫 번째 if 분기문의 의도는 단지 HTMLElement라는 객체를 골라내는 것
    그러나 자바스크립트에서 typeof null은 "object"이므로, elOrId는 여전히 분기 내에서 null일 가능성이 있음

    *** 자바스크립트에서 null도 object 타입 🔥 
   
    그러므로 처음에 null 체크를 추가해서 바로잡는다.

    두 번재 오류는 document.getElementById가 null을 반환할 가능성이 있어서 발생,
    첫 번재 오류와 동일하게 null 체크를 추가하고 예외를 던져야 한다.
*/

/*
    언어 서비스는 라이브러리와 라이브러리의 타입 선언을 탐색할 때 도움이 된다.
*/
const response = fetch('https://example.com');
// ctrl + click 하게 되면

declare function fetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response>;

// --> fetch가 Promise를 반환하고 두 개의 매개변수를 받는 것을 확인할 수 있음
// RequestInfo를 클릭하면 다음으로 이동

// type RequestInfo = Request | string;

// --> Request를 클릭하면 이동하는 곳은 다음과 같다.

// declare var Request: {
//     prototype: Request;
//     new(input: RequestInfo, init? RequestInit): Request;
// }

// 여기서 Request 타입과 값은 분리되어 모델링되어 있다.
// RequestInit를 클릭하면 Request를 생성할 때 사용할 수 있는 모든 몹션이 나타난다.

interface RequestInit {
  /** A BodyInit object or null to set request's body. */
  body?: BodyInit | null;
  /** A string indicating how the request will interact with the browser's cache to set request's cache. */
  cache?: RequestCache;
  /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
  credentials?: RequestCredentials;
  /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
  headers?: HeadersInit;
  /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
  integrity?: string;
  /** A boolean to set request's keepalive. */
  keepalive?: boolean;
  /** A string to set request's method. */
  method?: string;
  /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
  mode?: RequestMode;
  /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
  redirect?: RequestRedirect;
  /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
  referrer?: string;
  /** A referrer policy to set request's referrerPolicy. */
  referrerPolicy?: ReferrerPolicy;
  /** An AbortSignal to set request's signal. */
  signal?: AbortSignal | null;
  /** Can only be null. Used to disassociate request from any Window. */
  window?: null;
}

/*
    가장 작은 집합 : 아무 것도 포함하지 않는 공집합 --> 타입스크립트에서는 never 타입
*/

// const x: never = 12; // '12' 형식은 'never' 형식에 할당할 수 없습니다.

/*
    그 다음으로 작은 집합은 한 가지 값만 포함하는 타입 --> 타입스크립트에서 unit 타입이라고 불리는 리터럴(literal) 타입
*/

type A = 'A';
type B = 'B';
type Twelve = 12;

// 두 개 혹은 세 개로 묶으려면 유니온(union) 타입을 사용
// 유니온 타입은 값 집합들의 합집합
type AB = 'A' | 'B';
type AB12 = 'A' | 'B' | 12;

/*
    다양한 타입스크립트 오류에서 '할당 가능한' 문구를 볼 수 있다.
    이 문구는 집합의 관점에서, '~의 원소(값과 타입의 관계)' 또는 '~의 부분 집합(두 타입의 관계)'을 의미한다.
*/
const a: AB = 'A'; // 정상, 'A'는 집합 { 'A', 'B' }의 원소입니다.
// const c: AB = 'C'; // '"C"' 형식은 'AB' 형식에 할당할 수 없습니다.
// --> "C"는 유닛 타입 --> 범위는 단일 값 "C"로 구성되며 AB("A"와 "B"로 이루어진)의 부분 집합이 아니므로 오류

/*
    인터페이스로 타입 선언하기
*/

interface Person {
  name: string;
}

interface Lifespan {
  birth: Date;
  death?: Date;
}
// type PersonSpan = Person & Lifespan;

// & 연산자는 두 타입의 인터섹션(교집합)을 게산
// Person과 Lifespan 인터페이스는 공통으로 가지는 속성이 없기 때문에 공집합으로 예상하기 쉬움
// ✨ 그러나 타입 연산자는 인터페이스의 속성이 아닌, 값의 집합(타입의 범위)에 적용됨
// 그리고 추가적인 속성을 가지는 값도 여전히 그 타입에 속함
// ✨ 그래서 Person과 Lifespan을 둘 다 가지는 값은 인터섹션 타입에 속하게 됨
const ps: PersonSpan = {
  name: 'Alan Turing',
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
};
// 당연히 앞의 세 가지보다 더 많은 속성을 가지는 값도 PersonSpan 타입에 속한다.

// 규칙이 속성에 대한 인터섹션에 관해서는 맞지만, 두 인터페이스의 유니온 타입에서는 X
type K = keyof (Person | Lifespan); // 타입이 never
// 앞의 유니온 타입에 속하는 값은 어떠한 키도 없기 때문에, 유니온에 대한 keyof는 공집합(never)이어야만 한다.
// keyof (A&B) = (keyof A) | (keyof B)
// keyof (A|B) = (keyof A) & (keyof B)

// extends 키워드 쓰기
interface Person {
  name: string;
}

interface PersonSpan extends Person {
  birth: Date;
  death?: Date;
}
// 타입이 집합이라는 관점에서 extends의 의미는 '~에 할당 가능한'과 비슷하게
// '~의 부분 집합'이라는 의미로 받아들일 수 있음

interface Vector1D {
  x: number;
}
interface Vector2D extends Vector1D {
  y: number;
}
interface Vector3D extends Vector2D {
  z: number;
}

interface Vector1D {
  x: number;
}
interface Vector2D extends Vector1D {
  x: number;
  y: number;
}
interface Vector3D extends Vector1D {
  x: number;
  y: number;
  z: number;
}

// --> 두 가지 스타일 모두 객체 타입에 대해서 잘 동작하지만,
//     리터럴 타입과 유니온 타입에 대해 생각해 본다면 집합 스타일이 훨씬 직관적

/*
    extends 키워드는 제너릭 타입에서 한정자로도 쓰이며, 이 문맥에서는 '~의 부분 집합'을 의미하기도
*/
function getKey<K extends string>(val: any, key: K) {
  // ...
}
// string을 상속한다는 의미를 집합의 관점에서 생각해보자
// string의 부분집합 범위를 가지는 어떠한 타입이 된다.
// 이 타입은 string 리터럴 타입, string 리터럴 타입의 유니온, string 자신을 포함
getKey({}, 'x'); // 정상, 'x'는 string을 상속
getKey({}, Math.random() < 0.5 ? 'a' : 'b'); // 정상, 'a' | 'b'는 string을 상속
getKey({}, document.title); // 정상, string은 string을 상속
// getKey({}, 12); // '12' 형식의 인수는 'string' 형식의 매개변수에 할당될 수 없습니다

// ---> 마지막 오류에서 '할당될 수 없습니다'는 상속의 관점에서 "상속할 수 없습니다"로 바꿀 수 있다.

/*
    keyof 타입
*/
interface Point {
  x: number;
  y: number;
}
type PointKeys = keyof Point; // 타입은 "x" | "y"

function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
  return vals;
}
const pts: Point[] = [
  { x: 1, y: 1 },
  { x: 2, y: 0 },
];
sortBy(pts, 'x'); // 정상, 'x'는 'x' | 'y'를 상속(즉, keyof T)
sortBy(pts, 'y'); // 정상, 'y'는 'x' | 'y'를 상속
sortBy(pts, Math.random() < 0.5 ? 'x' : 'y'); // 정상, 'x' | 'y'는 'x' | 'y'를 상속
// sortBy(pts, 'z');

/*
    타입이 집합이라는 관저은 배열과 튜플의 관계 역시 명확!
*/
const list = [1, 2]; // 타입은 number[]
// const tuple: [number, number] = list; // 'number[]' 타입은 '[number, number]' 타입의 0, 1 속성에 없습니다.
// --> number[]는 [number, number]의 부분 집합이 아니기 떄문에 할당 X (당연히 반대로 할당하면 동작 O)

/*
    트리플(triple, 세 숫자를 가지는 타입)
*/
const triple: [number, number, number] = [1, 2, 3];
// const double: [number, number] = triple; // error

// type T = Exclude<string | Date, string | number>; // 타입은 Date
// type NonZeroNums = Exclude<number, 0>;

/*
  class와 enum은 타입과 값 두 가지 모두 가능한 예약어이다.
*/
class Cylinder {
  radius = 1;
  height = 1;
}

function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    const radius = shape.radius; // 정상
  }
}
// 클래스가 타입으로 쓰일 때는 형태(속성과 메소드)가 사용되는 반면,
// 값으로 쓰일 때는 생성자가 사용됩니다.

/*
  class 키워드는 값과 타입 두 가지로 모두 사용
  -> 클래스에 대한 typeof는 상황에 따라 다르게 동작
*/
const v = typeof Cylinder; // 값이 "function"
type T = typeof Cylinder; // 타입이 typeof Cylinder

/*
  타입스크립트에서 구조 분해 할당을 하면 이상한 오류가 발생
*/
// function email({person: Person, subject: string, body: string}) // 바인딩 요소 'Person'에 암시적으로 any 형식이 있습니다.
