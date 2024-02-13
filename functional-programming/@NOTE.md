## 이터러블 프로토콜

- `iterable protocol` 은 JavaScript 객체들이, 예를 들어 for..of 구조에서 어떠한 value 들이 loop 되는 것과 같은 iteration 동작을 정의하거나 사용자 정의하는 것을 허용
- iterable 하기 위해서 object는 @@iterator 메소드를 구현해야 한다.
- 이것은 object가 `Symbol.iterator` **key** 의 속성을 가져야 한다는 것을 의미 → object가 `[Symbol.iterator]` 라는 프로퍼티를 가져야 함

```
[Symbol.iterator] : object를 반환하는, arguments 없는 function. iterator protocol 을 따른다.
```

- 어떠한 객체가 반복(Iterate)되어야 한다면
- 이 객체의 @@iterator 메소드가 인수없이 호출되고, 반환된 iterator는 반복을 통해서 획득할 값들을 얻을 때 사용된다.
- iterator protocol 은 value( finite 또는 infinite) 들의 sequence 를 만드는 표준 방법을 정의한다.
- 객체가 next() 메소드를 가지고 있고, 아래의 규칙에 따라 구현되었다면 그 객체는 iterator이다.

```
next()

아래 2개의 속성들을 가진 object 를 반환하는 arguments 없는 함수 :

1. done (boolean)
   Iterator(반복자)가 마지막 반복 작업을 마쳤을 경우 true. 만약 iterator(반복자)에 return 값이 있다면 value의 값으로 지정된다. 반환 값에 대한 설명은 여기.
   Iterator(반복자)의 작업이 남아있을 경우 false. Iterator(반복자)에 done 프로퍼티 자체를 특정짓지 않은 것과 동일하다.
2. value
    Iterator(반복자)으로부터 반환되는 모든 자바스크립트 값이며 done이 true일 경우 생략될 수 있다.
```

### 이터러블 프로토콜 사용 예시

- String 은 built-in iterable 객체의 한 예시이다.

  ```js
  var someString = 'hi'
  typeof someString[Symbol.iterator]
  // "function"
  ```

- String 의 기본 iterator 는 string 의 문자를 하나씩 반환한다.

  ```js
  var iterator = someString[Symbol.iterator]()
  iterator + ''
  // "[object String Iterator]"

  iterator.next()
  // { value: "h", done: false }

  iterator.next()
  // { value: "i", done: false }

  iterator.next()
  // { value: undefined, done: true }
  ```
