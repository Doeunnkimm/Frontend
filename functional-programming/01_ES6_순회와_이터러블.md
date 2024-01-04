## 기존과 달라진 ES6에서의 순회

- for i++
- for of

  ```js
  // es5
  const list = [1, 2, 3]
  for (var i = 0; i < list.length; i++) {
    console.log(list[i])
  }

  const str = 'abc'
  for (var i = 0; i < str.length; i++) {
    console.log(list[i])
  }
  ```

  ```js
  // es6
  // 보다 선언적으로 순회하는 형태
  for (const a of list) {
    console.log(a)
  }

  for (const a of str) {
    console.log(a)
  }
  ```

### Array를 통해 알아보기

```js
const arr = [1, 2, 3]
for (const a of arr) {
  console.log(a)
}
```

### Set을 통해 알아보기

```js
const set = new Set([1, 2, 3])
for (const a of arr) {
  console.log(a)
}
```

### Map을 통해 알아보기

```js
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
])
for (const a of arr) {
  console.log(a)
}
```

### for of는 어떻게 추상화 되어 있을까

- `Symbol.iterator`은 es6에서 추가된 심볼
- 이 Symbol은 어떤 객체의 키로 사용될 수 있다.

  ```js
  arr[Symbol.iterator] // f values() { [native code] }
  set[Symbol.iterator] // f values() { [native code] }
  map[Symbol.iterator] // f values() { [native code] }
  ```

  이 값이 null이라면 순회를 하지 못한다.

## 이터러블 / 이터레이터 프로토콜

- 이터러블: 이터레이터를 리턴하는 `[Symbol.iterator]()`를 가진 값
  ```js
  let iterator = arr[Symbol.iterator]() // 이터레이터를 리턴
  ```
- 이터레이터: `{ value, done }` 객체를 리턴하는 `next()`를 가진 값
  ```js
  iterator.next()
  // { value: 1, done: false }
  iterator.next()
  // { value: 2, done: false }
  iterator.next()
  // { value: 3, done: false }
  iterator.next()
  // { value: undefined, done: true }
  ```
- 이터러블 / 이터레이터 프로토콜: 이터러블을 `for...of`, 전개 연산자 등과 함께 동작하도록 한 규약

### 사용자 정의 이터러블을 통해 알아보기

```js
const iterable = {
  [Symbol.iterator]() {
    let i = 3
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false }
      },
      [Symbol.iterator]() {
        return this
      }, // 이전까지 진행했던 자신의 상태에서 next를 할 수 있도록 -> iterator가 iterable할 수 있도록
    }
  },
}

let iterator = iterable[Symbol.iterator]()
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 1, done: false }
iterator.next() // { done: true }

for (const a of iterable) console.log(a)

const arr2 = [1, 2, 3]
let iter2 = arr2[Symbol.iterator]()
iter2.next() // 일부 진행
for (const a of iter2) console.log(a) // 2 3
```

- es6에서 지원하는 값만 이 프로토콜을 따르는 것이 아니다.
- 자바스크립트에서 순회가 가능한 값이라면 이 프로토콜을 따른다.

  ```js
  for (const a of document.querySelectorAll('*')) console.log(a) // 가능

  const all = document.querySelectorAll('*')
  all[Symbol.iterator] // 배열이여서가 아니라 Symbol iterator가 구현이 되어 있기 때문이다.
  ```

## 전개 연산자

```js
const a = [1, 2]
console.log(...a) // 1 2
console.log([...a, ...[3, 4]]) // [1, 2, 3, 4]
```

- 전개 연산자 역시 이터러블 프로토콜을 따르고 있는 값들을 펼칠 수 있는 것

```js
;[...a, ...arr, ...set, ...map] // [1, 2, 1, 2, 3, 1, 2, 3, Array(2), Array(2)]
```
