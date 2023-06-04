# 6장 타입선언과 @types

- 타입스크립트를 포함한 모든 언어들에서 라이브러리 의존성 관리는 어려운 일이다.
- 6장에서는 타입스크립트에서 의존성이 어떻게 동작하는지 설명하여 의존성에 대한 개념을 잡을 수 있게 한다.
- 또한 의존성 관리를 하다가 맞닥뜨릴 수 있는 몇 가지 문제를 보여 주고 해결하는 방법을 찾아본다.
- 이런 것들이 프로젝트를 공개하기 전에 타입 선언 파일을 작성하는 데 도움이 될 것이다.
- 제대로 된 타입 선언문을 작성하여 공개하는 것은 프로젝트뿐만 아니라 타입스크립트 전체 커뮤니티에 기여하는 일이기도 하다.

---

## 🌱 아이템45. devDependencies에 typescript와 @types 추가하기

- npm(node package manager)은 자바스크립트 세상에서 필수적이다.
- npm은 자바스크립트 라이브러리 저장소(npm 레지스트리)와, 프로젝트가 의존하고 있는 라이브러리들의 버전을 지정하는 방법(package.json)을 제공한다.
- npm은 세 가지 종류의 의존성을 구분해서 관리하며, 각각의 의존성은 package.json 파일 내의 별도 영역에 들어 있다.

<br>

**✔️ dependencies**

- 현재 프로젝트를 실행하는 데 필수적인 라이브러리들이 포함된다.
- 프로젝트 런타임에 lodash가 사용된다면 dependencies에 포함되어야 한다.
- 프로젝트를 npm에 공개하여 다른 사용자가 해당 프로젝트를 설치한다면, dependencies에 들어 있는 라이브러리도 함께 설치될 것이다.
- 이러한 현상을 전이(transitive) 의존성이라고 한다.

<br>

**✔️ devDependencies**

- 현재 프로젝트를 개발하고 테스트하는 데 사용되지만, 런타임에는 필요없는 라이브러리들이 포함된다.
- 예를 들어, 프로젝트에서 사용 중인 테스트 프레임워크가 devDependencies에 포함될 수 있는 라이브러리이다.
- 프로젝트를 npm에 공개하여 다른 사용자가 해당 프로젝트를 설치한다면, devDependencies에 포함된 라이브러리들은 제외된다는 것이 dependencies와 다른 점이다.

<br>

**✔️ peerDependencies**

- 런타임에 필요하긴 하지만, 의존성을 직접 관리하지 않는 라이브러리들이 포함된다.
- 단적인 예로 플러그인을 들 수 있다.
- 제이쿼리의 플러그인은 다양한 버전의 제이쿼리와 호환되므로 제이쿼리의 버전을 플러그인에서 직접 선택하지 않고, 플러그인이 사용되는 실제 프로젝트에서 선택하도록 만들 때 사용한다.

<br>

- 이 세 가지 의존성 중에서는 dependencies와 devDependencies가 일반적으로 사용된다.
- 타입스크립트 개발자라면 라이브러리를 추가할 때 어떤 종류의 의존성을 사용해야 하는지 알고 있어야 한다.
- 타입스크립트는 개발 도구일 뿐이고 **타입 정보는 런타임에 존재하지 않기 때문에**, 타입스크립트와 관련된 라이브러리는 **일반적으로 devDependencies**에 속한다.

<br>

- 모든 타입스크립트 프로젝트에서 공통적으로 고려해야 할 의존성 두 가지를 살펴보자

**✔️ 타입스크립트 자체 의존성 고려**

- 타입스크립트를 시스템 레벨로 설치할 수도 있지만, 다음 두 가지 이유 때문에 추천하지 않는다.
  ```
  1. 팀원들이 모두가 항상 동일한 버전을 설치한다는 보장이 없다.
  2. 프로젝트를 셋업할 때 별도의 단계가 추가된다.
  ```
- 따라서 타입스크립트를 시스템 레벨로 설치하기보다는 devDependencies에 넣는 것이 좋다.
- devDependencies에 포함되어 있다면, npm install을 실행할 때 팀원들 모두 항상 정확한 버전의 타입스크립트를 설치할 수 있다.
- 그리고 타입스크립트 버전 업데이트는 다른 라이브러리의 업데이트와 같은 방법을 사용하게 된다.
- 대부분의 타입스크립트 IDE와 빌드 도구는 devDependencies를 통해 설치된 타입스크립트의 버전을 인식할 수 있도록 되어 있다.
- 또한 커맨드 라인에 npx를 사용해 devDependencies를 통해 설치된 타입스크립트 컴파일러를 실행할 수 있다.
  ```bash
  $ npx tsc
  ```

<br>

**✔️ 타입 의존성(@types) 고려**

- 사용하려는 라이브러리에 타입 선언이 포함되어 있지 않더라도, `DefinitelyTyped(타입스크립트 커뮤니티에서 유지보수하고 있는 자바스크립트 라이브러리의 타입을 정의한 모음)`에서 타입 정보를 얻을 수 있다.
- `DefinitelyTyped`의 타입 정의들은 npm 레지스트리의 @types 스코프에 공개된다.
- 즉, @types/jquery에는 제이쿼리의 타입 정의가 있고, @types/lodash에는 로대시의 타입 정의가 있다.
- @types 라이브러리는 타입 정보만 포함하고 있으며 구현체는 포함하지 않는다.
- 원본 라이브러리 자체가 dependencies에 있더라도 @types 의존성은 devDependencies에 있어야 한다.
- 예를 들어, 리액트의 타입 선언과 리액트를 의존성에 추가하려면 다음처럼 실행한다.
  ```bash
  $ npm install react
  $ npm install -D @types/react
  ```
- 그러면 다음과 같은 package.json 파일이 생성된다.
  ```json
  {
    "devDependencies": {
      "@types/react": "^16.8.19",
      "typescript": "^3.5.3"
    },
    "dependencies": {
      "react": "^16.8.6"
    }
  }
  ```
- 이 예제의 의도는 런타임에 @types/react와 typescript에 의존하지 않겠다는 것이다.
- 그러나 타입 의존성은 devDependencies에 넣는 방식이 항상 유효한 것은 아니며 @types 의존성과 관련된 몇 가지 문제점이 있다.
- @types 의존성과 관련된 문제는 아이템 46에서 자세히 다룬다.

---

## 🌱 아이템46. 타입 선언과 관련된 세 가지 버전 이해하기

- 의존성 관리는 개발자에게 매우 힘든 일이다.
- 그래서 단순히 라이브러리를 프로젝트에 추가해서 사용할 뿐이지 라이브러리의 **전이적(transitive) 의존성이 호환되는지** 깊게 생각하지 않았을 것이다.
- 그런데 실제로 타입스크립트는 알아서 의존성 문제를 해결해 주기는커녕, 의존성 관리릉 오히려 더 복잡하게 만든다.
- 왜냐하면 타입스크립트를 사용하면 **다음 세 가지 사항을 추가로 고려**해야 하기 때문이다.

  ```
  1. 라이브러리의 버전
  2. 타입 선언(@types)의 버전
  3. 타입스크립트의 버전
  ```

  - 세 가지 버전 중 하나라도 맞지 않으면, 의존성과 상관없이 보이는 곳에서 엉뚱한 오류가 발생할 수 있다.
  - 이렇게 발생한 오류의 원인을 파악하고 고치기 위해서는 타입스크립트 라이브러리 관리의 복잡한 메커니즘을 모두 이해해야 한다.
  - 라이브러리 관리의 매커니즘을 이해하게 된다면 프로젝트 내에서 작성한 타입 선언을 외부에 공개해야 하는 시점이 되었을 때, 버전과 관련해서 제대로 된 결정을 내릴 수 있다.

  <br>

  - 타입스크립트에서 일반적으로 의존성을 사용하는 방식은 다음과 같다.
  - 특정 라이브러리를 dependencies로 설치하고, 타입 정보는 devDependencies로 설치한다.

    ```bash
    $ npm install react
    + react@16.8.6

    $ npm install -D @types/react
    + @types/react@16.8.19
    ```

    - 메이저 버전과 마이너 버전(16.8)이 일치하지만 패치 버전(.과 .19)은 일치하지 않는다는 점을 주목하길 바란다.
    - @types/react의 16.8.19는 타입 선언들이 리액트 16.8 버전의 API를 나타낸다는 것을 의미한다.
    - 만약 리액트 모듈이 시맨틱(semantic) 버전 규칙을 제대로 지킨다고 가정하면 패치 버전들(16.8.1, 16.8.2, ...)은 공개 API의 사양을 변경하지 않는다.
    - 따라서 타입 선언을 업데이트할 필요가 없다.
    - 그러나 타입 선언 자체에도 버그나 누락이 존재할 수 있으며 @types 모듈의 패치 버전은 버그나 누락으로 인한 수정과 추가에 따른 것이다.
    - 앞선 예제의 경우 라이브러리 자체보다 타입 선언에 더 많은 업데이트가 있었다(19대 6)

  <br>

  - 그러나 실제 라이브러리와 타입 정보의 버전이 별도로 관리되는 방식은 다음 네 가지 문제점이 있다.

    <br>
      
    **✔️ 라이브러리를 업데이트했지만 실수로 타입 선언은 업데이트하지 않은 경우**

    - 이런 경우 라이브러리 업데이트와 관련된 새로운 기능을 사용하려 할 때마다 타입 오류가 발생하게 된다.
    - 특히 하위 호환성이 깨지는 변경이 있었다면, 코드가 타입 체커를 통과하더라도 런타임에 오류가 발생할 수 있다.
    - 일반적인 해결책은 타입 선언도 업데이트하여 라이브러리와 버전을 맞추는 것이다.
    - 그러나 업데이트해야 할 타입 선언의 버전이 아직 준비되지 않은 경우라면 두 가지 선택지가 있다.
      - 보강(argument) 기법을 활용하여, 사용하려는 새 함수와 메서드의 타입 정보를 프로젝트 자체에 추가하는 것
      - 타입 선언의 업데이트를 직접 작성하고 공개하여 커뮤니티에 기여하는 방법

    <br>

    **✔️ 라이브러리보다 타입 선언의 버전이 최신이 경우**

    - 이런 경우는 타입 정보 없이 라이브러리를 사용해 오다가 타입 선언을 설치하려고 할 때 뒤늦게 발생한다.
    - 그 사이에 라이브러리와 타입 선언의 새 버전이 릴리스되었다면 라이브러리와 타입 선언의 버전 정보는 어긋나게 될 것이다.
    - 첫 번째 문제와 상황이 비슷하지만 버전의 대소 관계가 반대이다.
    - 타입 체커는 최신 API를 기준으로 코드를 검사하게 되지만 런타임에 실제로 쓰이는 것은 과거 버전이다.
    - 해결책은 라이브러리와 타입 선언의 버전이 맞도록 라이브러리 버전을 올리거나 타입 선언의 버전을 내리는 것이다.

    <br>

    **✔️ 프로젝트에서 사용하는 타입스크립트 버전과 라이브러리에서 필요로 하는 타입스크립트 버전이 최신인 경우**

    - 일반적으로 로대시(lodash), 리액트(React), 람다(Ramda) 같은 유명 자바스크립트의 타입 정보를 더 정확하게 표현하기 위해서 타입스크립트에 타입 시스템이 개선되고 버전이 올라가게 된다.
    - 그러므로 이러한 라이브러리들의 최신 타입 정보를 더 정확하게 표현하기 위해서 타입스크립트에서 타입 시스템이 개선되고 버전이 올라가게 된다.
    - 그러므로 이러한 라이브러리들의 최신 타입 정보를 얻기 위해서라면 당연히 타입스크립트의 최신 버전을 사용해야 한다.
    - 현재 프로젝트보다 라이브러리에게 필요한 타입스크립트 버전이 높은 상황이라면 @types 선언 자체에서 타입 오류가 발생하게 된다.
    - 이 오류를 해결하려면 프로젝트의 타입스크립트 버전을 올리거나, 라이브러리 타입 선언의 버전을 원대대로 내리거나 declare module 선언으로 라이브러리의 타입 정보를 없애 버리면 된다.
    - 라이브러리에서 typesVersions를 통해 타입스크립트 버전별로 다른 타입 선언을 제공하는 방법도 있지만 실제로는 매우 드물다.
    - 최근까지도 DefinitelyTyped의 라이브러리들 중 1% 미만에서만 typesVersions을 제공한다.
    - 타입스크립트의 특정 버전에 대한 타입 정보를 설치하려면 다음처럼 실행하면 된다.
      ```bash
      $ npm i -D @types/lodash@ts3.1
      ```
    - 라이브러리와 타입 선언의 버전을 일치시키는 것이 최선이겠지만, 상황에 따라 해당 버전의 타입 정보가 없을 수도 있다.
    - 그러나 유명한 라이브러리일 수록 버전별로 타입 선언이 존재할 가능성이 크다.

    <br>

    **✔️ @types 의존성이 중복될 수 있다.**

    - @types/foo와 @types/bar에 의존하는 경우를 가정해 보자.
    - 만약 @types/bar가 현재 프로젝트와 호환되지 않는 버전의 @types/foo에 의존한다면 npm은 중첩된 폴더에 별도로 해당 버전을 설치하여 문제를 해결하려고 한다.
    - 런타임에 사용되는 모듈이라면 괜찮을 수 있지만, 전역 네임스페이스(name-space)에 있는 타입 선언 모듈이라면 대부분 문제가 발생한다.
    - 전역 네임 스페이스에 타입 선언이 존재하면 중복된 선언, 또는 선언이 병합될 수 없다는 오류로 나타나게 된다.
    - 이런 상황이라면 `npm ls @types/foo`를 실행하여 어디서 타입 선언 중복이 발생했는지 추적할 수 있다.
    - 해결책은 보통 @types/foo를 업데이트하거나 @types/bar를 업데이트해서 서로 버전이 호환되게 하는 것이다.
    - 그러나 @types이 전이(transitive) 의존성을 가지도록 만드는 것은 종종 문제를 일으키기도 한다.
    - 만약 타입 선언을 작성하고 공개하려고 한다면, 아이템 51을 참고하여 이러한 문제를 피하기 바란다.

  <br>

- 일부 라이브러리, 특히 타입스크립트로 작성된 라이브러리들은 자체적으로 타입 선언을 포함(번들링, bundling)하게 된다.
- 자체적인 타입 선언은 보통 package.json의 "types" 필드에서 .d.ts 파일을 가리키도록 되어 있다.
  ```json
  {
    "name": "left-pad",
    "version": "1.3.0",
    "description": "String left pad",
    "main": "index.js",
    "types": "index.d.ts"
    // ...
  }
  ```
  - "types": "index.d.ts"를 추가하면 모든 문제가 해결될까?

<br>

- 번들링하여 타입 선언을 포함하는 경우, 특히 라이브러리가 타입스크립트로 작성되고 컴파일러를 통해 타입 선언이 생성된 경우라면 버전 불일치 문제를 해결하기는 한다.
- 그러나 번들링 방식은 부수적인 네 가지 문제점을 가지고 있다.

    <br>

  **✔️ 번들된 타입 선언에 보강 기법으로 해결할 수 없는 오류가 있는 경우, 또는 공개 시점에는 잘 동작했지만 타입스크립트 버전이 올라가면서 오류가 발생하는 경우에 문제**

  - @types을 별도로 사용하는 경우라면 라이브러리 자체의 버전에 맞추어 선택할 수 있다.
  - 그러나 번들된 타입에서는 @types의 버전 선택이 불가능하다.
  - 단 하나의 잘못된 타입 선언으로 인해 타입스키립트의 버전을 올리지 못하는 불상사가 생길 수 있는 것이다.
  - 번들된 타입과 DefinitelyTyped이 비교되는 부분이다.
  - 마이크로소프트는 타입스크립트 버전이 올라감에 따라 DefinitelyTyped의 모든 타입 선언을 점검하며, 문제가 발견된 곳은 빠른 시간 내에 해결하고 있다.

  <br>

  **✔️ 프로젝트 내의 타입 선언이 다른 라이브러리의 타입 선언에 의존한다면 문제**

  - 보통은 의존성이 devDependencies에 들어간다.
  - 그러나 프로젝트를 공개하여 다른 사용자가 설치하게 되면 devDependencies가 설치되지 않을 것이고 타입 오류가 발생하게 된다.
  - 반면 자바스크립트 사용자 입장에서는 @types를 설치할 이유가 없기 때문에 dependencies에 포함하고 싶지 않을 것이다.
  - 아이템51에서는 이러한 상황에 대한 표준 해결책을 다룬다.
  - 한편 DefinitelyTyped에 타입 선언을 공개하는 경우라면 첫 번째 상황은 전혀 문제가 되지 않는다.
  - 타입 선언은 @types에 있을 것이고 타입스크립트 사용자만이 타입 정보를 사용하게 된다.

  <br>

  **✔️ 프로젝트의 과거 버전에 있는 타입 선언에 문제가 있는 경우에는 과거 버전으로 돌아가서 패치 업데이트를 해야 한다.**

  - 번들링된 타입 선언에서는 어려운 일이지만, DefinitelyTyped는 동일 라이브러리의 여러 버전의 타입 선언을 동시에 유지보수할 수 있는 메커니즘을 가지고 있다.

  <br>

  **✔️ 타입 선언의 패치 업데이트를 자주 하기 어렵다는 문제**

  - DefinitelyTyped는 커뮤니티에서 관리되기 때문에 담장자가 5일 이내에 패치를 적용하지 않는 것으로 보인다면, 전체 유지보수 담당자가 패치를 하게 된다.
  - 그러나 개별 프로젝트에서는 비슷한 처리 시간을 보장하기 어렵다.

<br>

- 타입스크립트에서 의존성을 관리한다는 것은 쉽지 않은 일지만, 잘 관리한다면 그에 따른 보상이 함께 존재한다.
- 잘 작성된 타입 선언은 라이브러리를 올바르게 사용하는 방법을 배우는 데 도움이 되며 생산성 역시 크게 향상시킬 수 있다.
- 만약 의존성 관리에 문제가 생긴다면 이번 아이템의 처음에 언급했던 세 가지 버전을 기억해야 한다.

<br>

- 라이브러리를 공개하려는 경우, 타입 선언을 자체적으로 포함하는 것과 타입 정보만 분리하여 DefinitelyTyped에 공개하는 것의 장단점을 비교해 봐야 한다.
- 공식적인 권장사항은 라이브러리가 타입스크립트로 작성된 경우만 타입 선언을 라이브러리에 포함하는 것이다.
- 실제로 타입스크립트 컴파일러가 타입 선언을 대신 생성해 주기 때문에, 타입스크립트로 작성된 라이브러리에 타입 선언을 포함하는 방식은 잘 동작한다.
- 자바스크립트로 작성된 라이브러리라면 손수 작성한 타입 선언은 오류가 있을 가능성이 높고 잦은 업데이트가 필요하게 된다.
- 자바스크립트로 작성된 라이브러리는 타입 선언을 DefinitelyTyped에 공개하여 커뮤니티에서 관리하고 유지보수하도록 맡기는 것이 좋다.

---

## 🌱 아이템47. 공개 API에 등장하는 모든 타입을 익스포트하기

- 타입스크립트를 사용하다 보면, 언젠가는 서드파티의 모듈에서 익스포트되지 않은 타입 정보가 필요한 경우가 생긴다.
- 다행히 타입 간의 매핑을 해 주는 도구가 많이 있으며, 웬만하면 필요한 타입을 참조하는 방법을 찾을 수 있다.
- 다른 관점에서 생각해 보면, 라이브러리 제작자는 프로젝트 초기에 타입 익스포트부터 작성해야 한다는 의미이다.
- 만약 함수의 선언에 이미 타입 정보가 있다면 제대로 익스포트되고 있는 것이며, 타입 정보가 없다면 타입을 명시적ㅇ츠로 작성해야 한다.
- 만약 어떤 타입을 숨기고 싶어서 익스포트하지 않았다고 가정해 보자.

  ```javascript
  interface SecretName {
    first: string;
    last: string;
  }

  interface SecretSanta {
    name: SecretName;
    gift: string;
  }

  export function getGift(name: SecretName, gift: string): SecretSanta {
    // ...
  }
  ```

  - 해당 라이브러리 사용자는 SecretName 또는 SecretSanta를 직접 임포트할 수 없고, getGift만 임포트 가능하다.
  - 그러나 타입들은 익스포트된 함수 시그니처에 등장하기 때문에 추출해 낼 수 있다.
  - 추출하는 한 가지 방법은, Parameters와 ReturnType 제너릭 타입을 사용하는 것이다.
    ```javascript
    type MySanta = ReturnType<typeof getGift>; // SecretSanta
    type MyName = ReturnType<typeof getGift>[0]; // SecretName
    ```
    만약 프로젝트의 융통성을 위해 타입들을 일부러 익스포트하지 않았던 것이라면, 쓸데없는 작업을 한 셈이다. 공개 API 매개변수에 놓이는 순간 타입은 노출되기 때문이다. 그러므로 굳이 숨기려고 하지 말고 라이브러리 사용자를 위해 명시적으로 익스포트하는 것이 좋다.

---

## 🌱 아이템 48. API 주석에 TSDoc 사용하기

- 다음 코드는 인사말을 생성하는 타입스크립트 함수이다.

  ```typescript
  // 인사말을 생성합니다. 결과는 보기 좋게 꾸며집니다.
  function greet(name: string, title: string) {
    return `Hello ${title} ${name}`;
  }
  ```

  함수의 앞부분에 주석이 있어서 함수가 어떤 기능을 하는지 쉽게 알 수는 있다. 그러나 사용자를 위한 문서라면 JSDoc 스타일의 주석으로 만드는 것이 좋다.

  ```typescript
  /** 인사말을 생성합니다. 결과는 보기 좋게 꾸며집니다. */
  function greet(name: string, title: string) {
    return `Hello ${title} ${name}`;
  }
  ```

  왜냐하면 대부분의 편집기는 함수가 호출되는 곳에서 함수에 붙어 있는 JSDoc 스타일의 주석을 툴팁으로 표시해 주기 때문이다.
  반대로 **인라인 주석은 편집기가 표시해 주지 않는다.**

  <br>

  타입스크립트 언어 서비스가 JSDoc 스타일을 지원하기 때문에 적극적으로 활용하는 것이 좋다. 만약 공개 API에 주석을 붙인다면 JSDoc 형태로 작성해야 한다.

  <br>

  `@param`과 `@returns` 같은 일반적 규칙을 사용할 수 있다.
  한편 타입스크립트 관점에서는 `TSDoc` 이라고 부르기도 한다.

  ```typescript
  /**
   * 인사말을 생성합니다.
   * @param name 인사할 사람의 이름
   * @parma title 그 사람의 칭호
   * @returns 사람이 보기 좋은 형태의 인사말
   */
  function greet(name: string, title: string) {
    return `Hello ${title} ${name}`;
  }
  ```

  `@param`과 `@returns`를 추가하면 함수를 호출하는 부분에서 각 매개변수와 관련된 설명을 보여준다.

  <br>

  타입 정의에 TSDoc을 사용할 수도 있다.

  ```typescript
  /** 특정 시간과 장소에서 수행된 측정 */
  interface Measurement {
    /** 어디에서 측정되었나? */
    position: Vector3D;
    /** 언제 측정되었나? epoch에서부터 초 단위로 */
    time: number;
    /** 측정된 운동량 */
    momentum: Vector3D;
  }
  ```

  Measurement 객체의 각 필드에 마우스를 올려보면 필드별로 설명을 볼 수 있다.

  <br>

  TSDoc 주석은 마크다운(markdown) 형식으로 꾸며지므로 굵은 글씨, 기울림 글씨, 글머리기호 목록을 사용할 수 있다.

  ```typescript
  /**
   * 이 _interface_는 **세 가지** 속성을 가집니다.
   * 1. x
   * 2. y
   * 3. y
   */
  interface Vector3D {
    x: number;
    y: number;
    z: number;;
  }
  ```

  주석을 수필처럼 장황하게 쓰지 않도록 주의해야 한다. 훌륭한 주석은 간단히 요점만 언급한다.

  <br>

- JSDoc에는 타입 정보를 명시하는 규칙(@param {string} name ...)이 있지만, 타입스크립트에서는 타입 정보가 코드에 있기 때문에 TSDoc에서는 타입 정보를 명시하면 안 된다.

---

## 🌱 아이템49. 콜백에서 this에 대한 타입 제공하기

- 자바스크립트에서 this 키워드는 매우 혼란스러운 기능이다.
- let이나 const로 선언된 변수가 렉시컬 스코프(lexical scope)인 반면, this는 다이나믹 스코프(dynamic scope)이다.

<br>

**❓ 렉시컬 스코프(lexical scope)**

- 함수를 작성할 때 변수가 어디서 사용되는지 정해진다. 코드를 작성하면서 바로 변수를 찾을 수 있다.

**❓ 다이나믹 스코프(dynamic scope)**

- 함수를 실행할 때에야 변수가 어디서 사용되는지 정해진다. 코드를 실행해야만 어떤 변수를 참조할지 알 수 있다.

<br>

- 그래서 다이나믹 스코프의 값은 '정의된' 방식이 아니라 '호출된' 방식에 따라 달라진다.
- this는 전형적으로 객체의 현재 인스턴스를 참조하는 클래스에서 가장 많이 쓰인다.

  ```javascript
  class C {
    vals = [1, 2, 3];
    logSquares() {
      for (const val of this.vals) {
        console.log(val * val);
      }
    }
  }

  const c = new C();
  c.logSquares(); // 1 4 9
  ```

  이제 logSquares를 외부 변수에 넣고 호출하면 어떻게 되는지 보자.

  ```javascript
  const c = new C();
  const method = c.logSquares;
  method(); // Uncaught TypeError: undefined의 'vals' 속성을 읽을 수 없습니다.
  ```

  - c.logSquares()가 실제로는 두 가지 작업을 수행하기 때문에 문제가 발생한다.
  - C.prototype.logSquares를 호출하고, 또한 this의 값을 c로 바인딩한다.
  - 앞의 코드에서는 logSquares의 참조 변수를 사용함으로써 두 가지 작업을 분리했고, this의 값은 undefined로 설정된다.

  <br>

- 자바스크립트에는 this 바인딩을 온전히 제어할 수 있는 방법이 있다.
- call을 사용하면 명시적으로 this를 바인딩하여 문제를 해결할 수 있다.

  ```javascript
  const c = new C();
  const method = c.logSquares;
  method.call(c); // 제곱을 출력한다.
  ```

  - this가 반드시 C의 인스턴스에 바인딩되어야 하는 것은 아니며, 어떤 것이든 바인딩할 수 있다.
  - 그러므로 라이브러리들은 API의 일부에서 this의 값을 사용할 수 있게 한다.
  - 심지어 DOM에서도 this를 바인딩할 수 있다.
  - 이벤트 핸들러를 예로 들 수 있다.
    ```javascript
    document.querySelector('input')!.addEventListener('change', function (e) {
      console.log(this); // 이벤트가 발생한 input 엘리먼트를 출력한다.
    })
    ```
  - this 바인딩은 종종 콜백 함수에서 쓰인다.
  - 예를 들어, 클래스 내에 onClick 핸들러를 정의한다면 다음처럼 할 수 있다.
    ```javascript
    class ResetButton {
      render() {
        return makeButton({ text: 'Reset', onClick: this.onClick });
      }
      onClick() {
        alert(`Reset ${this}`);
      }
    }
    ```
  - 그러나 ResetButton에서 onClick을 호출하면, this 바인딩 문제로 인해 "Reset이 정의되지 않았습니다"라는 경고가 뜬다.
  - 일반적인 해결책은 생성자에서 메서드에 this를 바인딩시키는 것이다.
    ```javascript
    class ResetButton {
      constructor() {
        this.onClick = this.onClick.bind(this);
      }
      render() {
        return makeButton({ text: 'Reset', onClick: this.onClick });
      }
      onClick() {
        alert(`Reset ${this}`);
      }
    }
    ```
  - onClick() { ... }은 ResetButton.prototype의 속성을 정의한다.
  - 그러므로 ResetButton의 모든 인스턴스에서 공유된다.
  - 그러나 생성자에서 this.onClick = ...으로 바인딩하면, onClick 속성에 this가 바인딩되어 해당 인스턴스에 생성된다.
  - 속성 탐색 순서(lookup sequence)에서 onClick 인스턴스 속성은 onClick 프로토타입(prototype) 속성보다 앞에 놓이므로, render() 메서드의 this.onClick은 바인딩된 함수를 참조하게 된다.

  <br>

  - 조금 더 간단한 방법으로 바인딩을 해결할 수도 있다.
    ```javascript
    class ResetButton {
      render() {
        return makeButton({ text: 'Reset', onClick: this.onClick });
      }
      onClick = () => {
        alert(`Reset ${this}`); // "this"가 항상 인스턴스를 참조한다.
      };
    }
    ```
  - onClick을 화살표 함수로 바꿨다.
  - 화살표 함수로 바꾸면, ResetButton이 생성될 때마다 제대로 바인딩된 this를 가지는 새 함수를 생성하게 된다.
  - 이해를 돕기 위해 자바스크립트가 실제로 생성한 코드를 살펴보겠다.
    ```javascript
    class ResetButton {
      constructor() {
        var _this = this;
        this.onClick = function () {
          alert('Reset ' + _this);
        };
      }
      render() {
        return makeButton({ text: 'Reset', onClick: this.onClick });
      }
    }
    ```
  - this 바인딩은 자바스크립트의 동작이기 때문에, 타입스크립트 역시 this 바인딩을 그대로 모델링하게 된다.
  - 만약 작성중인 라이브러리에 this를 사용하는 콜백 함수가 있다면, this 바인딩 문제를 고려해야 한다.
    ```typescript
    function addKeyListener(
      el: HTMLElement,
      fn: (this: HTMLElement, e: KeyboardEvent) => void
    ) {
      el.addEventListener('Keydown', e => {
        fn.call(el, e);
      });
    }
    ```
  - 콜백 함수의 첫 번째 매개변수에 있는 this는 특별하게 처리된다.
  - 다음 예제처럼 call을 제거하고 fn을 두 개의 매개변수로 호출해 보면 알 수 있다.
    ```typescript
    function addKeyListener(
      el: HTMLElement,
      fn: (this: HTMLElement, e: KeyboardEvent) => void
    ) {
      el.addEventListener('keydown', e => {
        fn(el, e);
        //    ~~~ 1개의 인수가 필요한데 2개를 가져왔습니다.
      });
    }
    ```
  - 콜백 함수의 매개변수에 this를 추가하면 this 바인딩이 체크되기 때문에 실수를 방지할 수 있다.
    ```typescript
    function addKeyListener(
      el: HTMLElement,
      fn: (this: HTMLElement, e: KeyboardEvent) => void
    ) {
      el.addEventListener('keydown', e => {
        fn(e);
        //~~~ 'void' 형식의 'this' 컨텍스트를
        //    메서드의 'HTMLElement' 형식 'this'에 할당할 수 없습니다.
      });
    }
    ```
  - 또한 라이브러러리 사용자의 콜백 함수에서 this를 참조할 수 있고 완전한 타입 안전성도 얻을 수 있다.
    ```typescript
    declare let el: HTMLElement;
    addKeyListener(el, function (e) {
      this.innerHTML; // 정상 "this"는 HTMLElement 타입
    });
    ```
  - 만약 라이브러리 사용자가 콜백을 화살표 함수로 작성하고 this를 참조하려고 하면 타입스크립트는 문제를 잡아낸다.
    ```typescript
    class Foo {
      registerHandler(el: HTMLElement) {
        addKeyListener(el, e => {
          this.innerHTML;
          // ~~~~~~~~~~~~ 'Foo' 유형에 'innerHTML' 속성이 없습니다.
        });
      }
    }
    ```
  - this의 사용법을 반드시 기억해야 한다.
  - 콜백 함수에서 this 값을 사용해야 한다면 this API의 일부가 되는 것이기 때문에 반드시 타입 선언에 포함해야 한다.

---

## 🌱 아이템 50. 오버로딩 타입보다는 조건부 타입을 사용하기

- 다음 예제의 double 함수에 타입 정보를 추가해 보자.

  ```typescript
  function double(x) {
    return x + x;
  }
  ```

  - double 함수에는 string 또는 number 타입의 매개변수가 들어올 수 있다.
  - 그러므로 유니온 타입을 추가했다.
    ```typescript
    function double(x: number | string): number | string;
    function double(x: any) {
      return x + x;
    }
    ```
  - 선언이 틀린 것은 아니지만, 모호한 부준이 있다.
    ```typescript
    const num = double(12); // string | number
    const str = double('x'); // string | number
    ```
  - double에 number 타입을 매개변수로 넣으면 number 타입을 반환한다.
  - 그리고 string 타입을 매개변수로 넣으면 string 타입을 반환한다.
  - 그러나 선언문에는 number 타입을 매개변수로 넣고 string 타입을 반환하는 경우도 포함되어 있다.

  <br>

  **✔️ 제너릭을 사용하면 이러한 동작을 모델링할 수 있다.**

  - 코드로 나타내면 다음과 같다.
    ```typescript
    function double<T extends number | string>(x: T): T;
    function double(x: any) {
      return x + x;
    }
    const num = double(12); // 타입이 12
    const str = double('x'); // 타입이 "x"
    ```
  - 타입을 구체적으로 만들어 보려는 시도는 좋았지만 너무 과했다.
  - 이제는 타입이 너무 과하게 구체적이다.
  - string 타입을 매개변수로 넘기면 string 타입이 반환되어야 한다.
  - 그러나 리터럴 문자열 'x'를 매개변수로 넘긴다고 해서 동일한 리터럴 문자열 'x' 타입이 반환되어야 하는 것은 아니다.
  - 'x'의 두 배는 'x'가 아니라 'xx'이다.

  <br>

  **✔️ 여러 타입 선언으로 분리**

  - 타입스크립트에서 함수의 구현체는 하나지만, 타입 선언은 몇 개든지 만들 수 있다.
  - 이를 활용하여 double의 타입을 개선할 수 있다.

    ```typescript
    function double(x: number): number;
    function double(x: string): string;
    function double(x: any) {
      return x + x;
    }

    const num = double(12); // 타입이 number
    const str = double('x'); // 타입이 string
    ```

  - 함수 타입이 조금 명확해졌지만 **여전히 버그는 남아있다.**
  - string이나 number 타입의 값으로는 동작하지만, 유니온 타입 관련해서 문제가 발생한다.
    ```typescript
    function f(x: number | string) {
      return double(x);
      //            ~~ 'string | number' 형식의 인수는
      //                ' string' 형식의 매개변수에 할당될 수 없습니다.
    }
    ```
  - 위 코드에서 double 함수의 호출은 정상적이며 string | number 타입이 반환되기를 기대한다.
  - 한편 타입스크립트는 오버로딩 타입 중에서 일치하는 타입을 찾을 때까지 순차적으로 검색한다.
  - 그래서 오버로딩 타입의 마지막 선언(string 버전)까지 검색했을 때, string | number 타입은 string에 할당할 수 없기 때문에 오류가 발생한다.

  <br>

  **✔️ 가장 좋은 해결책은 조건부 타입(conditional type)을 사용**

  - 조건부 타입은 타입 공간의 if 구문과 같다.
    ```typescript
    function double<T extends number | string>(
      x: T
    ): T extends string ? string : number;
    function double(x: any) {
      return x + x;
    }
    ```
  - 이 코드는 제너릭을 사용했던 예제와 유사하지만, 반환 타입이 더 정교하다.
  - 조건부 타입은 자바스크립트의 삼항 연산자(?:)처럼 사용하면 된다.
    ```
    1. T가 string의 부분 집합이면(string, 또는 문자열 리터럴, 또는 문자열 리터럴의 유니온), 반환 타입이 string이다.
    2. 그 외의 경우는 반환 타입이 number이다.
    ```
  - 조건부 타입이라면 앞선 모든 예제가 동작한다.

    ```typescript
    const num = double(12); // number
    const str = double('x'); // string

    // function f(x: string | number): string | number
    function f(x: number | string) {
      return double(x);
    }
    ```

  - 유니온에 조건부 타입을 적용하면, 조건부 타입의 유니온으로 분리되기 때문에 number | string의 경우에도 동작한다.
  - 예를 들어, T가 number | string이라면, 타입스크립트는 조건부 타입을 다음 단계로 해석한다.

    ```
    (number | string) extends string ? string : number
    -> (number extends string ? string | number) | (string extends string ? string : number)
    -> number | string
    ```

<br>

- 오버로딩 타입이 작성하기는 쉽지만, 조건부 타입은 개별 타입의 유니온으로 일반화하기 때문에 타입이 더 정확해 진다.
- 타입 오버로딩이 필요한 경우에 가끔 조건부 타입이 필요한 상황이 발생한다.
- 각각의 오버로딩 타입이 독립적으로 처리되는 반면, 조건부 타입은 타입 체커가 단일 표현식으로 받아들이기 때문에 유니온 문제를 해결할 수 있다.
- 오버로딩 타입을 작성 중이라면 조건부 타입을 사용해서 개선할 수 있을지 검토해 보는 것이 좋다.
