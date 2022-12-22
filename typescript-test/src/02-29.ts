// 타입 별칭(type alias)은 기존 타입에 대한 별칭을 부여하는 기능
// 단순한 타입보다는 복잡하게 정의한 사용자 정의 타입을 재사용할 때 자주 사용

// string 타입에 대한 별칭 부여
type MyType = string;
let a: MyType = "Hello";

// 복잡한 타입에 대한 별칭 부여
type MyType2 = { name: string; age: number };
let b: MyType2 = { name: "홍길동", age: 20 };

// 선택적 속성과 읽기 전용 속성
type MyType3 = {
  name: string;
  age?: number;
  readonly email: string;
};

let c: MyType3 = { name: "홍길동", email: "gdhong@test.com" };
// 읽기 전용이므로 에러 발생
// c.email = "gdhong@test.com";

// 튜플 타입
type TupleType = [string, number];
let d: TupleType = ["hello", 100];

// 선택적 속성의 타입을 정의할 때 물음표(?) 기호를 이용해 표현.
// 읽기 전용 속성을 정의할 때는 readonly 지시자를 지정한다.
