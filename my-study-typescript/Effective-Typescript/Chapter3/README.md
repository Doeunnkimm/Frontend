# 3장 - 타입 추론

- 3장에서는 타입 추론에서 발생할 수 있는 몇 가지 문제와 그 해법을 안내한다.
- 3장을 읽은 후에는 타입스크립트가 어떻게 타입을 추론하는지, 언제 타입 선언을 작성해야 하는지, 타입 추론이 가능하더라도 명시적으로 타입 선언을 작서아흔 것이 필요한 상황은 언제인지 잘 이해할 수 있을 것이다.

## 🪐 아이템19. 추론 가능한 타입을 사용해 장황한 코드 방지하기

- 타입스크립트를 처음 접한 개발자가 자바스크립트 코드를 포팅할 때 가장 먼저 하는 일은 타입 구문을 넣는 것이다.
- 타입스크립트가 결국 타입을 위한 언어이기 때문에, 변수를 선언할 때마다 타입을 명시해야 한다고 생각하기 때문이다.
- 그러나 **타입스크립트의 많은 타입 구문은 사실 불필요**하다.
- 다음과 같은 코드의 모든 변수에 타입을 선언하는 것은 비생산적이며 형편없는 스타일로 여겨진다.
  ```
  let x: number = 12;
  ```
  다음처럼만 해도 충분하다.
  ```
  let x = 12;
  ```
  편집기에서 x에 마우스를 올려보면, 타입이 number로 이미 추론되어 있음을 확인할 수 있다.
- 타입이 추론된다면 명시적 타입 구문은 필요하지 않다. 오히려 방해
- 만약 타입을 확신하지 못한다면 편집기를 통해 체크하면 된다.

<br/>

- 타입스크립트는 더 복잡한 객체도 추론할 수 있다.

  ```
  const person: {
      name: string;
      born: {
          where: string;
          when: string;
      };
      died: {
          where: string;
          when: string;
      }
  } = {
      name:: 'Sojourner Truth',
      born: {
          where: 'Swartekill, NY',
          when: 'c.1797',
      },
      died: {
          where: 'Battle Creek, MI',
          when: 'Nov. 26, 1883'
      }
  };
  ```

  타입을 생략하고 다음처럼 작성해도 충분하다.

  ```
  const person = {
    name:: 'Sojourner Truth',
      born: {
          where: 'Swartekill, NY',
          when: 'c.1797',
      },
      died: {
          where: 'Battle Creek, MI',
          when: 'Nov. 26, 1883'
      }
  }
  ```

  두 예제에서 person의 타입은 동일하다. 값에 추가로 타입을 작성하는 것은 거추장스러울 뿐이다.
  <br/>

  다음 예제 코드처럼 배열의 경우도 객체와 마찬가지이다. 타입스크립트는 입력받아 연산하는 함수가 어떤 타입을 반환하는지 정확히 알고 있다.

  ```
  function square(nums: number[]) {
    return nums.map(x => x*x);
  }
  const squares = square([1, 2, 3, 4])
  ```

  타입스크립트는 예상하는 것보다 더 정확하게 추론하기도 한다.

  ```
  const axis1: string = 'x'; // 타입은 string
  const axis2 = 'y'; // 타입은 'y'
  ```

  axis2 변수를 string으로 예상하기 쉽지만 타입스크립트가 추론한 "y"가 더 정확한 타입이다.

  <br />

- 타입이 추론되면 리팩터링 역시 용이해진다.
- Product 타입과 기록을 위한 함수를 가정해 보자

  ```
  interface Product {
      id: number;
      name: string;
      price: number;
  }

  function logProduct(product: Product) {
    const id: number = product.id;
    const name: string = product.name;
    const price: number = product.price;
    console.log(id, name, price);
  }
  ```

  그런데 id에 문자도 들어 있을 수 있음을 나중에 알게 되었다고 가정해 보자. 그래서 Product 내의 id의 타입을 변경한다. 그러면 logProduct 내의 id 변수 선언에 있는 타입과 맞지 않기 때문에 오류가 발생한다. 하지만, logProduct 함수 내의 **명시적 타입 구문이 없었다면, 코드는 아무런 수정 없이도 타입 체커를 통과**했을 것이다.

  <br />
  logProduct는 비구조화 할당문을 사용해 구현하는 게 낫다.

  ```
  function logProduct(product: Product) {
    const { id, name, price } = product;
    console.log(id, name, price);
  }
  ```

  비구조화 할당문은 모든 지역 변수의 타입이 추론되도록 한다. 여기에 추가로 명시적 타입 구문을 넣는다면 불필요한 타입 선언으로 인해 코드가 번잡해질 것이다.

  <br>

- 정보가 부족해서 타입스크립트가 스스로 타입을 판단하기 어려운 상황도 일부 있다.
- 그럴 때는 명시적 타입 구문이 필요하다.
- logProduct 함수에서 매개변수 타입을 Product로 명시한 경우가 그 예이다.

<br>

- 어떤 언어들은 매개변수의 최종 사용처까지 참고하여 추론하지만, 타입스크립트는 최종 사용처까지 고려하지 않는다.
- 타입스크립트에서 변수의 타입은 일반적으로 처음 등장할 때 결정된다.

<br>

- 이상적인 타입스크립트 코드는 함수/메서드 시그니처에 타입 구문을 포함하지만, **함수 내에서 생성된 지역 변수에는 타입 구문을 넣지 않는다.**
- 타입 구문을 생략하여 방해되는 것들을 최소화하고 **코드를 읽는 사람이 구현 로직에 집중**할 수 있도록 하는 것이 좋다.

<br>

- 함수 매개변수에 타입 구문을 생략하는 경우도 간혹 있다.
- 기본값이 있는 경우를 예로 들어본다.
  ```
  function parseNumber(str: string, base=10) {
      // ...
  }
  ```
  여기서 기본값이 10이기 때문에 base의 타입은 number로 추론된다.

<br>

- 보통 타입 정보가 있는 라이브러리에서, 콜백 함수의 매개변수 타입은 자동으로 추론된다.
- 다음 예제에서 express HTTP 서버 라이브러리를 사용하는 request와 response의 타입 선언은 필요하지 않는다.

  ```
  // 이렇게 하지 말자 ❌
  app.get('/health', (request: express.Request, response: express.Response) => {
      response.send('OK');
  });

  // 이렇게 하자 ⭕
  app.get('/health', (request, response) => {
      response.send('OK');
  });
  ```

<br>

- 타입이 추론될 수 있음에도 여전히 타입을 명시하고 싶은 몇 가지 상황이 있다.
- 그중 하나는 **객체 리터럴을 정의할 때**이다.
  ```
  const elmo: Product = {
      name: 'Tickle Me Elmo',
      id: '048188 627152',
      price: 28.99,
  };
  ```
  이런 정의에 타입을 명시하면, 잉여 속성 체크가 동작한다. 잉여 속성 체크는 특히 선택적 속성이 있는 타입의 오타 같은 오류를 잡는 데 효과적이다. 그리고 변수가 사용되는 순간이 아닌 **할당하는 시점에 오류가 표시**되도록 해 준다.

<br>

- 만약 타입 구문을 제거한다면 잉여 속성 체크가 동작하지 않고, 객체를 선언한 곳이 아니라 객체가 사용되는 곳에서 타입 오류가 발생한다.
- 그러나 타입 구문을 제대로 명시한다면, 실제로 실수가 발생한 부분에 오류를 표시해준다.
- 마찬가지로 함수의 반환에도 타입을 명시하여 오류를 방지할 수 있다.
- 타입 추론이 가능할지라도 **구현상의 오류가 함수를 호출한 곳까지 영향을 미치지 않도록 하기 위해 타입 구문을 명시**하는 것이 좋다.

<br>

- 주식 시세를 조회하는 함수를 작성했다고 가정해보자.
  ```
  function getQuote(ticket: string) {
      return fetch(`https://quotes.example.com/q=${ticket}`)
          .then(response => response.json());
  }
  ```
  이미 조회한 종목을 다시 요청하지 않도록 캐시를 추가합니다.
  ```
  const cache: { [ticker: string]: number } = {};
  function getQuote(ticker: string) {
      if (ticker in cache) {
          return cache[ticker];
      }
      return fetch(`https://quotes.example.com/q=${ticket}`)
          .then(response => response.json())
          .then(quote => {
              cache[ticker] = quote;
              return quote;
          });
  }
  ```
  그런데 이 코드에는 오류가 있다. getQuote는 항상 Promise를 반환하므로 if 구문에는 cache[ticker]가 아니라 Promise.resolve(cache[ticker])가 반환되도록 해야 한다. 실행해 보면 오류는 getQuote 내부가 아닌 getQuote를 호출한 코드에서 발생한다.
  ```
  getQuote('MSFT').then(considerBuying)
        // ~~~~~~~ 'number | Promise<any>' 형식에는 'then' 속성이 없습니다.
  ```
  이때 의도된 반환 타입(Promise\<number>)을 명시한다면, 호출할 때가 아닌 선언할 때 정확한 위치에 오류가 표시된다.
  ```
  const cache: { [ticker: string]: number } = {};
  function getQuote(ticker: string): Promise<number> {
    if (ticker in cache) {
        return cache[ticker];
            // ~~~~~~~~~~~~~ 'number' 형식은 Promise<number> 형식에 할당할 수 없습니다.
    }
    // ...
  }
  ```
  반환 타입을 명시하면, 구현상의 오류가 사용자 코드(호출 시)의 오류로 표시되지 않는다.

<br>

- 오류의 위치를 제대로 효시해 주는 이점 외에도, 반환 타입을 명시해야 하는 이유가 두 가지 더 있다.

  1. 반환 타입을 명시하면 함수에 대해 더욱 명확하게 알 수 있다.

     - 반환 타입을 명시하려면 구현하기 전에 입력 타입과 출력 타입이 무엇인지 알아야 한다.
     - 추후에 코드가 조금 변경되어도 그 함수의 시그니처는 쉽게 바뀌지 않는다.
     - 미리 타입을 명시하는 방법은, 함수를 구현하기 전에 테스트를 먼저 작성하는 테스트 주도 개발(test driven development, TDD)과 비슷하다.
     - 전체 타입 시그니처를 먼저 작성하면 구현에 맞추어 주먹구구식으로 시그니처가 작성되는 것을 방지하고 제대로 원하는 모양을 얻게 된다.
       <br>

  2. 명명된 타입을 사용하기 위해서이다.
     - 예를 들어, 다음 함수에서는 반환 타입을 명시하지 않기로 했다고 해보자.
       ```
       interface Vector2D { x: number, y: number; }
       function add(a: Vector2D, b: Vector2D) {
         return {x: a.x + b.x, y: a.y + b.y};
       }
       ```
       타입스크립트는 반환 타입을 { x: number, y: number }로 추론했다. 이런 경우 Vector2D가 호환되지만, 입력이 Vector2D인데 반해 출력은 Vector2D가 아니기 때문에 사용자 입장에서 당황스러울 수 있다.
     - 반환 타입을 명시하면 더욱 직관적인 표현이 된다.
     - 그리고 반환 값을 별도의 타입으로 정의하면 타입에 대한 주석을 작성할 수 있어, 더욱 상세한 설명이 가능하다.
     - 추론된 반환 타입이 복잡해질수록 명명된 타입을 제공하는 이점은 커진다.

---

## 🪐 아이템 20. 다른 타입에는 다른 변수 사용하기

- 자바스크립트에서는 한 변수를 다른 목적을 가지는 다른 타입으로 재사용해도 된다.

  ```
  let id = '`12-34-56';
  fetchProduct(id); // string으로 사용
  id = 123456;
  fetchProductBySerialNumber(id); // number로 사용
  ```

  반면 타입스크립트에서는 두 가지 오류가 발생한다.

  ```
  let id = '12-34-56';
  fetchProduct(id);

  id = 123456;
  // ~~ '123456' 형식은 'string' 형식에 할당할 수 없습니다.
  fetchProductBySerialNumber(id);
                          // ~~ 'string' 형식의 인수는 'number'
                          // 형식의 매개변수에 할당될 수 없습니다.
  ```

  타입스크립트는 '12-34-56'이라는 값을 보고, id의 타입을 string으로 추론했다. string 타입에는 number 타입을 할당할 수 없기 때문에 오류가 발생한다.

<br>

- 여기서 "변수의 값은 바뀔 수 있지만 그 타입은 보통 바뀌지 않는다"는 중요한 관점을 알 수 있다.
- 타입을 바꿀 수 있는 한 가지 방법은 범위를 좁히는 것인데, 새로운 변수값을 포함하도록 확장하는 것이 아니라 타입을 더 작게 제한하는 것이다.
- 이 관점에 반하는 타입 지정 방법이 있는데, 이 방법은 어디까지나 예외이지 규칙은 아니다.

<br>

- 이제 오류가 발생한 앞의 예제를 고쳐보자.
- id의 타입을 바꾸지 않으려면, string과 number를 모두 포함할 수 있도록 타입을 확장하면 된다.
- string | number로 표현하며, 유니온(union) 타입이라고 한다.
  ```
  let id: string|number = '12-34-56';
  fetchProduct(id);
  id = 123456; // 정상
  fetchProductBySerialNumber(id); // 정상
  ```
  유니온 타입으로 코드가 동작하기는 하겠지만 **더 많은 문제가 생길 수 있다.**

<br>

- id를 사용할 때마다 값이 어떤 타입인지 확인해야 하기 때문에
- 유니온 타입은 string이나 number 같은 간단한 타입에 비해 다루기 더 어렵다.

<p align="center"><strong>차라리 별도의 변수를 도입하는 것이 낫다!</strong></p>

- ```
  const id = '12-34-56';
  fetchProduct(id);

  const serial = 123456;
  fetchProductBySerialNumber(serial);
  ```

<p align="center"><strong>⭐ 타입이 다르다면 차라리 별도의 변수를 사용하는게 바람직 !⭐ </strong></p>

- 바람직한 이유는 다음과 같습니다.
  1. 서로 관련이 없는 두 개의 값을 분리한다.(id와 serial)
  2. 변수명을 더 구체적으로 지을 수 있다.
  3. 타입 추론을 향상시키며, 타입 구문이 불필요해진다.
  4. 타입이 좀 더 간결해진다(string|number 대신 string과 number를 사용)
  5. let 대신 const로 변수를 선언하게 된다. const로 변수를 선언하면 코드가 간결해지고 타입 체커가 타입을 추론하기에도 좋다.

<br>

- 타입이 바뀌는 변수는 되도록 피해야 하며, 목적이 다른 곳에는 별도의 변수명을 사용해야 한다.
- 그런데 지금까지 이야기한 재사용되는 변수와, 다음 코드에 나오는 '가려지는(shadowed) 변수'를 혼동해서는 안 된다.

  ```
  const id = '12-34-56';
  fetchProduct(id);

  {
      const id = 123456; // 정상
      fetchProductBySerialNumber(id); // 정상
  }
  ```

  여기서 두 id는 이름이 같지만 실제로는 서로 아무런 관계가 없다. 그러므로 각기 다른 타입으로 사용되어도 문제 없다. 그런데 동일한 변수명에 타입이 다르다면, 타입스크립트 코드는 잘 동작할지 몰라도 사람에게 혼란을 줄 수 있다.

  <br>

  다시한번 말하지만, 목적이 다른 곳에는 별도의 변수명을 사용하기 바란다. 많은 개발팀이 린터 규칙을 통해 '가려지는' 변수를 사용하지 못하도록 하고 있다.

---

## 🪐 아이템21. 타입 넓히기

- 아이템7에서 설명한 것처럼 런타임에 모든 변수는 유일한 값을 가진다.
- 그러나 타입스크립트가 작성된 코드를 체크하는 정적 분석 시점에, 변수는 '가능한' 값들의 집합인 타입을 가진다.
- 상수를 사용해서 변수를 초기화할 때 **타입을 명시하지 않으면 타입 체커는 타입을 결정해야 한다.**
<p align="center"><strong>지정된 단일 값을 가지고 할당 가능한 값들의 집합을 유추해야 한다는 뜻 !</strong></p>

- 타입스크립트는 이러한 과정을 '넓히기(widening)'라고 부른다.
- 넓히기 과정을 이해한다면 **오류의 원인을 파악하고 타입 구문을 더 효과적으로 사용**할 수 있을 것이다.

<br>

- 벡터를 다루는 라이브러리를 작성한다고 가정해 보자.
- 3D 벡터에 대한 타입과 그 요소들의 값을 얻는 함수를 작성한다.
  ```
  interface Vector3 { x: number; y: number; z: number; }
  function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
    return vector[axis]
  }
  ```
  getComponent 함수를 사용한 다음 코드는 런타임에 오류 없이 실행되지만, 편집기에서는 오류가 표시된다.
  ```
  let x = 'x';
  let vec = { x: 10, y: 20, z: 30 };
  getComponent(vec, x);
                 // ~ 'string' 형식의 인수는 '"x" | "y" | "z"'
                 // 형식의 매개변수에 할당될 수 없습니다.
  ```
  getComponent 함수는 두 번째 매개변수에 '"x" | "y" | "z"' 타입을 기대했지만,
  x의 타입은 할당 시점에 넓히기가 동작해서 string으로 추론되었다.
  string 타입은 "x" | "y" | "z" 타입에 할당이 불가능하므로 오류가 된 것이다.

<br>

- 타입 넓히기가 진행될 때, 주어진 값으로 **추론 가능한 타입이 여러 개이기 때문에 과정이 상당히 모호**하다.
- 다음 코드를 예로 들어보자.

  ```
  const mixed ['x',  1];
  ```

  mixed의 타입이 어떻게 추론되는지 살펴보자
  정보가 충분하지 않다면 mixed가 어떤 타입으로 추론되어야 하는지 알 수 없다.
  그러므로 타입스크립트는 작성자의 의도를 추측한다(이 경우에는 string|number[]으로 추측함).
  그러나 타입스크립트가 아무리 영리한더라도 사람의 마음까지 읽을 수는 없고 따라서 추측한 답이 항상 옳을 수도 없다.

  <br>

  처음 예제 코드에서 타입스크립트는 다음 예제와 같은 코드를 예상했기 때문에 x의 타입을 string으로 추론했다.

  ```
  let x = 'x';
  x = 'a';
  x = 'Four score and seven years age';
  ```

  자바스크립트에서는 다음처럼 작성해도 유효하다.

  ```
  let x = 'x';
  x = /x|y|z/;
  x = ['x', 'y', 'z'];
  ```

  타입스크립트는 x의 타입을 string으로 추론할 때, 명확성과 유연성 사이의 균현을 유지하려고 한다. 일반적인 규칙은 변수가 선언된 후로는 타입이 바뀌지 않아야 하므로, string|RegExp나 string|string[]이나 any보다는 string을 사용하는 게 낫다.

<br>

- 타입스크립트는 **타입 넓히기의 과정에서 제어**할 수 있도록 몇 가지 방법을 제공한다.

  1. const

     - 만약 let 대신 const로 변수를 선언하면 더 좁은 타입이 된다.
     - 실제로 const를 사용하면 앞에서 발생한 오류가 해결된다.

       ```
       const x = 'x'; // 타입이 'x'
       let vec = { x: 10, y: 20, z: 30 };
       getComponent(vec, x); // 정상
       ```

       이제 x는 재할당될 수 없으므로 타입스크립트는 의심의 여지 없이 더 좁은 타입("x")으로 추론할 수 있다. 그리고 문자 리터럴 타입 "x"는 "x"|"y"|"z"에 할당 가능하므로 코드가 타입 체커를 통과한다.

     - 그러나 const는 만능이 아니다.
     - 객체와 배열의 경우에는 여전히 문제가 있다.
     - 다음 코드는 자바스크립트에서 정상이다.

       ```
       const v = {
         x: 1,
       };
       v.x = 3;
       v.x = '3';
       v.y = 4;
       v.name = 'Pythagoras';
       ```

       v의 타입은 구체적인 정도에 따라 다양한 모습을 추론될 수 있다.
       가장 구체적인 경우라면, {readonly x: 1}
       조금 추상적으로는, {x: number}
       가장 추상적이라면, { [key: string]: number } 또는 Object

       <br>

       객체의 경우 타입스크립트의 넓히기 알고리즘은 각 요소를 let으로 할당된 것처럼 다루므로, v의 타입은 { x: number }가 된다. 따라서 마음 코드는 마지막 세 문장에서 오류가 발생한다.

       ```
       const v = {
        x: 1,
       }
       v.x = 3; // 정상
       v.x = '3';
       //~ '"3"' 형식은 'number' 형식에 할당할 수 없습니다.
       v.y = 4;
       //~ '{ x: number; }' 형식에 'y' 속성이 없습니다.
       v.name = 'Pythagoras';
       //~~~~ '{ x: number }' 형식에 'name' 속성이 없습니다.
       ```

       타입스크립트는 오류를 잡기 위해 충분히 구체적으로 타입을 추론해야 하지만, 잘못된 추론(false positive)을 할 정도로 구체적으로 수행하지는 않는다.

       <br>

  2. 타입스크립트의 기본 동작을 재정의하는 방법

     1. 명시적 타입 구문 제공
        ```
        const v: { x: 1|3|5 } = {
         x: 1
        }; // 타입이 { x: 1|3|5 }
        ```
     2. 타입 체커에 추가적인 문맥 제공
        - 예를 들어, 함수의 매개변수로 값을 전달
     3. const 단언문 사용

        - const 단언문과 변수 선언에 쓰이는 let이나 const와 혼동해서는 안 된다.
        - const 단언문은 온전히 타입 공간의 기법이다.
        - 다음 예제 코드를 통해 각 변수에 추론된 타입의 차이점을 살펴보자

          ```
          const v1 = {
            x: 1,
            y: 2,
          }; // 타입은 { x: number, y: number };

          const v2 = {
            x: 1 as const,
            y: 2,
          }; // 타입은 { x: 1, y: number }

          const v3 = {
            x: 1,
            y: 1,
          } as const; // 타입은 { readonly x: 1, readonly y: 2 }
          ```

        - 값 뒤에 as const를 작성하면, 타입스크립트는 최대한 좁은 타입으로 추론한다.
        - 또한 배열을 튜플 타입으로 추론할 때에도 as const를 사용할 수 있다.
          ```
          const a1 = [1, 2, 3]; // 타입이 number[]
          const a2 = [1, 2, 3] as const; // 타입이 readonly [1, 2, 3]
          ```
        - 넓히기로 인해 오류가 발생하낟고 생각되면, 명시적 타입 구문 또는 const 단언문을 추가하는 것을 고려해야 한다.
        - 단언문으로 인해 추론이 어떻게 변화하는지 편집기에서 주기적으로 타입을 살펴보자 !

---

## 🪐 아이템22. 타입 좁히기

- 타입 좁히기는 타입스크립트가 넓은 타입으로부터 좁은 과정으로 진행하는 과정을 말한다.
- (1) 아마도 가장 일반적인 예시는 null 체크 !
  ```
  const el = document.getElementById('foo'); // 타입이 HTMLElement | null
  if (el) {
    el.innerHTML = 'Party Time'.blink();
  } else {
    alert('No element #foo');
  }
  ```
  첫 번째 블록에서 HTMLElement | null 타입의 null을 제외하므로, 더 좁은 타입이 되어 작업이 훨씬 쉬워진다. 타입 체커는 일반적으로 이러한 조건문에서 타입 좁히기를 잘 해내지만, **타입 별칭이 존재한다면 그러지 못할 수도** 있다.

<br>

- (2) 분기문에서 예외를 던지거나 함수를 반환하여 블록의 나머지 부분에서 변수의 타입을 좁힐 수도 있다.
  ```
  const el = document.getElementById('foo'); // 타입이 HTMLElement | null
  if (!el) throw new Error('Unable to find #foo');
  el.innerHTML = 'Party Time'.blink();
  ```

<br>

- (3) 다음은 instanceof를 사용해서 타입을 좁히는 예제이다.
  ```
  function contains(text: string, search: string|RegExp) {
    if (search instanceof RegExp) {
      // search의 타입은 ExgExp
      return !!search.exec(text);
    }
    // search의 타입은 string
    return text.includes(search);
  }
  ```

<br>

- (4) 속성 체크로도 타입을 좁힐 수 있다.
  ```
  interface A { a: number }
  interface B { b: number }
  function pickAB(ab: A | B) {
    if ('a' in ab) {
      // ab의 타입은 A
    } else {
      // ab의 타입은 B
    }
    // ab의 타입은 A | B
  }
  ```

<br>

- (5) Array.isArray 같은 일부 내장 함수로도 타입을 좁힐 수 있다.
  ```
  function contains(text: string, terms: string | string[]) {
    const termList = Array.isArray(terms) ? terms : [terms];
    // termList의 타입은 string[]
    // ...
  }
  ```

<br>

- 타입스크립트는 일반적으로 조건문에서 타입을 좁히는 데 매우 능숙하다.
- 그러나 타입을 섣불리 판단하는 실수를 저지르기 쉬우므로 다시 한번 꼼꼼히 따져 봐야 한다.
- 예를 들어, 다음 예제는 유니온 타입에서 null을 제외하기 위해 잘못된 방법을 사용했다.

  ```
  const el = document.getElementById('foo'); // 타입이 HTMLElement | null;
  if (typeof el === 'object') {
    // el의 타입은 HTMLElement | null
  }
  ```

  <p align="center"><strong>자바스크립트에서 typeof null은 "object"이다 !</strong></p>

  그래서 if 구문에서 null이 제외되지 않았다. 또한 기본형 값이 잘못되어도 비슷한 사례가 발생한다.

  ```
  function foo(x?: number | string | null) {
    if (!x) {
      // x의 타입은 string | number | null | undefined
    }
  }
  ```

  빈 문자열 ''과 0은 모두 false가 되기 때문에, 타입은 전혀 좁혀지지 않았고 x는 여전히 블록 내에서 string 또는 number가 된다.

<br>

- (6) 타입을 좁히는 또 다른 일반적인 방법은 **명시적 '태그'를 붙이는 것**이다.

  ```
  interface UploadEvent { type: 'upload'; filename: string; contents: string }
  interface DownloadEvent { type: 'download'; filename: string; }
  type AppEvent = UploadEvent | DownloadEvent;

  function handleEvent(e: AppEvent) {
    switch(e.type) {
      case 'download':
          // e의 타입이 DownloadEvent
          break;
      case 'upload':
          // e의 타입이 UploadEvent
          break;
    }
  }
  ```

  이 패턴은 '태그된 유니온(tagged union)' 또는 '구별된 유니온(discriminated union)'이라고 불리며, 타입스크립트 어디에서나 찾아볼 수 있다.

<br>

- (7) 만약 타입스크립트가 타입을 식별하지 못한다면, 식별을 돕기 위해 커스텀 함수를 도입할 수 있다.

  ```
  function isInputElement(el: HTMLElement): el is HTMLInputElement {
    return 'value' in el;
  }

  function getElementContent(el: HTMLElement) {
    if (isInputElement(el)) {
      // el의 타입은 HTMLInputElement
      return el.value;
    }
    // el의 타입은 HTMLElement
    return el.textContent;
  }
  ```

  이러한 기법을 **사용자 정의 타입 가드**라고 한다. 반환 타입이 `el is HTMLInputElement`는 **함수의 반환이 true일 경우**, 타입 체커에게 매개변수의 타입을 좁힐 수 있다고 알려 준다.

<br>

- (8) 어떤 함수들은 타입 가드를 사용하여 배열과 객체의 타입 좁히기를 할 수 있다.
  ```
  const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
  const members = ['Janet', 'Michael'].map(who => jackson5.find(n => n === who)); // 타입이 (string | undefined)[]
  ```
  filter 함수를 사용해 undefined를 걸러 내려고 해도 잘 동작하지 않을 것이다.
  ✅ 타입스크립트의 `filter`를 적용한 결과로 새로운 배열을 생성하지 않고, 기존 배열의 타입을 그대로 유지하기 때문이다. 따라서 `filter` 함수를 적용해도 결과의 타입은 `(string | undeinfed)[]`로 유지된다.
  ```
  const members = ['Janet', 'Michael']
      .map(who => jackson5.find(n => n === who))
      .filter(who => who !== undefined); // 타입이 (string | undefined)[]
  ```
  이럴 때 **타입 가드를 사용**하면 타입을 좁힐 수 있다.
  ```
  function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined;
  }
  const members = ['Janet', 'Michael']
      .map(who => jackson5
      .find(n => n === who)).filter(isDefined); // 타입이 string[]
  ```
  편집기에서 타입을 조사하는 습관을 가지면 타입 좁히기가 어떻게 동작하는지 자연스레 익힐 수 있다. 타입스크립트에서 타입이 어떻게 좁혀지는지 이해한다면 타입 추론에 대한 개념을 잡을 수 있고, 오류 발생의 원인을 알 수 있으며, 타입 체커를 더 효율적으로 이용할 수 있다.

---

## 🪐 아이템23. 한꺼번에 객체 생성하기

- 변수의 값은 변경될 수 있지만, 타입스크립트의 타입은 일반적으로 변경되지 않는다.
- 이러한 특성 덕분에 일부 자바스크립트 패턴을 타입스크립트로 모델링하는 게 쉬워진다.
- 즉, 객체를 생성할 때는 속성을 하나씩 추가하기 보다는 여러 속성을 포함해서 한꺼번에 생성해야 타입 추론에 유리해진다.

<br>

  <p align="center"><strong>객체는 여러 속성을 포함해서 한꺼번에 생성해야 타입 추론에 유리해진다 !</strong></p>

<br>

- 다음은 자바스크립트에서 2차원 점을 표현하는 객체를 생성하는 방법이다.

  ```
  const pt = {};
  pt.x = 3;
  pt.y = 4;
  ```

  타입스크립트에서는 각 할당문에서 오류가 발생한다.

  ```
  const pt = {};
  pt.x = 3;
  // ~ '{}' 형식에 'x' 속성이 없습니다.
  pt.y = 4;
  // ~ '{}' 형식에 'y' 속성이 없습니다.
  ```

  왜냐하면 첫 번째 줄의 pt 타입은 {} 값을 기준으로 추론되기 때문이다. 존재하지 않는 속성을 추가할 수는 없다.

  <br>

  만약 인터페이스를 정의한다면 오류가 다음처럼 바뀐다.

  ```
  interface Point { x: number; y: number }
  const pt: Point = {};
      //~~ '{}' 형식에 'Point' 형식의 x, y 속성이 없습니다.
  pt.x = 3;
  pt.y = 4;
  ```

  이 문제들은 객체를 한번에 정의하면 해결할 수 있다.

  ```
  const pt = {
    x: 3,
    y: 4,
  }; // 정상
  ```

  객체를 반드시 제각각 나눠서 만들어야 한다면, 타입 단언문(as)을 사용해 타입 체커를 통과하게 만들 수 있다.

  ```
  const pt = {} as Point;
  pt.x = 3;
  pt.y = 4;
  ```

  물론 이 경우에도 선언할 때 객체를 한꺼번에 만드는 게 더 낫다.

  <br>

- 작은 객체들을 조합해서 큰 객체를 만들어야 하는 경우에도 여러 단계를 거치는 것은 좋지 않은 생각이다.
  ```
  const pt = { x: 3, y: 4 };
  const id = { name: 'Pythagoras' };
  const namedPoint = {};
  Object.assign(namedPoint, pt, id);
  namedPoint.name;
           // ~~~ '{}' 형식에 'name' 속성이 없습니다.
  ```
  다음과 같이 '객체 전개 연산자' ...를 사용하며 큰 객체를 한꺼번에 만들어 낼 수 있다.
  ```
  const namedPoint = {...pt, ...id};
  namedPoint.name; // 정상, 타입이 string;
  ```
  객체 전개 연산자를 사용하면 타입 걱정 없이 필드 단위로 객체를 생성할 수도 있다. 이때 모든 업데이트마다 **새 변수를 사용하여 각각 새로운 타입을 얻도록 하는 게** 중요하다.
  ```
  const pt0 = {};
  const pt1 = {...pt0, x: 3};
  const pt: Point = {...pt1, y: 4}; // 정상
  ```
  이 방법은 간단한 객체를 만들기 위해 우회하기는 했지만, 객체에 속성을 추가하고 **타입스크립트가 새로운 타입을 추론할 수 있게 해 유용**하다.

<br>

  <p align="center"><strong>⭐ 타입에 안전한 방식으로 조건부 속성을 추가하려면, <br>속성을 추가하지 않는 null 또는 {}으로 객체 전개를 사용하면 된다 ⭐</strong></p>

```
declare let hasMiddle: boolean;
const firstLast = { first: 'Harry', last: 'Truman' };
const president = {...firstLast, ...(hasMiddle ? {middle: 'S'}: {})};
```

편집기에서 president 심벌에 마우스를 올려보면, 타입이 선택적 속성을 가진 것으로 추론된다는 것을 확인할 수 있다.

```
const president: {
  meddle?: string;
  first: string;
  last: string;
}
```

전개 연산자도 한꺼번에 여러 속성을 추가할 수도 있다.

```
declare let hasDates: boolean;
const nameTitle = {name: 'Khufu', title: 'Pharaoh'};
const pharaoh = {
  ...nameTitle,
  ...(hasDates ? {start: -2589, end: -2566}, {})
};
```

편집기에서 pharaoh 심벌에 마우스를 올려보면, 이제는 타입이 유니온으로 추론된다.

```
const pharaoh: {
  start: number;
  end: number;
  name: string;
  title: string
} | {
  name: string;
  title: string;
}
```

---

## 🪐 아이템 24. 일관성 있는 별칭 사용하기

- 어떤 값에 새 이름을 할당하는 예제
  ```
  const borough = { name: 'Brooklyn', location: [40.688, -73.979] };
  const loc = borough.location;
  ```
  borough.location 배열에 loc이라는 별칭(alias)을 만들었다. 별칭의 값을 변경하면 원래 속성값에서도 변경된다.
  ```
  > loc[0] = 0;
  > borough.location
  [0, -73.979]
  ```
  **그런데 별칭을 남발해서 사용하면 제어 흐름을 분석하기 어렵다.** 별칭을 신중하게 사용해야 코드를 잘 이해할 수 있고, 오류도 쉽게 찾을 수 있다.

<br>

- 다각형을 표현하는 자료구조를 가정해 보자.

  ```
  interface Coordinate {
    x: number;
    y: number;
  }

  interface BoundingBox {
    x: [number, number];
    y: [number, number];
  }

  interface Polygon {
    exterior: Coordinate[];
    holes: Coordinate[];
    bbox?: BoundingBox;
  }
  ```

  다각형의 기하학적 구조는 exterior와 holes 속성으로 정의된다. bbox는 필수가 아닌 최적화 속성이다. bbox 속성을 사용하면 어떤 점이 다각형에 포함되는지 빠르게 체크할 수 있다.

  ```
  function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
    if (polygon.bbox) {
      if (pt.x < polygon.bbox.x[0] || pt.x > polygon.bbox.x[1] || pt.y < polygon.bbox.y[0] || pt.y > polygon.bbox.y[1]) {
        return false;
      }
    }
    // ...
  }
  ```

  위 코드는 잘 동작하지만(타입 체크도 통과) 반복되는 부분이 존재한다. 특히 polygon.bbox는 3줄에 걸쳐 5번이나 등장한다. 다음 코드는 중복을 줄이기 위해 임시 변수를 뽑아낸 모습이다.

  ```
  function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
    const box = polygon.bbox;
    if(polygon.bbox) {
      if(pt.x < box.x[0]  || pt.x > box.x[1] || pt.y < box.y[0] || pt.y > box.y[1]) {
        //      ~~~                 ~~~                ~~~                ~~~ 객체가 'undefined'일 수 있습니다.
        return false;
      }
    }
    // ...
  }
  ```

  위 코드는 동작하지만 편집기에서 오류로 표시된다. 그 이유는 polygon.bbox를 별도의 box라는 별칭을 만들었고, 첫 번째 예시 코드에서는 잘 동작했던 **⭐ 제어 흐름 분석을 방해했기 때문 ⭐**이다.
  어떤 동작이 이루어졌는지 box와 polygon.bbox의 타입을 조사해 보자.

  ```
  function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
    const box = polygon.bbox; // 타입이 BoundingBox | undefined
    if(polygon.bbox) {
      if(pt.x < box.x[0]  || pt.x > box.x[1] || pt.y < box.y[0] || pt.y > box.y[1]) {
        // ⭐ polygon.bbox는 BoundingBox ⭐
        // ⭐ box는 BoundingBox | undefined ⭐
        return false;
      }
    }
    // ...
  }
  ```

  속성 체크는 polygon.bbox의 타입을 정제했지만 box는 그렇지 않았기 때문에 오류가 발생했다. 이러한 오류는 "별칭은 일관성 있게 사용한다"는 기본 원칙(golden rule)을 지키면 방지할 수 있다.

  <br>

  속성 체크에 box를 사용하도록 코드를 바꿔보자.

  ```
  function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
    const box = polygon.bbox;
    if(box) {
      if(pt.x < box.x[0]  || pt.x > box.x[1] || pt.y < box.y[0] || pt.y > box.y[1]) { // 정상
        return false;
      }
    }
    // ...
  }
  ```

  타입 체커의 문제를 해결되었지만 코드를 읽는 사람에게는 문제가 남아있다. box와 bbox는 같은 값인데 다른 이름을 사용한 것이다.

<br>

<p align="center"><strong>⭐ 객체 비구조화를 이용하면 보다 간결한 문법으로 일관된 이름을 사용할 수 있다 ⭐</strong></p>
```
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
    const { bbox } = polygon;
    if(box) {
      const { x, y } = box;
      if(pt.x < x[0]  || pt.x > x[1] || pt.y < y[0] || pt.y > y[1]) {
        return false;
      }
    }
    // ...
  }
```
<p align="center"><strong>⭐ 그러나, 객체 비구조화를 이용할 때는 다음 두가지를 주의해야 한다 ⭐</strong></p>

1. 전체 bbox 속성이 아니라 x와 y가 선택적 속성일 경우에 속성 체크가 더 필요하다.
   - 따라서 타입의 경계에 null 값을 추가하는 것이 좋다.
2. bbox에는 선택적 속성이 적합했지만 holes는 그렇지 않다.
   - holes가 선택적이라면, 값이 없거나 빈 배열([])이었을 것이다.
   - 차이가 없는데 이름을 구별한 것이다.
   - 빈 배열은 'holes 없음'을 나타내는 좋은 방법이다.

<br>

- 별칭은 타입 체커뿐만 아니라 런타임에도 혼동을 야기할 수 있다.

  ```
  const {bbox} = polygon;
  if (!bbox) {
    calculatePolygonBbox(polygon); // polygon.box가 채워집니다.
    // 이제 polygon.bbox와 bbox는 다른 값을 참조한다.
  }
  ```

  타입스크립트의 제어 흐름 분석은 지역 변수에는 꽤 잘 동작한다. 그러나 객체 속성에서는 주의해야 한다.

  ```
  function fn(p: Polygon) { ... }

  polygon.bbox // 타입이 BoundingBox | undefined
  if (polygon.bbox) {
    // polygon.bbox의 타입은 BoundingBox
    fn(polygon);
    // polygon.bbox의 타입은 BoundingBox
  }
  ```

  fn(polygon) 호출은 polygon.bbox를 제거할 가능성이 있으므로 타입을 BoundingBox | undefined로 되돌리는 것이 안전할 것이다. 그러나 함수를 호출할 때마다 속성 체크를 반복해야 하기 때문에 좋지 않다. 그래서 **타입스크립트는 함수가 타입 정제를 무효화하지 않는다고 가정**한다. 그러나 실제로는 무효화될 가능성이 있다. polygon.bbox로 사용하는 대신 bbox 지역 변수로 뽑아내서 사용하면 bbox의 타입은 정확히 유지되지만, polygon.bbox의 값과 같에 유지되지 않을 수 있다.

---

## 🌱 아이템 25. 비동기 코드에는 콜백 대신 async 함수 사용하기

- 과거의 자바스크립트에서는 비동기 동작을 모델링하기 위해 콜백을 사용했었다.
- 그렇기 때문에 악명 높은 '콜백 지옥(callback hell)'을 필연적으로 마주할 수밖에 없었다.

  ```
  fetchURL(url1, function(response1) {
    fetchURL(url2, function(response2) {
      fetchURL(url3, function(response3) {
        // ...
        console.log(1);
      });
      console.log(2);
    });
    console.log(3);
  });
  console.log(4);

  // 로그:
  // 4
  // 3
  // 2
  // 1
  ```

- 실행의 순서는 코드의 순서와 반대이다.
- 이러한 콜백이 중첩된 코드는 직관적으로 이해하기 어렵다.
- 요청들을 병렬로 실행하거나 오류 상황을 빠져나오고 싶다면 더욱 혼란스러워진다.

<p align="center"><strong>ES2015는 콜백 지옥을 극복하기 위해 프로미스(promise)라는 개념을 도입</strong></p>

- 프로미스는 미래에 가능해질 어떤 것을 나타낸다(future라고 부르기도 함).
- 다음은 프로미스를 사용해 앞의 코드를 수정한 것이다.

  ```
  const page1Promise = fetch(url1);
  page1Promise.then(response1 => {
    return fetch(url1);
  }).then(response2 => {
    return fetch(url3);
  }).then(response3 => {
    // ...
  }).catch(error => {
    // ...
  })
  ```

- 코드의 중첩도 적어졌고 실행 순서도 코드 순서와 같아졌다.

<p align="center"><strong>ES2017는 async와 await 키워드를 도입하여 콜백 지옥을 더욱 간단하게 처리</strong></p>
```
async function fetchPages() {
  const response1 = await fetch(url1);
  const response2 = await fetch(url2);
  const response3 = await fetch(url3);
}
```

- **await 키워드는 각각의 프로미스가 처리(resolve)될 때까지 fetchPages 함수의 실행을 멈춘다.**
- async 함수 내에서 await 중인 프로미스가 거절(reject)되면 예외를 던진다.
- 이를 통해 일반적인 try-catch 구문을 사용할 수 있다.

  ```
  async function fetchPages() {
    try {
      const response1 = await fetch(url1);
      const response2 = await fetch(url2);
      const response3 = await fetch(url3);
    } catch (e) {
      // ...
    }
  }
  ```

- ES5 또는 더 이전 버전을 대상으로 할 때, 타입스크립트 컴파일러는 async와 await가 동작하도록 정교한 변환을 수행한다.
- 다시 말해, 타입스크립트는 런타임에 관계없이 async/await를 사용할 수 있다.

<p align="center"><strong>콜백보다는 프로미스나 async/await를 사용해야 하는 이유</strong></p>
```
1) 콜백보다는 프로미스가 코르를 작성하기 쉽다.
2) 콜백보다는 프로미스가 타입을 추론하기 쉽다.
```

- 예를 들어, 병렬로 페이지를 로드하고 싶다면 Promise.all을 사용해서 프로미스를 조합하면 된다.

  ```
  async function fetchPages() {
    const [response1, response2, response3] = await Promise.all([
      fetch(url1), fetch(url2), fetch(url3)
    ]);
    // ...
  }
  ```

  이런 경우는 await와 구조 분해 할당이 찰떡궁합이다.

<br>

- 타입스크립트는 세 가지 response 변수 각각의 타입을 Response로 추론한다.
- 그러나 **콜백 스타일로 동일한 코드를 작성하려면 더 많은 코드와 타입 구문이 필요**하다.
  ```
  function fetchPagesCB() {
    let numDone = 0;
    const responses: string[] = [];
    const done = () => {
      const [response1, response2, response3] = responses;
      // ...
    };
    const urls = [url1, url2, url3];
    urls.forEach((url, i) => {
      fetchURL(url, r => {
        responses[i] = url;
        numDone++;
        if (numDone === urls.length) done();
      });
    });
  }
  ```
  이 코드에 오류 처리를 포함하거나 Promise.all 같은 일반적인 코드로 확장하는 것은 쉽지 않다.

<br>

- 가끔 프로미스를 직접 생성해야 할 때, 특히 setTimeout과 같은 콜백 API를 래필할 경우
- 그러나 선택의 여지가 있다면 일반적으로는 프로미스를 생성하기보다는 async / await를 사용해야 한다.

  ```
  1) 일반적으로 더 간결하고 직관적인 코드가 된다.
  2) async 함수는 항상 프로미스를 반환하도록 강제된다.
  ```

  ```
  // function getNumber(): Promise<number>
  async function getNumber() {
    return 42;
  }
  ```

  async 화살표 함수를 만들 수도 있다.

  ```
  const getNumber = async () => 42; // 타입이 () => Promise<number>
  ```

  프로미스를 직접 생성하면 다음과 같다.

  ```
  const getNumber = () => Promise.resolve(42); // 타입이 () => Promise<number>
  ```

  즉시 사용 가능한 값에도 프로미스를 반환하는 것이 이상해 보일 수 있지만, 실제로는 비동기 함수로 통일하도록 강제하는 데 도움이 된다. **함수는 동기 또는 항상 비동기로 실행되어야 하며 절대 혼용해서는 안 된다.** 예를 들어 fetchURL 함수에 캐시를 추가하기 위해 다음처럼 시도해 봤다고 가정해 보자.

  ```
  // 이렇게 하지 말자 ❌
  const _cache: { [url: string]: string } = {};
  function fetchWithCache(url: string, callback: (text: string) => void) {
    if (url in _cache) {
      callback(_cache[url]);
    } else {
      fetchURL(url, text => {
        _cache[url] = text;
        callback(text);
      })
    }
  }
  ```

  **캐시된 경우 콜백 함수가 동기로 호출**되기 때문에 fetchWithCache 함수는 이제 사용하기가 무척 어려워진다.

  ```
  let requestStatus = 'loading' | 'success' | 'error';
  function getUser(userId: string) {
    fetchWithCache(`/user/${userId}`, profile => {
      requestStatus = 'success';
    });
    requestStatus = 'loading';
  }
  ```

  getUser를 호출한 후에 requestStatus의 값은 온전히 profile이 캐시되었는지 여부에 달렸다. 캐시되어 있지 않다면 requestSuccess는 조만간 'success'가 되고 나서 바로 'loading'으로 다시 돌아가 버린다.

<br>

- async를 두 함수에 모두 사용하면 일관적인 동작을 강제하게 된다.

  ```
  const _cache({ [url: string]: string }) = {};
  async function fetchWithCache(url: string) {
    if (url in _cache) {
      return _cache[url];
    }
    const response = await fetch(url);
    const text = await response.text();
    _cache[url] = text;
    return text;
  }

  let requestStatus = 'loading' | 'success' | 'error';
  async function getUser(userId: string) {
    requestStatus = 'loading';
    const profile = await fetchWithCache(`/user/${userId}`);
    requestStatus = 'success';
  }
  ```

  이제 requestStatus가 'success'로 끝나는 것이 명백해졌다. 콜백이나 프로미스를 사용하면 실수로 반(half) 동기 코드를 작성할 수 있지만, async를 사용하면 항상 비동기 코드를 작성하는 셈이다.

<br>

- async 함수에서 프로미스를 반환하면 또 다른 프로미스로 래필되지 않는다.
- **반환 타입은 Promise<Promise\<T>>가 아닌 Promise\<T>가 된다.**
- 타입스크립트를 사용하면 타입 정보가 명확히 드러나기 때문에 비동기 코드의 개념ㅇ르 잡는 데 도움이 된다.
  ```
  // function getJSON(url: string): Promise<any>
  async function getJSON(url: string) {
    const response = await fetch(url);
    const jsonPromise = response.json(); // 타입이 Promise<any>
    return jsonPromise;
  }
  ```
