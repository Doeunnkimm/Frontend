interface Circle {
  type: 'circle';
  radius: number;
}

interface Square {
  type: 'square';
  side: number;
}

type Shape = Circle | Square;

// shape는 무조건 Circle로 놓고
// 타입가드에서 사용 --> is in typeof
// -> 타입 가드를 통해 자동완성이 되도록 하는 것
function isCircle(shape: Shape): shape is Circle {
  return shape.type === 'circle';
}

function getArea(shape: Shape): number {
  // 원래는 런타임 때 타입을 추론하는데
  // 런타임 이전에 타입을 가드하기 위해
  if (isCircle(shape)) {
    // 해당 블록에 들어왔다는 건 shape가 Circle이라는 것이므로
    // 해당 블록에서 shape. 하게 되면 Circle과 관련된 함수만 자동완성으로 뜨게 됨
    return Math.PI * shape.radius * shape.radius;
  } else {
    return shape.side * shape.side;
  }
}

function print(name: string | number) {
  if (typeof name === 'string') {
    console.log(name.toLowerCase());
  } else {
    console.log(name.toString());
  }
}

const Form = {
  login: 'login',
  sign: 'sign',
} as const;
type FromType = keyof typeof Form;

const onFormChange = (e: MouseEvent) => {
  const { innerText } = e.target as HTMLElement;
  if (innerText in Form) {
    // innerText가 Form에 해당되어야 만
    // setFrom(innerText.toLowerCase() as FromType)
  }
  return alert('에러가 발생했습니다.');
};

/*

    타입 가드는 코드의 가독성을 높이고 코드의 흐름을 명확하게 표현하며
    변수의 타입을 보다 안정적으로 보장할 수 있는 방법

    특정 조건을 만족하는 경우 타입을 변경하도록 정의
    이를 통해 타입이 런타임에서 변경되는 것을 방지할 수 있음

    * 안정성 !!
   예를 들면 함수의 매개변수는 타입이 보장되어 있지 않음
   함수 내에서 분기점으로 인해 다양하게 사용이 가능
   이 경우 타입 내에서 해당 매개변수의 타입의 정확한 타입을 보장하여

   개발의 안정성을 실습하기 위해 사용

*/
