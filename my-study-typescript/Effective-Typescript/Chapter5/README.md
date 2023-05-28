# 5장 any 다루기

- 전통적으로 프로그래밍 언어들의 타입 시스템은 완전히 정적이거나 완전히 동적으로 확실히 구분되어 있다.
- 그러나 타입스크립트의 타입 시스템은 선택적(optional)이고 점진적(gradual)이기 때문에 정적이면서도 동적인 특성을 가진다.
- 따라서 타입스크립트는 프로그램의 일부분에만 타입 시스템을 적용할 수 있다.
- 프로그램의 일부분에만 타입 시스템을 적용할 수 있다는 특성 덕분에 점진적인 마이그레이션(자바스크립트 코드를 타입스크립트로 전환)이 가능하다.
- 마이그레이션을 할 때 코드의 일부분에 타입 체크를 비활성화시켜 주는 any 타입이 중요한 역할을 한다.
- 또한 any를 현명하게 사용하는 방법을 익혀야만 효과적인 타입스크립트 코드를 작성할 수 있다.
- **any가 매우 강력한 힘을 가지므로 남용하게 될 소지가 높기 때문이다.**
- 5장에서는 any의 장점은 살리면서 단점을 줄이는 방법들을 살펴보겠다.

---

## 🌱 아이템38. any 타입은 가능한 한 좁은 범위에서만 사용하기

- 먼저, 함수와 관련된 any의 사용법을 살펴보자.

  ```
  function processBar(b: Bar) { ... }

  function f() {
      const x = expressionReturningFoo();
      processBar(x);
              // ~ 'Foo' 형식의 인수는 'Bar' 형식의 매개변수에 할당될 수 없습니다.
  }
  ```

  문맥상으로 x라는 변수가 동시에 Foo 타입과 Var 타입에 할당 가능하다면, 오류를 제거하는 방법은 두 가지이다.

  ```
  function f1() {
    const x: any = expressionReturningFoo();    // 이렇게 하지 맙시다.
    processBar(x);
  }

  function f2() {
    const x = expressionReturningFoo();
    processBar(x as any);                       // 이게 낫습니다.
  }
  ```

  두 가지 해결책 중에서 f1에 사용된 x: any보다 f2에 사용된 x as any 형태가 권장된다. 그 이유는 **any 타입이 processBar 함수의 매개변수에서만 사용된 표현식이므로** 다른 코드에는 영향을 미치지 않기 때문이다. f1에서는 함수의 마지막까지 x 타입이 any인 반면, f2에서는 processBar 호출 이후에 x가 그대로 Foo 타입이다.

  <br>

  <strong>⭐ any 타입이 processBar 함수의 매개변수에서만 사용된 표현식이므로 ⭐</strong>

  <br>

  만일 f1 함수가 x를 반환한다면 문제가 커진다. 예를 들어보자.

  ```
  function f1() {
    const x: any = expressionReturningFoo();
    processBar(x);
    return x;
  }

  function g() {
    const foo = f1(); // 타입이 any
    foo.fooMethod(); // 이 함수 호출은 체크되지 않는다.
  }
  ```

  g 함수 내에서 f1이 사용되므로 f1의 반환 타입인 any 타입이 foo의 타입에 영향을 미친다. 이렇게 **함수에서 any를 반환하면 그 영향력은 프로젝트 전반에 전염병처럼 퍼지게** 된다.

  <br>

  **⭐ 반면 any의 사용 범위를 좁게 제한하는 f2 함수를 사용한다면 any 타입이 함수 바깥으로 영향을 미치지 않는다. ⭐**

  <br>

- 비슷한 관점에서, 타입스크립트가 함수의 반환 타입을 추론할 수 있는 경우에도 함수의 반환 타입을 명시하는 것이 좋다.
- 함수의 반환 타입을 명시하면 any 타입이 함수 바깥으로 영향을 미치는 것을 방지할 수 있다.

<br>

- 다시 f1과 f2 함수를 다시 한번 살펴보자.
- f1은 오류를 제거하기 위해 x를 any 타입으로 선언했다.
- 한편 f2는 오류를 제거하기 위해 x가 사용되는 곳에 as any 타입 단언문을 사용했다.
- 여기서 @ts-ignore를 사용하면 any를 사용하지 않고 오류를 제거할 수 있다.

  ```
  function f1() {
      const x = expressionReturningFoo();
      // @ts-ignore
      processBar(x);
      return x;
  }
  ```

  @ts-ignore를 사용한 다음 줄의 오류가 무시된다. 그러나 근본적인 원인을 해결한 것이 아니기 때문에 다른 곳에서 더 큰 문제가 발생할 수도 있다.

  <br>

  **타입 체커가 알려 주는 오류는 문제가 될 가능성이 높은 부분**이므로 **근본적인 원인을 찾아 적극적으로 대처**하는 것이 바람직하다.

    <br>

- 이번에는 객체와 관련된 any의 사용법을 살펴보겠다.
- 어떤 큰 객체 안의 한 개 속성이 타입 오류를 가지는 상황을 예로 들어보겠다.
  ```
  const config: Config = {
      a: 1,
      b: 2,
      c: {
          key: value
      //  ~~~ 'foo' 속성이 'Foo' 타입에 필요하지만 'Bar' 타입에는 없습니다.
      }
  }
  ```
  단순히 생각하면 config 객체 전체를 as any로 선언해서 오류를 제거할 수 있다.
  ```
  const config: Config = {
    a: 1,
    b: 2,
    c: {
        key: value
    }
  } as any; // 이렇게 하지 맙시다!
  ```
  객체 전체를 any로 단언하면 **다른 속성들(a와 b) 역시 타입 체크가 되지 않는 부작용이 생긴다.** 그러므로 다음 코드처럼 최소한의 범위에만 any를 사용하는 것이 좋다.
  ```
  const config: Config = {
    a: 1,
    b: 2, // 이 속성은 여전히 체크됩니다.
    c: {
        key: value as any
    }
  }
  ```
