```js
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]
```

## map

```js
// 명령형
let names = []
for (const p of products) {
  names.push(p.name)
}
console.log(names) // ["반팔티", "긴팔티", "핸드폰케이스", "후드티", "바지"]
```

```js
// 함수형 프로그래밍에서는 인자와 반환값으로 소통하는 것을 권장한다.
const map = (f, iter) => {
  // 어떤 값을 받을건지는 f에게 완전히 위임
  let res = []
  for (const a of iter) {
    names.push(f(p))
  }
  return res
}

map((p) => p.name, products) // ["반팔티", "긴팔티", "핸드폰케이스", "후드티", "바지"]
```

- 함수형 프로그래밍에서는 **보조함수**를 통해서 동작을 전달
- map 함수는 **고차함수**
  - 함수를 값으로 다루면서, 원하는 시점에 안에서 인자를 적용하는 함수

## 이터러블 프로토콜을 따른 map의 다형성

- 위 map 함수는 이터러블 프로토콜을 따르기 때문에 다형성이 굉장히 높다.

```js
document.querySelectorAll('*') // NodeList(7) [html, head, script, script, body, script, script]
// 위 값이 배열 같아 보이지만 map으로 수집이 불가능하다.
document.querySelectorAll('*').map((el) => el.nodeName) // error
document.querySelectorAll('*').map // undefined

// 이유는 document.querySelectAll는 Array를 상속받은 객체가 아니기 때문
// 즉, 프로토타입에 map 함수가 구현이 되어 있지 않다.

// 그런데 위에서 우리가 만든 map 함수를 사용하면 가능하다
map((el) => el.nodeName, document.querySelectorAll('*')) // ["HTML", "HEAD", "SCRIPT", "SCRIPT", "BODY", "SCRIPT", "SCRIPT"]
// 그 이유는, document.querySelectorAll이 이터러블 프로토콜을 따르고 있기 떄문이다.
const it = document.querySelectorAll('*')[Symbol.iterator]()
console.log(it) // Array Iterator {}

function* gen() {
  yield 2
  yield 3
  yield 4
}
console.log(map((a) => a * a, gen())) // [4, 9, 16]
```

```js
let m = new Map()
m.set('a', 10)
m.set('b', 20)
const it = m[Symbol.iterator]()
it.next() // { value: ['a', 10], done: false }
it.next() // { value: ['b', 20], done: false }

map(([k, a]) => [k, a * 2], m) // [['a', 20], ['b', 40]]
```

## filter

```js
// 명령형
let under20000 = []
for (const p of products) {
  if (p.price < 20000) under20000.push(p)
}
log(under0000) // [{ name: '반팔티', price: 15000 }, { name: '핸드폰케이스', price: 15000 }]

// 함수형으로 리팩터링
const filter = (f, iter) => {
  let res = []
  for (const a of iter) {
    if (f(a)) res.push(a)
  }
  return res
}
filter((p) => p.price < 20000, products)
```

## reduce

```js
// 명령형
const nums = [1, 2, 3, 4, 5]
let total = 0
for (const n of nums) {
  total = total + n
}
console.log(total) // 15

// 함수형
const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  }
  for (const a of iter) {
    acc = f(acc, a)
  }
  return acc
}
const add = (a, b) => a + b
reduce(add, 0, [1, 2, 3, 4, 5]) // 15

// acc 부분을 optional하게
// 넘긴 iter의 첫 번째 요소를 초기값으로 가진다
reduce(add, [1, 2, 3, 4, 5]) // === reduce(add, 1, [2, 3, 4, 5])
```

```js
reduce((total_price, product) => total_price + product.price, 0, products) // 105000
```

## map + filter + reduce 중첩 사용과 함수형 사고

```js
// 가격을 뽑는 map 함수
map((p) => p.price, products)
// 근데 2만원 미만의 상품들만 뽑고 싶다면
map(
  (p) => p.price,
  filter((p) => p.price < 20000, products)
)
// 근데 2만원 미만의 상품들의 가격을 다 합치고 싶다면
const add = (a, b) => a + b
reduce(
  add,
  map((p) => p.price),
  filter((p) => p.price < 20000, products)
)
```
