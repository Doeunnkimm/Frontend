/** unknown 타입 */
let a: any = 123; // 'any' 타입 --> 모든 가능한 데이터 유형을 포함
let b: unknown = 456; // 'unknown' 타입

let c: string = a; // 'a'는 모든 유형을 포함하고 있으므로, 작동
// let d: string = b; // 에러: 'unknown' 유형은 'string' 타입에 할당 X

// 따라서 변수 b를 사용하기 위해서는 다음과 같은 방법으로 타입을 검사하거나 타입 단언을 수행해야 함
if (typeof b === 'string') {
  let e: string = b; // b의 타입은 'string'
}

let f: string = b as string; // 'b', 'string'은 모두 'unknown' 유형이므로 타입 단언이 필요

// ⭐ unknown 타입은 any 타입보다 더 염격하게 타입 검사를 적용
//    좀 더 안전한 코드 작성을 도와주는 타입
