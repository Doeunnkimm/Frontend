export type Heroes = 'Hulk' | 'Capt' | 'Thor';

// 기존에 존재하는 타입을 가지고
// mapped type의 문법을 이용해서 새로운 타입으로 변환하는 것
type HeroAges = {
  [K in Heroes]: number;
};

const ages: HeroAges = {
  Hulk: 22,
  Capt: 25,
  Thor: 30,
};
