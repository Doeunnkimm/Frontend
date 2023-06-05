/**
 * 💎 아이템 53. 타입스크립트 기능보다는 ECMAScript 기능을 사용하기
 *
 *  1. 열거형(enum)
 *      열거형 보다는 리터럴 타임의 유니온을 사용하자
 */

// 1. 열거형(enum)
// enum Flavor {
//   VANILLA = 0,
//   CHOCOLATE = 1,
//   STRAWBERRY = 2,
// }

// let flavor = Flavor.CHOCOLATE; // 타입이 Flavor

// enum Flavor {
//   VANILLA = 'vanilla',
//   CHOCOLATE = 'chocolate',
//   STRAWBERRY = 'strawberry',
// }

// let flavor = Flavor.CHOCOLATE; // 타입이 Flavor
// flavor = 'strawberry';
// ~~~~~~ '"strawberry"' 형식은 'Flavor' 형식에 할당할 수 없습니다.
// --> 명목적 타이핑 때문에

type Flavor = 'vanilla' | 'chocolate' | 'strawberry';

let flavor: Flavor = 'chocolate';
flavor = 'vanilla';
// flavor = 'mint chip';
// ~~~~~~'"mint chip"' 형식은 'Flavor' 형식에 할당할 수 없습니다.
