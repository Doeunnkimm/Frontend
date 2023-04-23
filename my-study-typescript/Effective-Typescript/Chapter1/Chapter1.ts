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
