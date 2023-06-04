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
