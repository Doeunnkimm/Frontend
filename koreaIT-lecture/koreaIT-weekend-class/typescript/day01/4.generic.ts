/*
    Generics
        타입을 인자로 받아서 여러 곳에서 사용할 수 있는 타입이나 함수를 말함

        예를 들어 제네릭이 없다면

        function f1 (a: number, b: number): number[] {
            return [a, b]
        }

        function f2 (a: string, b: string): string[] {
            return [a, b]
        }

        결론은 제네릭을 사용하면 여러 개의 함수에서 비슷한 로직을 수행할 때
        코드의 중복을 없애고 더욱 안정된 상황에서 개발이 가능하다

        타입의 유연성을 높인다.
        매개변수와 반환값을 타입을 동적으로 설정해야할 때
*/

// const checkNull = (arg: number | null): number | null => {
//   if (arg) throw new Error('값이 비어있습니다.'); // console.error()
//   return arg;
// };

const checkNullG = <T>(arg: T): T => {
  if (arg) throw new Error('값이 비어있습니다.'); // console.error()
  return arg;
};

// 제네릭으로 넣은 타입에 맞게 리턴받은 해당 변수에는 그 타입이 적용되어 있음
// 그래서 그 제네릭 타입에 맞는 함수들을 자동완성으로 볼 수 있음
const result1 = checkNullG('abc');
const result2 = checkNullG(123);
const result3 = checkNullG([1, 2, 3, 4, 5]);
const result4 = checkNullG({ name: '김성용', age: 20 });

// 상속도 가능
type User = {
  name: '김성용';
};

const checkNullG2 = <T extends User>(arg: T): T => {
  if (!arg) throw new Error('값이 비어있습니다.'); // console.error()
  console.log(arg.name); // type을 상속받는 다면 함수 내에서도 자동완성도 가능
  return arg;
};
