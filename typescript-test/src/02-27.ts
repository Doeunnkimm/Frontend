function arrayConcat(items1: any[], items2: any[]): any[] {
  return items1.concat(items2);
} // any 타입의 인자를 전달하는 함수

let arr1 = arrayConcat([10, 20, 30], ["a", "b", 40]);
arr1.push(true); // 어떤 값이라도 추가할 수 있음

// 이 방법의 문제점
// 배열의 아이템으로 문자열이든 숫자든 아무 값이나 추가할 수 있다는 점
// 이때 제네릭(generic)을 사용하면 일관된 타입의 값을 처리할 수 있음
