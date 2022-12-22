function arrayConcat2<T>(items1: T[], items2: T[]): T[] {
  return items1.concat(items2);
} // 제네릭을 적용할 함수

let arr2 = arrayConcat2<number>([10, 20, 30], [40, 50]);
// arr2.push("hello"); // arr2는 number[] 형식이므로 명시적 에러 발생

// 제네릭 타입을 number로 지정하여 호출했기 때문에 전달되는 인자와 리턴값 모두 number[] 형식이다.
// 따라서 arr2.push("hello")와 같이 number가 아닌 다른 형식의 값을 추가하는 것을 허용하지 않는다.
