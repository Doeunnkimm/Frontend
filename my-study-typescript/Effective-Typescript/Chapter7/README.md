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
