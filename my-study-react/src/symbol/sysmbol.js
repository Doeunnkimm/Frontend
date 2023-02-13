const symbol = Symbol();
const hello = Symbol('Hello');

console.log(Symbol() === symbol); // false
console.log(Symbol() === Symbol()); // false
console.log(Symbol('Hello') === hello); // false

const TYPE = Symbol('타입');
const FALVOR = Symbol('맛');

const icecream = {
  [TYPE]: '아이스크림',
  [FALVOR]: 'Chocolate',
  price: 3500,
};

const cupcake = {
  [TYPE]: '컵케이크',
  [FALVOR]: 'Vanilla',
  price: 5700,
};

console.log(icecream[FALVOR], cupcake[FALVOR]); // Chocolate Vanilla

for (let i in icecream) {
  console.log(`${i} : ${icecream[i]}`);
}

for (let c in cupcake) {
  console.log(`${c} : ${cupcake[c]}`);
}

Object.getOwnPropertySymbols(icecream).forEach((i) =>
  console.log(i, icecream[i])
);

Reflect.ownKeys(icecream).forEach((i) => console.log(i, icecream[i]));
