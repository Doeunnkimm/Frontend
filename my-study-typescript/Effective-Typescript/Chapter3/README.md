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