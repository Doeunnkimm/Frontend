# 7장 코드를 작성하고 실행하기

- 7장에서는 타입과 관계는 없지만 코드를 작성하고 실행하면서 실제로 겪을 수 있는 문제를 다룬다.

---

## 🚩 아이템 53. 타입스크립트 기능보다는 ECMAScript 기능을 사용하기

- 타입스크립트가 태동하던 2010년 경, 자바스크립트는 결함이 많고 개선해야 할 부분이 많은 언어였다.
- 그리고 클래스, 데코레이터, 모듈 시스템 같은 기능이 없어서 프레임워크나 트랜스파일러로 보완하는 것이 일반적인 모습이었다.
- 그렇기 때문에 타입스크립트도 초기 버전에는 독립적으로 개발한 클래스, 열거형(enum), 모듈 시스템을 포함시킬 수밖에 없었다.
- 시간이 흐르며 TC39(자바스크립트를 관장하는 표준 기구)는 부족했던 점들을 대부분 내장 기능으로 추가했다.
- 그러나 자바스크립트에 새로 추가된 기능은 타입스크립트 초기 버전에서 독립적으로 개발했던 기능과 호환성 문제를 발생시켰다.
- 그렇기에 타입스크립트 전영에서는 다음 전략 중 하나를 선택해야 했다.
- 한 가지 전략은 타입스크립트 초기 버전의 형태를 유지하기 위해 자바스크립트 신규 기능을 변형해서 끼워 맞추는 것이다.
- 또 다른 전략은 자바스크립트의 신규 기능을 그대로 채택하고 타입스크립트 초기 버전과 호환성을 포기하는 것이다.

<br>

- 타입스크립트 팀은 대부분 두 번째 전략을 선택했다.
- 결국 TC39는 런타임 기능을 발전시키고, 타입스크립트 팀은 타입 기능만 발전시킨다는 명확한 원칙을 세우고 현재까지 지켜오고 있다.

<br>

- 그런데 이 원칙이 세워지기 전에, 이미 사용되고 있던 몇 가지 기능이 있다.
- 이 기능들은 타입 공간(타입스크립트)과 값 공간(자바스크립트)의 경계를 혼란스럽게 만들기 때문에 사용하지 않는 것이 좋다.
- 여기서는 피해야 하는 기능을 몇 가지 살펴볼 것이다.
- 그리고 불가피하게 이 기능을 사용하게 될 경우 어떤 점을 유의해야 호환성 문제를 일으키지 않는지 알아보자.

<br>

**✔️ 열거형(enum)**

- 많은 언어에서 몇몇 값의 모음을 나타내기 위해 열거형을 사용한다.
- 타입스크립트에서도 열거형을 사용할 수 있다.

  ```typescript
  enum Flavor = {
      VANILLA = 0,
      CHOCOLATE = 1,
      STRAWBERRY = 2,
  }

  let flavor = Flavor.CHOCOLATE; // 타입이 Flavor

  Flavor // 자동 완성 추천: VANILLA, CHOCOLATE, STRAWBERRY
  Flavor[0]; // 값이 "VANILLA"
  ```

- 단순히 값을 나열하는 것보다 실수가 적고 명확하기 때문에 일반적으로 열거형을 사용하는 것이 좋다.
- 그러나 타입스크립트의 열거형은 몇 가지 문제가 있다.
- 타입스크립트의 열거형은 다음 목록처럼 상황에 따라 다르게 동작한다.
  1. 숫자 열거형(앞 예제의 Flavor)에 0, 1, 2 외의 다른 숫자가 할당되면 매우 위험하다. (이 방법은 원래 비트 플래그 구조를 표현하기 위해 설계되었다.)
  2. 상수 열거형은 보통의 열거헝과 달리 런타임에 완전히 제거된다. 앞의 예제를 `const enum Flavor`로 바꾸면, 컴파일러는 `Flavor.CHOCOLATE`을 `0`으로 바꿔 버린다.
  3. `preserveConstEnums` 플래그를 설정한 상태의 상수 열거형은 보통의 열거형처럼 런타임 코드에 상수 열거형 정보를 유지한다.
  4. 문자열 열거형은 런타임의 타입 안전성과 투명성을 제공한다. 그러나 타입스크립트의 다른 타입과 달리 구조적 타이핑이 아닌 명목적 타이핑을 사용한다.

<br>

- 타입스크립트의 일반적인 타입들이 할당 가능성을 체크하기 위해서 구조적 타이핑을 사용하는 반면, 문자열 열거형은 명목적 타이핑(nominally typing)을 사용한다.

  ```typescript
  enum Flavor {
    VANILLA = 'vanilla',
    CHOCOLATE = 'chocolate',
    STRAWBERRY = 'strawberry',
  }

  let flavor - Flavor.CHOCOLATE; // 타입이 FLAVOR
  flavor = 'strawberry';
  //~~~~~ '"strawberry"' 형식은 'Flavor' 형식에 할당될 수 없습니다.
  ```

- 명목적 타이핑은 라이브러리를 공개할 때 필요하다.
- Flavor를 매개변수로 받는 함수를 가정해 보자.
  ```typescript
  function scoop(flavor: Flavor) {
    /* ... */
  }
  ```
- Flavor는 런타임 시점에는 문자열이기 때문에, 자바스크립트에서 다음처럼 호출할 수 있다.
  ```javascript
  scoop('vanilla'); // 자바스크립트에서 정상
  ```
- 그러나 타입스크립트에서는 열거형을 임포트하고 문자열 대신 사용해야 한다.
  ```typescript
  scoop('vanilla');
  //    ~~~~~~~~~~` '"vanilla"' 형식은 'Flavor' 형식의 매개변수에 할당될 수 없습니다.
  import { Flavor } from 'ice-cream';
  scoop(Flavor.VANILLA); // 정상
  ```
- 이처럼 자바스크립트와 타입스크립트에서 동작이 다르기 때문에 문자열 열거형은 사용하지 않는 것이 좋다.
<p align="center"><strong>⭐ 열거형 대신 리터럴 타입의 유니온을 사용하면 된다 ⭐</strong></p>

- 코드로 살펴보자.

  ```typescript
  type Flavor = 'vanilla' | 'chocolate' | 'strawberry';

  let flavor: Flavor = 'chocolate'; // 정상
  flavor = 'mint chip';
  //~~~~ '"mint chip"' 유형은 'Flavor' 유형에 할당될 수 없습니다.
  ```

- 리터럴 타입의 유니온은 열거형만큼 **안전**하며 **자바스크립트와 호환되는 장점**이 있다.
- 그리고 편집기에서 열거형처럼 자동완성 기능을 사용할 수 있다.

<br>

**✔️ 매개변수 속성**

- 일반적으로 클래스를 초기화할 때 속성을 할당하기 위해 생성자의 매개변수를 사용한다.
  ```typescript
  class Person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  ```
- 타입스크립트는 더 간결한 문법을 제공한다.
  ```typescript
  class Person {
    constructor(public name: string) {}
  }
  ```
- 예제의 `public name`은 '매개변수 속성'이라고 불리며, 멤버 변수로 name을 선언한 이전 예제와 동일하게 동작한다.
- 그러나 매개변수 속성과 관련된 몇 가지 문제점이 존재한다.

  1. 일반적으로 타입스크립트 컴파일은 타입 제거가 이루어지므로 코드가 줄어들지만, 매개변수 속성은 코드가 늘어나는 문법이다.
  2. 매개변수 속성이 런타임에는 실제로 사용되지만, 타입스크립트 관점에서는 사용되지 않는 것처럼 보인다.
  3. 매개변수 속성과 일반 속성을 섞어서 사용하면 클래스의 설계가 혼란스러워진다.
     <br>

- 문제점들에 대한 예를 들어 보겠다.
  ```typescript
  class Person {
    first: string;
    last: string;
    constructor(public name: string) {
      [this.first, this.last] = name.split(' ');
    }
  }
  ```
- Person 클래스에는 세 가지 속성(first, last, name)이 있지만, first와 last만 속성에 나열되어 있고 name은 매개변수 속성에 있어서 일관성이 없다.

<p align="center"><strong>클래스에 매개변수 속성만 존재한다면 <br /> 클래스 대신 인터페이스로 만들고 객체 리터럴을 사용하는 것이 좋다</strong></p>

- 구조적 타이핑 특성 때문에 다음 예제처럼 할당할 수 있다는 것을 주의해야 한다.
  ```typescript
  class Person {
    constructor(public name: string) {}
  }
  const p: Person = { name: 'Jed Bartlet' }; // 정상
  ```
- 매개변수 속성을 사용하는 것이 좋은지에 대해서는 찬반 논란이 있다.
- 매개변수 속성은 타입스크립트의 다른 패턴들과 이질적이고, 초급자에게 생소한 문법이라는 것을 기억해야 한다.
- 또한 매개변수 속성과 일반 속성을 같이 사용하면 설계가 혼란스러워지기 때문에 한 가지만 사용하는 것이 좋다.

<br>

**✔️ 네임스페이스와 트리플 슬래시 임포트**

- ECMAScript 2015 이전에는 자바스크립트에 공식적인 모듈 시스템이 없었다.
- 그래서 각 환경마다 자신만의 방식으로 모듈 시스템을 마련했다.
- Node.js는 require와 module.exports를 사용한 반면, AMD는 define 함수와 콜백을 사용했다.
- 타입스크립트 역시 자체적으로 모듈 시스템을 구축했고, module 키워드와 '트리플 슬래시' 임포트를 사용했다.
- ECMAScript 2015가 공식적으로 모듈 시스템을 도입한 이후, 타입스크립트는 **충돌을 피하기 위해** module과 같은 기능을 하는 **namespace 키워드를 추가**했다.

  ```typescript
  namespace foo {
    function bar() {}
  }

  /// <reference path="other.ts" />
  foo.bar();
  ```

- 트리플 슬래시 임포트와 module 키워드는 호환성을 위해 남아 있을 뿐이며, 이제는 ECMAScript 2015 스타일의 모듈(import와 export)을 사용해야 한다.

<br>

**✔️ 데코레이터**

- 데코레이터는 클래스, 메서드, 속성에 애너테이션(annotation)을 붙이거나 기능을 추가하는 데 사용할 수 있다.
- 예를 들어, 클래스의 메서드가 호출될 때마다 로그를 남기려면 logged 애너테이션을 정의할 수 있다.

  ```typescript
  class Greeter {
    greeting: string;
    constructor(message: string) {
      this.greeting = message;
    }
    @logged
    greet() {
      return 'Hello, ' + this.greeting;
    }
  }

  function logged(target: any, name: string, description: PropertyDescriptor) {
    const fn = target[name];
    descriptor.value = function () {
      console.log(`Calling ${name}`);
      return fn.apply(this, arguments);
    };
  }

  console.log(new Greeter('Dave').greet());
  // 출력:
  // Calling greet
  // Hello, Dave
  ```

- 데코레이터는 처음에 앵귤러 프레임워크를 지원하기 위해 추가되었으며 `tsconfig.json`에 `experimentalDecorators` 속성을 설정하고 사용해야 한다.
- 현재까지도 표준화가 완료되지 않았기 때문에, 사용 중인 데코레이터가 비표준으로 바뀌거나 호환성이 깨질 가능성이 있다.
- 앵귤러를 사용하거나 애너테이션이 필요한 프레임워크를 사용하고 있는 게 아니라면, 데코레이터가 표준이 되기 전에는 타입스크립트에서 데코레이터를 사용하지 않는 게 좋다.

---

## 🚩 아이템 54. 객체를 순회하는 노하우

- 다음 예제는 정상적으로 실행되지만, 편집기에서는 오류가 발생한다.
- 오류의 원인은 무엇일까?
  ```typescript
  const obj = {
    one: 'uno',
    two: 'dos',
    three: 'tres',
  };
  for (const k in obj) {
    const v = obj[k];
    //        ~~~~~~~ obj에 인덱스 시그니처가 없기 때문에
    //                엘리먼트는 암시적으로 'any' 타입입니다.
  }
  ```
- 코드를 수정해 가며 원인을 찾다 보면 obj 객체를 순회하는 루프 내의 상수 k와 관련된 오류라는 것을 알 수 있다.

  ```typescript
  const obj = {
    /* ... */
  };
  // const obj = {
  //   one: 'uno',
  //   two: 'dos',
  //  three: 'tres',
  // };
  for (const k in obj) {
    // const k: string
    // ...
  }
  ```

- k의 타입은 string인 반면, obj 객체에는 'one', 'two', 'three' 세 개의 키만 존재한다.
<p align="center"><strong>⭐ k와 obj 객체의 키 타입이 서로 다르게 추론되어 오류가 발생한 것이다 ⭐</strong></p>

- k의 타입을 더욱 구체적으로 명시해 주면 오류는 사라진다.
  ```typescript
  let k: keyof typeof obj; // "one" | "two" | "three" 타입
  for (k in obj) {
    const v = obj[k]; // 정상
  }
  ```
- 아이템 54의 첫 번째 문장의 질문(오류의 원인은 무엇일까요?)을 좀 더 구체적으로 바꿔보자.
- 첫 번째 에외의 k 타입이 "one" | "two" | "three"가 아닌 string으로 추론된 원인은 무엇일까?
- 이해를 돕기 위해, 인터페이스와 함수가 가미된 다른 예제를 보자.

  ```typescript
  interface ABC {
    a: string;
    b: string;
    c: string;
  }

  function foo(abc: ABC) {
    for (const k in abc) {
      // const k: string
      const v = abc[k];
      //        ~~~~~~~ 'ABC' 타입에 인덱스 시그니처가 없기 때문에
      //                엘리먼트는 암시적으로 'any'가 된다.
    }
  }
  ```

- 첫 번째 예제와 동일한 오류이다.
- 그러므로 `(let k: keyof ABC)` 같은 선언으로 오류를 제거할 수 있다.
- 오류의 내용이 잘못된 것처럼 보이지만, 실제 오류가 맞고 또한 타입스크립트가 정확히 오류를 표시했다.
- 제대로 된 오류인 이유를 예로 들어 설명하겠다.
  ```typescript
  const x = { a: 'a', b: 'b', c: 2, d: new Date() };
  foo(x);
  ```
- foo 함수는 a, b, c 속성 외에 d를 가지는 x 객체로 호출이 가능하다.
- foo 함수는 ABC 타입에 **'할당 가능한' 어떠한 값이든 매개변수로 허용**하기 때문이다.
- ➡️ **구조적 타이핑을 생각해보자**
- 즉, ABC 타입에 할당 가능한 객체에는 a, b, c 외의 다른 속성이 존재할 수 있기 때문에, 타입스크립트는 ABC 타입의 키를 string 타입으로 선택해야 한다.
<p align="center"><strong>⭐ 또한 keyof 키워드를 사용한 방법은 또 다른 문제점을 내포하고 있다 ⭐</strong></p>

- 코드로 살펴보자
  ```typescript
  function foo(abc: ABC) {
    let k: keyof ABC;
    for (k in abc) {
      // ley k: "a" | "b" | "c"
      const v = abc[k]; // string | number 타입
    }
  }
  ```
- k가 "a" | "b" | "c" 타입으로 한정되어 문제가 된 것처럼, v도 string | number 타입으로 한정되어 범위가 너무 좁아 문제가 된다.
- `d: new Date()`가 있는 이전 예제처럼, d 속성은 Date 타입 뿐만 아니라 어떠한 타입이든 될 수 있기 때문에 v가 string | number 타입으로 추론된 것은 잘못이며 런타임의 동작을 예상하기 어렵다.
  <br>

- 골치 아픈 타입 문제 없이, 단지 객체의 키와 값을 순회하고 싶다면 어떻게 해야할까?

<p align="center"><strong>⭐ Object.entries를 사용하면 된다 ⭐</strong></p>

- 코드로 살펴보자.
  ```typescript
  function foo(abc: ABC) {
    for (const [k, v] of Object.entries(abc)) {
      k; // string 타입
      v; // any 타입
    }
  }
  ```
- Object.entries를 사용한 루프가 직관적이지는 않지만, 복잡한 기교 없이 사용할 수 있다.
- 한편, 객체를 다룰 때에는 항상 '프로토타입의 오염'의 가능성을 염두해 두어야 한다.
- for-in 구문을 사용하면, 객체의 정의에 없는 속성이 갑자기 등장할 수 있다.
  ```typescript
  > Object.prototype.z = 3; // 제발 이렇게 하지 맙시다.
  > const obj = {x:1, y: 2}
  > for (const k in obj) {
  >  console.log(k);
  >}
  x
  y
  z
  ```
- 실제 작업에서는 Object.prototype에 순회 가능한 속성을 절대로 추가하면 안 된다.
- for-in 루프에서 k가 string 키를 가지게 된다면 프로토타입 오염의 가능성을 의심해 봐야 한다.
- 객체를 순회하며 키와 값을 얻으려면, (let k: keyof T)와 같은 keyof 선언이나 Object.entries를 사용하면 된다.
- **keyof 선언은 상수이거나 추가적인 키없이 정확한 타입을 원하는 경우에 적절하다.**
- **Object.entries는 더욱 일반적으로 쓰이지만, 키와 값의 타입을 다루기 까다롭다.**

---

## 🚩 아이템 55. DOM 계층 구조 이해하기

- 이 책의 내용은 대부분 타입스크립트의 실행 환경(웹 브라우저, 서버, 모바일)과 무관하지만, 여기서 다룰 내용은 브라우저와 관련되어 있다.
- DOM 계층은 웹 브라우저에서 자바스크립트를 실행할 때 어디에서나 존재한다.
- 엘리먼트를 얻기 위해 `document.getElementById`를 사용할 때나 엘리먼트를 생성하기 위해 `document.createElement`를 사용할 때, 두 개의 차이가 무엇인지 모르더라도 결과가 어떠한 엘리먼트라는 것은 분명하다.
- 그리고 많은 부분에서 엘리먼트의 DOM과 관련된 메서드를 사용하고 엘리먼트의 속성을 사용하게 된다.

<br>

- 타입스크립트에서는 DOM 엘리먼트의 계층 구조를 파악하기 용이하다.
- Element와 EventTarget에 달려 있는 Node의 구체적인 타입을 안다면 타입 오류를 디버깅할 수 있고, 언제 타입 단언을 사용해야 할지 알 수 있다.
- 그리고 대다수의 브라우저 API가 DOM을 기반으로 하기 때문에, 리액트나 d3 같은 프레임워크도 DOM이 관련되어 있다.

<br>

- `<div>`의 경계를 넘어서 마우스를 움직이는 경우를 추적하고 싶다고 가정해 보자.
- 다음 예제는 언뜻 보기에 문제가 없는 자바스크립트 코드이다.

  ```javascript
  function handleDrag(eDown: Event) {
    const targetEl = eDown.currentTarget;
    targetE1.classList.add('dragging');

    const dragStart = [eDown.clientX, eDown.clientY];
    const handleUp = (eUp: Event) => {
      targetEl.classList.remove('dragging');
      targetEl.removeEventListener('mouseup', handleUp);

      const dragEnd = [eUp.clientX, eUp.clientY];
      console.log(
        'dx, dy =',
        [0, 1].map(i => dragEnd[i] - dragStart[i])
      );
    };
    targetEl.addEventListener('mouseup', handleUp);
  }
  const div = document.getElementById('surface');
  div.addEventListener('mousedown', handleDrag);
  ```

- 그러나 타입스크립트에서는 수많은 오류가 표시된다.

  ```typescript
  function handleDrag(eDown: Event) {
    const targetEl = eDown.currentTarget;
    targetE1.classList.add('dragging');
    //~~~~~~            개체가 'null'인 것 같습니다.
    //       ~~~~~~~~~ 'EventTarget' 형식에 'classList' 속성이 없습니다.

    const dragStart = [eDown.clientX, eDown.clientY];
    //                       ~~~~~~~~                'Event' 형식에 'clientX' 속성이 없습니다.
    //                                      ~~~~~~~~ 'Event' 형식에 'clientY' 속성이 없습니다.
    const handleUp = (eUp: Event) => {
      targetEl.classList.remove('dragging');
      // ~~~~~~           개체가 'null'인 것 같습니다.
      //       ~~~~~~~~~~ 'EventTarget' 형식에 'classList' 속성이 없습니다.
      targetEl.removeEventListener('mouseup', handleUp);
      //~~~~~~  개체가 'null'인 것 같습니다.

      const dragEnd = [eUp.clientX, eUp.clientY];
      //                   ~~~~~~~~             'Event' 형식에 'clientX' 속성이 없습니다.
      //                                ~~~~~~~ 'Event' 형식에 'clientY' 속성이 없습니다.
      console.log(
        'dx, dy =',
        [0, 1].map(i => dragEnd[i] - dragStart[i])
      );
    };
    targetEl.addEventListener('mouseup', handleUp);
    // ~~~~~  개체가 'null'인 것 같습니다.
  }
  const div = document.getElementById('surface');
  div.addEventListener('mousedown', handleDrag);
  //~~ 개체가 'null'인 것 같습니다.
  ```

<br>

**✔️ `EventTarget` 타입 관련한 오류**

- EventTarget 오류를 이해하려면 DOM 계층 구조를 자세히 살펴봐야 한다.
- 다음 HTML 코드를 보자.
  ```HTML
  <p id="quote">and <i>yet</i>it moves</p>
  ```
- 브라우저에서 자바스크립트 콘솔을 열고 p 엘리먼트의 참조를 얻어보면, HTMLParagraphElement 타입이라는 것을 알 수 있다.
  ```typescript
  const p = document.getElementByTagName('p')[0];
  p instanceof HTMLParagraphElement;
  // 참(true)
  ```
- HTMLParagraphElement는 HTMLElement의 서브타입이고, HTMLElement는 Element의 서브타입이다.
- 또한 Element는 Node의 서브타입이고, Node는 EventTarget의 서브타입이다.
- 다음은 계층 구조에 따른 타입의 몇 가지 예시이다.

  | 타입              | 예시                         |
  | ----------------- | ---------------------------- |
  | EventTarget       | window. XMLHttpRequest       |
  | Node              | document, Text, Comment      |
  | Element           | HTMLElement, SVGElement 포함 |
  | HTMLElement       | \<i>, \<b>                   |
  | HTMLButtonElement | \<button>                    |

- 계층 별로 타입을 좀 더 자세히 알아보자

<br>

**✔️ EventTarget은 DOM 타입 중 가장 추상화된 타입**

- 이벤트 리스터를 추가하거나 제거하고, 이벤트를 보내는 것밖에 할 수 없다.
- 오류가 발생한 부분을 다시 보자.
  ```typescript
  function handleDrag(eDown: Event) {
    const targetEl = eDown.currentTarget;
    targetEl.classList.add('dragging');
    //~~~~~             개체가 'null'인 것 같습니다.
    //      ~~~~~~~~~~  'EventTarget' 형식에 'classList' 속성이 없습니다.
  }
  ```
- `Event`의 `currentTarget` 속성의 타입은 `EventTarget | null` 이다.
- 그렇기 때문에 null 가능성이 오류로 표시되었고, 또한 `EventTarget 타입`에 `classList 속성이 없기 때문에` 오류가 되었다.
- 한편 `eDown.currentTarget`은 실제로 `HTMLElement 타입`이지만, 타입 관점에서는 window나 XMLHttpRequest가 될 수도 있다는 것을 주의하기 바란다.

<br>

**✔️ Node 타입**

- Element가 아닌 Node인 경우를 몇 가지 예로 들어 보면 텍스트 조각과 주석이 있다.
- 예를 들어, 다음 HTML 코드를 보겠다.
  ```HTML
  <p>
    And <i>yet</i> it moves
    <!-- quote from Galileo -->
  </p>
  ```
- 가장 바깥쪽의 엘리먼트는 HTMLParagraphElement이다.
- 그리고 children과 childrenNode 속성을 가지고 있다.
  ```javascript
  > p.children
  HTMLCollection[i]
  > p.childNodes
  NodeList(5) [text, i, text, comment, text]
  ```
- children은 자식 엘리먼트`(<i>yet</i>)`를 포함하는 배열과 유사한 구조인 `HTMLCollection`이다.
- 반면 childNodes는 배열과 유사한 Node의 컬렉션인 `NodeList`이다.
- childNodes는 엘리먼트`(<i>yet</i>)`뿐만 아니라 텍스트 조각 ("And", "it moves")과 주석("quote from Galileo")까지도 포함하고 있다.

<br>

**✔️ Element와 HTMLElement**

- SVG 태그의 전체 계층 구조를 포함하면서 HTML이 아닌 엘리먼트가 존재하는데, 바로 Element의 또 다른 종류인 SVGElement이다.
- 예를 들어, `<html>`은 `HTMLHtmlElement`이고 `<svg>`는 `SVGElement`이다.

<br>

**✔️ HTMLxxxElement**

- HTMLxxxElement 형태의 특정 엘리먼트들은 자신만의 고유한 속성을 가지고 있다.
- 예를 들어, HTMLImageElement에는 src 속성이 있고, HTMLInputElement에는 value 속성이 있다.
- 이런 속성에 접근하려면, 타입 정보 역시 실제 엘리먼트 타입이어야 하므로 상당히 구체적으로 타입을 지정해야 한다.
- 보통은 HTML 태그 값에 해당하는 'button' 같은 리터럴 값을 사용하여 DOM에 대한 정확한 타입을 얻을 수 있다.
- 예를 들자면 다음과 같다.
  ```typescript
  document.getElementByTagName('p')[0]; // HTMLParagraphElement
  document.createElement('button'); // HTMLButtonElement
  document.querySelector('div'); // HTMLDivElement
  ```

<p align="center"><strong>그러나 항상 정확한 타입을 얻을 수 있는 것은 아니다 <br /> 특히 document.getElementById에서 문제 발생</strong></p>

- 코드로 살펴보자.
  ```typescript
  document.getElementById('my-div'); // HTMLElement
  ```
- 일반적으로 타입 단언문을 지양해야 하지만, DOM 관련해서는 타입스크립트보다 우리가 더 정확히 알고 있는 경우이므로 단언문을 사용해도 좋다.
- `#my-div`가 div 태그라는 것을 알고 있으므로 문제가 되지 않는다.

  ```typescript
  document.getElementById('my-div') as HTMLDivElement;
  ```

  <br>

**✔️ strictNullChecks 모드일 때 null일 경우 체크**

- `strictNullChecks`가 설정된 상태라면, `document.getElementById`가 `null`인 경우를 체크해야 한다.
- 실제 코드에서 document.getElementById가 null일 가능성이 있다면 `if 분기문`을 추가해야 한다.
  ```typescript
  const div = document.getElementById('my-div')!;
  ```
- 이 아이템의 두 번째 예제로 다시 돌아가야 한다.
- EventTarget 이후에는 다음 오류가 발생했다.
- 다음 코드에서 clientX와 clientY에 발생한 오류의 원인을 따져 보겠다.
  ```typescript
  function handleDrag(eDown: Event) {
    // ...
    const dragStart = [eDown.clientX, eDown.clientY];
    //                       ~~~~~~~                 'Event'에 'clientX' 속성이 없습니다.
    //                                      ~~~~~~~~ 'Event'에 'clientY' 속성이 없습니다.
  }
  ```
- 표에서 살펴보았던 EventTarget 타입의 계층 구조뿐 아니라, Event 타입에도 별도의 계층 구조가 있다.
- `Mozilla` 문서에는 52개 이상의 Event 종류가 나열되어 있다.
- Event는 가장 추상화된 이벤트이다.
- 더 구체적인 타입들은 다음과 같다.

  > - UIEvent : 모든 종류의 사용자 인터페이스 이벤트
  > - MouseEvent : 클릭처럼 마우스로부터 발생되는 이벤트
  > - TouchEvent : 모바일 기기의 터치 이벤트
  > - WheelEvent : 스크롤 휠을 돌려서 발생되는 이벤트
  > - KeyboardEvent : 키 누름 이벤트

- clientX와 clientY에서 발생한 오류의 원인은, handleDrag 함수의 매개변수는 Event로 선언된 반면 clientX와 clientY는 보다 구체적인 MouseEvent 타입에 있기 때문이다.

<br>

- 그렇다면 오류를 어떻게 고칠 수 있을까?
- DOM에 대한 타입 추론은 문맥 정보를 폭넓게 활용한다.
- 'mousedown' 이벤트 핸들러를 **인라인 함수**로 만들면 **타입스크립트는 더 많은 문맥 정보를 사용**하게 되고, 대부분의 오류를 제거할 수 있다.
- 또한 매개변수 타입을 Event 대신 MouseEvent로 선언할 수 있다.
- 다음 예제는 언급한 인라인 함수와 이벤트 타입 변경을 적용해서 오류를 제거한 코드이다.

  ```typescript
  function addDragHandler(el: HTMLElement) {
    el.addEventListener('mousedown', eDown => {
      const dragStart = [eDown.clientX, eDown.clientY];
      const handleUp = (eUp: MouseEvent) => {
        el.classList.remove('dragging');
        el.removeEventListener('mouseup', handleUp);

        const dragEnd = [eUp.clientX, eUp.clientY];
        console.log(
          'dx, dy =',
          [0, 1].map(i => dragEnd[i] - dragStart[i])
        );
        el.addEventListener('mouseup', handleUp);
      };
    });
  }

  const div = document.getElementById('surface');
  if (div) {
    addDragHandler(div);
  }
  ```

- 코드 마지막의 if 구문은 `#surface` 엘리먼트가 없는 경우를 체크한다.

<p align="center"><strong>해당 엘리먼트가 반드시 존재한다는 것을 알고 있다면, <br /> if 구문 대신 단언문을 사용할 수도 있다 (addDragHandler(div!))</strong></p>
