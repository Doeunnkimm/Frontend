// interface Square {
//   width: number;
// }

// interface Rectangle extends Square {
//   height: number;
// }

// type Shape = Square | Rectangle;

// const calculateArea = (shape: Shape) => {
//   if(shape instanceof Rectangle) // 'Rectangle'은 형식만 참조하지만, 여기서는 값으로 사용되고 있습니다.
// };

// 런타임 시 타입 정보 유지하는 방법
// (1) 속성이 있는 지로 확인하기
// const calculateArea = (shape: Shape) => {
//   if ('height' in shape) {
//     // 타입이 Rectangle
//     return shape.width * shape.height;
//   } else {
//     // 타입이 Square
//     return shape.width;
//   }
// };

// (2) 태그 기법
interface Square {
  kind: 'square';
  width: number;
}

interface Rectangle {
  kind: 'rectangle';
  height: number;
  width: number;
}

type Shape = Square | Rectangle;

const calculateArea = (shape: Shape) => {
  if (shape.kind === 'rectangle') {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
};

//--------------------------------------------------------

/*
    string 또는 number 타입인 값을 항상 number로 정제하는 경우를 가정
    다음 방법은 타입 체커를 통과하지만 잘못된 방법을 사용했다
*/

const asNumber = (val: number | string): number => {
  return val as number;
};

// 위 함수가 자바스크립트 코드로 변환되면
// const asNumber = val => val;

// => as number는 타입 연산이고 런타임 동작에는 아무런 영향 X
// => 타입 연산은 정제를 위한 목적으로 사용하게 되었을 때 의미 X

// -----------------------------------------------------------------------

/*
    런타임 타입은 선언된 타입과 다를 수 있다
    다음 함수를 보고 마지막의 console.log까지 실행될 수 있을지 생각해보자
*/

function turnLightOn() {}
function turnLightOff() {}

function setLightSwitch(value: boolean) {
  switch (value) {
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOff();
      break;
    default:
      console.log('실행되지 않았음');
  }
}

interface LightApiResponse {
  lightSwitchValue: boolean;
}

async function setLight() {
  const response = await fetch('/light');
  const result: LightApiResponse = await response.json();
  setLightSwitch(result.lightSwitchValue);
}

/*
    /light를 요청하면 그 결과로 LightApiResponse를 반환하라고 선언했지만,
    실제로 그렇게 되리라는 보장은 없음

    API를 잘못 파악해서 lightSwitchValue가 실제로는 문자열이었다면?
        -> 런타임에는 setLightSwitch 함수까지 전달될 것

    => 타입스크립트에서는 런타임 타입과 선언된 타입이 맞지 않을 수 있다
       그렇지만, 타입이 달라지는 혼란스러운 상황을 가능한 한 피해야 할 것

       * 선언된 타입이 언제든지 달라질 수 있다는 것을 명심해야 한다
*/

// ---------------------------------------------------------------------------

/*
    타입스크립트 타입으로는 함수를 오버로딩할 수 없다.
    
    * 타입스크립트가 함수 오버로딩 기능을 지원하기는 하지만, 온전히 타입 수준에서만 동작
        -> 하나의 함수에 대해 여러 개의 선언문을 작성할 수 있지만, 구현체는 오직 하나뿐
*/

// function add(a: number, b: number): number;
// function add(a: string, b: string): string;

// -> 자바스크립트로 변환되면
function add(a, b) {
  return a + b;
}

/*
    타입스크립트가 자바스크립트로 변환되면서 제거되며, 구현체만 남게 됨
*/

//---------------------------------------------------------------------------------------

// 구조적 타이핑에 익숙해지기

interface Vector2D {
  x: number;
  y: number;
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

// 이제 이름이 들어간 벡터 추가
interface NamedVector {
  name: string;
  x: number;
  y: number;
}

const v: NamedVector = { x: 3, y: 4, name: 'Zee' };
// NamedVector에는 x와 y 속성이 있기 때문에 calculateLength 함수로 호출 가능
calculateLength(v); // 정상, 결과: 5

/*
    Vector2D와 NamedVector의 관계를 전혀 선언 X ---> ???

    타입스크립트 타입 시스템은 자바스크립트의 런타임 동작을 모델링한다.
    NamedVector의 구조가 Vector2D와 호환되기 때문에 calculateLength 호출이 가능

    -> 구조적 타이핑(structural typing)

    다만 구조적 타이핑 때문에 문제가 발생하기도 하는데...
*/

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

// 벡터의 길이를 1로 만드는 정규화 함수
function normalize(v: Vector3D) {
  const length = calculateLength(v);
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  };
}

normalize({ x: 3, y: 4, z: 5 }); // { x: 0.6, y: 0.8, z: 1 }

/*
    타입스크립트가 오류를 잡아내지 못한 이유...?

    calculateLength는 2D 벡터를 기반으로 연산하는데, 버그로 인해 normalize가 3D 벡터로 연산되었음
      -> z가 정규화에서 무시된 것

    => 그런데 타입 체커가 이 문제를 잡아내지 못했음

    Vector3D와 호환되는 { x, y, z } 객체로 calculateLength를 호출하면,
    구조적 타이핑 관점에서 x와 y가 있어서 Vector2D와 호환된다.
    따라서 오류가 발생하지 않았고, 타입 체커가 문제로 인식 X

      -> 이런 경우를 오류로 처리하기 위한 설정이 존재하기는 함

    함수를 작성할 때, 호출에 사용되는 매개변수의 속성들이 매개변수의 타입에 선언된 속성만을 가질 거라 생각하기 쉽다.
    
      -> 타입스크립트의 타입은 열려(open)있다.

      이러한 특성 때문에 당황스러운 결과가 발생하기도...
*/

// function calculateLength1(v: Vector3D) {
//   let length = 0;
//   for (const axis of Object.keys(v)) {
//     const coord = v[axis]; // coord는 암시적으로 any 타입

//     length += Math.abs(coord);
//   }
//   return length;
// }

/*
    axis는 Vector3D 타입인 v의 키 중 하나이기 때문에 "x", "y", "z" 중 하나여야 한다.
    그리고 Vector3D의 선언에 따르면, 이들은 모두 number이므로 coord의 타입이 number가 되어야 할 것으로 예상

    하지만 타입스크립트가 오류를 정확히 찾아낸 것이 맞음 !!!!
*/

const vec3D = { x: 3, y: 4, z: 1, address: '123 Broadway' };
calculateLength1(vec3D); // 정상, NaN을 반환

/*
    위와 같이 v에는 어떤 속성이든 가질 수 있기 때문에, axis 타입은 string이 될 수도 있음
    그러므로 앞서 본 것처럼 타입스크립트는 v[axis]가 어떤 속성이 될지 알 수 없기 때문에 number라고 확정 X

    🟢 따라서 이번 경우에는 루프보다는 모든 속성을 각각 더하는 구현이 더 낫다
*/

function calculateLength1(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}

// ---------------------------------------------------------------------------------------------------------------------

// any 타입 지양하기

let age: number;
// age = '12'; // error
age = '12' as any; // OK

// -----------------------------------------------------------------------------------------------------------------------

// any는 함수 시그니처를 무시한다
function calculateAge(birthDate: Date): number {
  return 0;
}

let birthDate: any = '1990-01-10';
calculateAge(birthDate); // 정상

/*
    birthDate 매개변수는 string이 아닌 Date 타입이어야 하지만,
    any 타입을 사용하면 함수의 시그니처를 무시하게 된다.
*/

// --------------------------------------------------------------------------------------------------------------------

// any 타입에는 언어 서비스가 적용 X

interface Person {
  first: string;
  last: string;
}

const formatName = (p: Person) => `${p.first} ${p.last}`;
// const formatNameAny = (p: any) => `${p.}`

// ----------------------------------------------------------------------------------------------------------------------

// any 타입은 코들 리팩토링 때 버그를 감춘다

/*
    선택하려는 아이템의 타입이 무엇인지 알기 어려우니 일단 any를 사용한다고 해보자
*/

// interface ComponentProps {
//   onSelectItem: (item: any) => void;
// }

/*
    다음과 같이 onSelectItem 콜백이 있는 컴포넌트를 사용하는 코드도 있을 것
*/

function renderSelector(props: ComponentProps) {
  // ...
}

let selectedId: number = 0;

function handleSelectItem(item: any) {
  selectedId = item.id;
}

renderSelector({ onSelectItem: handleSelectItem });

/*
    onSelectItem에 아아템 객체를 필요한 부분만 전달하도록 컴포넌트를 개선해보자
    여기서는 id만 필요... ComponentProp의 시그니처를 다음처럼 변경
*/

interface ComponentProps {
  onSelectItem: (id: number) => void;
}

/*
    컴포넌트를 수정하고, 타입 체크도 통과
    그렇지만, handleSelectItem은 any 매개변수를 받는다.

    따라서 id를 전달받아도 문제가 없다고 나온다..

      => 타입 체커를 통과함에도 불구하고, 런타임에는 오류가 발생할 것

      => any가 아니라 구체적인 타입을 사용했다면, 타입 체커가 오류를 발견했을 것..
*/
