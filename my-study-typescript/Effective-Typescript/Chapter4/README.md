# 4장 타입 설계

- 타입 자체의 설계에 대해서 다룬다.
- 4장의 예제들은 모두 타입스크립트를 염두에 두고 작성했지만, 대부분 다른 언어에도 적용될 수 있는 아이디어이다.
- 4장을 이해하고 타입을 제대로 작성한다면, 인용문에서 비유한 것처럼 테이블(코드의 타입)뿐만 아니라 순서도(코드의 로직) 역시 쉽게 이해할 수 있을 것이다.

### 🌱 아이템28. 유효한 상태만 표현하는 타입을 지향하기

- 타입을 잘 설계하면 코드는 직관적으로 작성할 수 있다.
- 효과적으로 타입을 설계하려면, **유효한 상태만 표현할 수 있는 타입을 만들어 내는 것이 가장 중요**하다.
- 웹 애플리케이션을 만든다고 가정해 보자. 애플리케이션에서 페이지를 선택하면, 페이지의 내용을 로드하고 화면에 표시한다. 페이지의 상태를 다음과 같은 설계했다.

  ```
  interface State {
      pageText: string;
      isLoading: boolean;
      error?: string;
  }
  ```

  페이지를 그리는 renderPage 함수를 작성할 때는 상태 객체의 필드를 전부 고려해서 상태 표시를 분기해야 한다.

  ```
  function renderPage(state: State) {
    if (state.error) {
        return `Error! Unable to load ${currentPage}: ${state.error}`
    } else if (state.isLoading) {
        return `Loading ${currentPage}...`;
    }
    return `<h1>{currentPage}</h1>\n${state.pageText}`;
  }
  ```

  코드를 살펴보면 분기 조건이 명확히 분리되어 있지 않다는 것을 알 수 있다. isLoading이 true이고 동시에 error 값이 존재하면 로딩 중인 상태인지 오류가 발생한 상태인지 명확히 구분할 수 없다. 필요한 정보가 부족하기 때문이다.

  <br>

  한편 페이지를 전환하는 changePage 함수는 다음과 같다.

  ```
  async function changePage(state: State, newPage: string) {
    state.isLoading = true;
    try {
        const response = await fetch(getUrlForPage(newPage));
        if (!response.ok) {
            throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
        }
        const text = await response.text();
        state.isLoading = false;
        state.pageText = text;
    } catch (e) {
        state.error = '' + e;
    }
  }
  ```

  changePage에는 많은 문제점이 있다.

  - 오류가 발생했을 때 state.isLoading을 false로 설정하는 로직이 빠져있다.
  - state.error를 초기화하지 않았기 때문에, 페이지 전환 중에 로딩 메시지 대신 과거의 오류 메시지를 보여주게 된다.
  - 페이지 로딩 중에 사용자가 페이지를 바꿔 버리면 어떤 일이 벌어질지 예상하기 어렵다. 새 페이지에 오류가 뜨거나, 응답이 오는 순서에 따라 두 번째 페이지가 아닌 첫 번째 페이지로 전환될 수 있도 있다.

  <br>

  문제는 바로 상태 값의 두 가지 속성이 동시에 정보가 부족하거나(요청이 실패한 것인지 여전히 로딩 중인지 알 수 없다), **두 가지 속성이 충돌(오류이면서 동시에 로딩 중일 수 있다)할 수 있다**는 것이다. State의 타입은 isLoading이 true이면서 동시에 error 값이 설정되는 무효한 상태를 허용한다. 무효한 상태가 존재하면 render()와 changePage() 둘 다 제대로 구현할 수 없게 된다.

<br>

- 다음은 애플리케이션의 상태를 좀 더 제대로 표현한 방법이다.

  ```
  interface RequestPending {
      state: 'pending';
  }
  interface RequestError {
      state: 'error';
      error: string;
  }
  interface RequestSuccess {
      state: 'ok';
      pageText: string;
  }
  type RequestState = RequestPending | RequestError | RequestSuccess;

  interface State {
      currentPage: string;
      requests: {[page: string]: RequestState};
  }
  ```

  여기서는 네트워크 요청 과정 각가의 상태를 명시적으로 모델링하는 태그된 유니온(또는 구별된 유니온)이 사용되었다.
  이번 예제는 상태를 나타내는 타입의 코드의 길이가 길어지긴 했지만, 무효한 상태를 허용하지 않도록 크게 개선되었다.
  현재 페이지는 발생하는 모든 요청의 상태로서, 명시적으로 모델링되었다.
  그 결과로 개선된 renderPage와 changePage 함수는 쉽게 구현할 수 있다.

  ```
  function renderPage(state: State) {
    const {currentPage} = state;
    const requestState = state.requests[currentPage];
    switch(requestState.state) {
        case 'pending':
          return `Loading #{currentPage}...`;
        case 'error':
          return `Error! Unable to load ${currentPage}: ${requestState.error}`;
        case 'ok':
          return `<h1>{currentPage}</h1>\n${requestState.pageText}`;
    }
  }

  async function changePage(state: State, newPage: string) {
    state.requests[newPage] = {state: 'pending'};
    state.currentPage = newPage;
    try {
        const response = await fetch(getUrlForPage(newPage));
        if(!response.ok) {
            throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
        }
        const pageText = await response.text();
        state.requests[newPage] = {state: 'ok', pageText};
    } catch (e) {
        state.requests[newPage] = {state: 'error', error: ''+e}
    }
  }
  ```

  이번 아이템의 처음 등장했던 renderPage와 changePage의 모호함은 완전히 사라졌다.
  현재 페이지가 무엇인지 명확하며, 모든 요청은 정확히 하나의 상태로 맞아 떨어진다.
  요청이 진행 중인 상태에서 사용자가 페이지를 변경하더라도 문제가 없다.
  무효가 된 요청이 실행되긴 하겠지만 UI에는 영향을 미치지 않는다.

<br>

- 앞의 웹 애플리케이션 예제보다 간단하지만 끔찍한 예를 들어보자.
- 2009년 6월 1일 대서양에서 추락한 에어프랑스 447 항공편이었던 에어버스 330 비행기 사례이다.

  - 에어버스는 전자 조종식 항공기로, 조종사의 제어가 물리적으로 비행 장치에 전달되기 전에 컴퓨터 시스템을 거치게 된다.
  - 에어버스 330의 조종석에는 기장과 부기장을 위한 분리된 제어 세트가 있다.
  - 사이드 스틱은 비행기의 저진 방향을 제어한다.
  - 뒤로 당기면 비행기가 올리가고, 앞으로 밀면 아래로 내려가는 방식
  - 에어버스 330은 두 개의 사이드 스틱이 독립적으로 움직이는 이중 입력 모드 시스템을 사용했다.
  - 타입스크립트로 이중 입력 모드 상태를 모델링 해보면 다음과 같다.

    ```
    interface CockpitControls {
      /* 왼쪽 사이드 스틱의 각도, 0 = 중립, + = 앞으로 */
      leftSideStick: number;
      /* 오른쪽 사이드 스틱의 강도, 0 = 중립, + = 앞으로 */
      rightSideStick: number;
    }
    ```

    이 데이터 구조가 주어진 상태에서 현재 스틱의 설정을 계산하는 getStickSetting 함수를 작성한다고 가정해 보자
    일단 기장(왼쪽 스틱)이 제어하고 있다고 가정하면 다음처럼 구현할 수 있다.

    ```
    function getStickSetting(controls: CockpitControls) {
        return controls.leftSideStick;
    }
    ```

    부기장(오른쪽 스틱)이 제어하고 있는 상태라면 기장의 스틱 상태는 중립일 것이다. 결과적으로 기장이든 부기장이든 둘 중 하나의 스틱 값 중에서 중립이 아닌 값을 사용해야 한다.

    ```
    function getStickSetting(controls: CockpitControls) {
        const { leftSideStick, rightSideStick } = controls;
        if (leftSideStick === 0) {
            return rightSideStick;
        }
        return leftSideStick;
    }
    ```

    그러나 이 코드에는 문제가 있다. 왼쪽 스틱의 로직과 동일하게 **오른쪽 스틱이 중립일 때만 왼쪽 스틱 값을 사용해야 한다.** 그러므로 오른쪽 스틱에 대한 체크를 코드에 추가해야 한다.

    ```
    function getStickSetting(controls: CockpitControls) {
        const { leftSideStick, rightSideStick } = controls;
        if (leftSideStick === 0) {
            return rightSideStick;
        } else if (rightSideStick === 0) {
            return leftSideStick;
        }
        // ???
    }
    ```

    스틱이 모두 중립이 아닌 경우를 고려해 보자. 다행히 두 스틱으 비슷한 값이라면 스틱의 각도를 평균해서 계산할 수 있다.

    ```
    function getStickSetting(controls: CockpitControls) {
        const { leftSideStick, rightSideStick } = controls;
        if (leftSideStick === 0) {
            return rightSideStick;
        } else if (rightSideStick === 0) {
            return leftSideStick;
        }
        if (Math.abs(leftSideStick - rightSideStick) < 5) {
            return (leftSideStick + rightSideStick) / 2;
        }
        // ???
    }
    ```

    그러나 두 스틱의 각도가 매우 다른 경우는 해결하기 어렵다. 그렇다고 해결책 없이 조종사에게 오류를 띄운다는 것은 현실적으로 불가능. 비행 중이기 때문에 스틱의 각도를 어떻게든 설정되어야 한다.

    <br>

    한편, 비행기가 폭풍에 휘말리자 부기장은 조용히 사이드 스틱을 뒤로 당겼다. 고도는 올라갔지만 결국은 속력이 떨어져서, 스톨(양력을 잃고 힘없이 떨어지는) 상태가 되었고 곧이어 비행기는 추락하기 시작.

    <br>

    조종사들은 비행 중 스톨 상태에 빠지만, 스틱을 앞으로 밀어 비행기가 하강하면서 속력을 다시 높이도록 훈련을 받는다. 기장은 훈련대로 스틱을 앞으로 밀었다. 그러나 부기장은 여전히 스틱을 뒤로 당기고 있었다. 이때 에어버스의 계산 함수는 다음과 같은 모습이다.

    ```
    function getStickSetting(controls: CockpitControls) {
        return (controls.leftSideStick + controls.rightSideStick) / 2
    }
    ```

    기장이 스틱을 힘껏 앞으로 밀어 봤자 부기장이 뒤로 당기고 있었기에, 평균값에는 변함이 없다. 따라서 에어버스는 아무것도 하지 않게 된다. 부기장이 무슨 일이 벌어지고 있는지 깨달았을 때는 이미 속력을 회복할 수 없을 정도로 고도가 너무 낮았고, 결국 바다로 추락해 228명 탑승객 전원의 목숨을 빼앗고 말았다.

    <br>

    이 모든 이야기의 요점은, 주어진 입력으로 getStickSetting을 구현하는 제대로 된 방법이 없었다는 것이다. getStickSetting 함수는 실패할 수밖에 없었다. 대부분의 비행기는 두 개의 스틱이 기계적으로 연결되어 있다. 부기장이 뒤로 당긴다면, 기장의 스틱도 뒤로 당겨진다. 기계적으로 연결된 스틱의 상태는 표현이 간단하다.

    ```
    interface CockpitControls {
        /* 스틱의 강도, 0 = 중립, + = 앞으로 */
        stickAngle: number;
    }
    ```

<p align="center"><strong>타입을 설계할 때는 어떤 값들을 포함하고 어떤 값들을 제외할지 신중하게 생각해야 한다.</strong></p>

- **유효한 상태를 표현하는 값만 사용한다면 코드를 작성하기 쉬워지고 타입 체크가 용이**해진다.
  - 즉, 선택적 속성(?)을 추가하기 보다는 타입을 하나 더 선언하자
- 유효한 상태만 허용하는 것은 매우 일반적인 원칙
- 반면 특정한 상황에서 지켜야 할 원칙들고 있는데, 4장의 다른 아이템에서 다뤄보자.

---

## 🌱 아이템29. 사용할 때는 너그럽게, 생성할 때는 엄격하게

- 함수의 **매개변수의 타입의 범위가 넓어도 되지만**, **결과를 반환할 때는 일반적으로 타입의 범위가 더 구체적**이어야 한다.
- 예를 들어 3D 매핑 API는 카메라의 위치를 지정하고 경계 박스의 뷰포트를 계산하는 방법을 제공한다.
  ```
  declare function setCamera(camera: CameraOptions): void;
  declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;
  ```
- 카메라의 위치를 잡기 위해 viewportForBounds의 결과가 setCamera로 바로 전달될 수 있다면 편리할이다.

  ```
  interface CameraOptions {
      center?: LngLat;
      zoom?: number;
      bearing?: number;
      pitch?: number;
  }
  type LngLat =
    { lng: number; lat: number } |
    { lon; number; lat: number } |
    [number, number]; // 편의성을 제공하여 함수 호출을 쉽게
  ```

  일부 값을 건드리지 않으면서 동시에 다른 값을 설정할 수 있어야 하므로 CameraOptions의 필드는 모두 선택적이다. 유사하게 LngLat 타입도 setCamera의 매개변수 범위를 넓혀 준다. **이러한 편의성을 제공하여 함수 호출을 쉽게 할 수 있다.**

  <br>

  viewportForBounds 함수도 또 다른 자유로운 타입을 매개변수로 받는다.

  ```
  type LngLatBounds =
    { northeast: LngLat, southwest: LngLat } |
    [LngLat, LngLat] |
    [number, number, number, number]
  ```

  이름이 주어진 모서리, 위도/경도 쌍, 또는 순서만 맞다면 4튜플을 사용하여 경계를 지정할 수 있다. LngLat는 세 가지 형태를 받을 수 있기 때문에, LngLatBounds의 가능한 형태는 19가지 이상으로 매우 자유로운 타입이다.

  <br>

  이제 GeoJSON 기능을 지원하도록 뷰포트를 조절하고, 새 뷰포트를 URL에 저장하는 함수를 작성해 보자.

  ```
  function focusOnFeature(f: Feature) {
    const bounds = calculateBoundingBox(f);
    const camera = viewportForBounds(bounds);
    setCamera(camera);
    const { center: {lat, lng}, zoom } = camera;
                  // ~~~         ... 형식에 'lat' 속성이 없습니다.
                  //      ~~~    ... 형식에 'lng' 속성이 없습니다.
    // zoom의 타입은 number | undefined
    window.location.search = `?v=@${lat},${lng}z${zoom}`;
  }
  ```

  이 예제의 오류는 lat과 lng 속서잉 없고 zoom 속성만 존재하기 때문에 발생했지만, 타입이 number | undefined로 추론되는 것 역시 문제이다.

  <br>

  **근본적인 문제는 viewportForBounds의 타입 선언이 사용될 때뿐만 아니라 만들어질 때에도 너무 자유롭다는 것이다.**

  <br>

  camera 값을 안전한 타입으로 사용하는 유일한 방법은 유니온 타입의 각 요소별로 코드를 분기하는 것이다.

  <br>

  수많은 선택적 속성을 가지는 반환 타입과 유니온 타입은 viewportForBounds를 사용하기 어렵게 만든다. 매개변수 타입의 범위가 넓으면 사용하기 편리하지만, 반환 타입의 범위가 넓으면 불편하다. 즉, 사용하기 편리한 API일수록 반환 타입이 엄격하다.

<p align="center"><strong>⭐ 사용하기 편리한 API일수록 반환 타입이 엄격하다 ⭐</strong></p>

- 유니온 타입의 요소별 분기를 위한 한 가지 방법은, 좌표를 위한 기본 형식을 구분하는 것이다.
- 배열과 배열 같은 것(array-like)의 구분을 위해 자바스크립트의 관례에 따라, LngLat와 LngLatLike를 구분할 수 있다.
- 또한 setCamera 함수가 매개변수로 받을 수 있도록, 완전하게 정의된 Camera 타입과 Camera 타입이 부분적으로 정의된 버전을 구분할 수도 있다.

  ```
  interface LngLat { lng: number, lat: number };
  type LngLatLike = LngLat | { lon: number; lat: number } | [number, number];

  interface Camera {
    center: LngLat;
    zoom: number;
    bearing: number;
    pitch: number;
  }
  interface CameraOptions extends Omit<Partial<Camera>, 'center'> {
    center?: LngLatLike;
  }
  type LngLatBounds =
    { northeast: LngLatLike, southwest: LngLatLike } |
    { LngLatLike, LngLatLike } |
    [number, number, number, number];

  declare function setCamera(camera: CameraOptions): void;
  declare function viewportForBounds(bounds: LngLatBounds): Camera;
  ```

  Camera가 너무 엄격하므로 조건을 완화하여 느슨한 CameraOptions 타입으로 만들었다.

  <br>

  setCamera 매개변수 타입의 center 속성에 LngLatLike 객체를 허용해야 하기 때문에 Partial\<Camera>를 사용하면 코드가 동작하지 않는다. 그리고 Options extends Partial\<Camera>를 사용할 수 없다. 너무 복잡해 보인다면 약간의 반복 작업을 해야겠지만 명시적으로 타입을 추출해서 다음처럼 작성할 수도 있다.

  ```
  interface CameraOptions {
    center?: LngLatLike;
    zoom?: number;
    bearing?: number;
    pitch?: number;
  }
  ```

  앞에서 설명한 CameraOptions를 선언하는 두 가지 방식 모두 focusOnFeature 함수가 타입 체커를 통과할 수 있게 한다.

  ```
  function focusOnFeature(f: Feature) {
    const bounds = calculateBoundingBox(f);
    const camera = viewportForBounds(bounds);
    setCamera(camera);
    const {center: {lat, lng}, zoom} = camera; // 정상
    // zoom 타입은 number
    window.location.search = `?v=@${lat},${lng}z${zoom}`;
  }
  ```

  이번에는 zoom의 타입이 number | undefined가 아니라 number이다. 이제 viewportForBounds 함수를 사용하기 훨씬 쉬워졌다. 그리고 bounds를 생성하는 다른 함수가 있다면 LngLatBounds와 LngLatBoundsLike를 구분할 수 있도록 새로운 기본 형식을 도입해야 한다.

  <br>

  앞에 등장한 것처럼 경계 박스의 형태를 19가지나 허용하는 것은 좋은 설계가 아니다. 그러나 다양한 타입을 허용해야만 하는 라이브러리의 타입 선언을 사용하고 있다면, 어쩔 수 없이 다양한 타입을 허용해야 하는 경우가 생긴다. 하지만 그때도 19가지 반환 타입이 나쁜 설계라는 사실을 잊어서는 안 된다.

---

## 🌱 아이템30. 문서에 타입 정보를 쓰지 않기

- 다음 코드에서 잘못된 부분을 찾아보자

  ```
  /**
   * 전경색(foreground) 문자열을 반환합니다.
   * 0개 또는 1개의 매개변수를 받습니다.
   * 매개변수가 없을 때는 표준 전경색을 반환합니다.
   * 매개변수가 있을 때는 특정 페이지의 전경색을 반환합니다.
  */
  function getForegroundColor(page?: string) {
    return page === 'login' ? { r: 127, g: 127, b: 127 } : { r: 0, g: 0, b: 0 }
  }
  ```

  코드와 주석의 정보가 맞지 않는다. 둘 중 어느 것이 옳은지 판단하기에는 정보가 부족하며, 잘못된 상태라는 것만 분명하다.

  <br>

  앞의 예제에서 의도된 동작이 코드에 제대로 반영되고 있다고 가정하면, 주석에는 세 가지 문제점이 있다.

  - 함수가 string 형태의 색깔을 반환한다고 적혀 있지만 실제로는 { r, g, b } 객체를 반환한다.
  - 주석에는 함수가 0개 또는 1개의 매개변수를 받는다고 설명하고 있지만, 타입 시그니처만 보아도 명확하게 알 수 있는 정보이다.
  - 불필요하게 장황하다. 함수 선언과 구현체보다 주석이 더 길다.

  <br>

  타입스크립트의 타입 구문 시스템은 간결하고, 구체적이며, 쉽게 읽을 수 있도록 설계되어있다. 타입 시스템 개발자들은 수십 년의 경험을 가진 언어 전문가이다.

<p align="center"><strong>⭐ 함수의 입력과 출력의 타입을 코드로 표현하는 것이 주석보다 더 나은 방법 ⭐</strong></p>

- 타입 구문은 타입스크립트 컴파일러가 체크해 주기 때문에, 절대로 구현체와의 정합성이 어긋나지 않는다.
- 코드를 살펴보면 getForegroundColor 함수는 과거에 문자열을 반환했지만 추후에 객체를 반환하도록 바뀌었고, 코드를 변경한 사람이 주석 갱신하는 것을 깜빡한 것으로 보인다.

<br>

- 누군가 강제하지 않는 이상 주석은 코드와 동기화되지 않는다.
- 그러나 타입 구문은 타입스크립트 타입 체커가 타입 정보를 동기화하도록 강제한다.
- 주석 대신 타입 정보를 작성한다면 코드가 변경된다 하더라도 정보가 정확히 동기화된다.
- 주석은 다음과 같이 개선할 수 있다.

  ```
  /** 애플리케이션 또는 특정 페이지의 전경색을 가져옵니다. */
  function getForegroundColor(page?: string): Color {
      // ...
  }
  ```

  특정 매개변수를 설명하고 싶다면 JSDoc의 @param 구문을 사용하면 된다.

    <br>

  값을 변경하지 않는다고 설명하는 주석도 좋지 않다. 또한 매개변수를 변경하지 않는다는 주석도 사용하지 않는 것이 좋다.

  ```
  /** nums를 변경하지 않습니다. */
  function sort(nums: numbers[]) { ... }
  ```

  그 대신, readonly로 선언하여 타입스크립트가 규칙을 강제할 수 있게 하면 된다.

  ```
  function sort(nums: readonly number[]) { ... }
  ```

  주석에 적용한 규칙은 변수명에도 그래도 적용할 수 있다. 변수명에 타입 정보를 넣지 안도록 한다. 예를 들어 **변수명을 ageNum으로 하는 것보다는 age로 하고, 그 타입이 number임을 명시하는 게 좋다.**

  <br>

  그러나, 단위가 있는 숫자들은 예외다. 단위가 무엇인지 확실하지 않다면 변수명 또는 속성 이름에 단위를 포함할 수 있다. 예를 들어 timeMs는 time보다 훨씬 명확하고 temperatureC는 temperature보다 훨씬 명확하다.

---

## 🌱 아이템31. 타입 주변에 null 값 배치하기

- strictNullChecks 설정을 처음 켜면, null이나 undefined 값 관련된 오류들이 갑자기 나타나기 때문에, 오류를 걸러 내는 if 구문을 코드 전체에 추가해야 한다고 생각할 수 있다.
- 왜냐하면 어떤 변수가 null이 될 수 있는지 없는지를 타입만으로는 명확하게 표현하기 어렵기 때문이다.
- 예를 들어 B변수가 A변수의 값으로부터 비롯되는 값이라면, A가 null이 될 수 없을 때 B 역시 null이 될 수 없고, 그 반대로 A가 null이 될 수 있다면 B 역시 null이 될 수 있다.
- 이러한 관계들은 겉으로 드러나지 않기 때문에 사람과 타입 체커 모두에게 혼란스럽다.

<br>

- 값이 전부 null이거나 전부 null이 아닌 경우로 분명히 구분된다면, 값이 섞여 있을 때보다 다루기 쉽다.
- 타입에 null을 추가하는 방식으로 이러한 경우를 모델링할 수 있다.

<p align="center"><strong>⭐ 타입에 null을 추가하는 방식으로 이런 경우를 모델링 가능 ⭐</strong></p>

- 숫자들의 최솟값과 최댓값을 계산하는 extent 함수를 가정해보자.

  ```
  function extent(nums: numbers[]) {
    let min, max;
    for (const num of nums) {
      if (!min) {
        min = num;
        max = num;
      } else {
        min = Math.min(min, num);
        max = Math.max(max, num);
      }
    }
    return [min, max];
  }
  ```

  이 코드는 타입 체커를 통과하고(strictNullChecks 없이), 반환 타입은 number[]로 추론된다. 그러나 여기에는 버그와 함께 설계적 결함이 있다.

  - 최솟값이나 최댓값이 -인 경우, 값이 덧씌워져 버린다. 예를 들어, extent([0, 1, 2])의 결과는 [0, 2]가 아니라 [1, 2]가 된다.
  - nums 배열이 비어 있다면 함수는 [undefined, undefined]를 반환한다.undefined를 포함하는 객체는 다루기 어렵고 절대 권장X. 코드를 살펴보면 min과 max가 동시에 둘 다 undefined이거나 둘 다 undefined가 아니라는 것을 알 수 있지만, 이러한 정보는 타입 시스템에서 표현할 수 없다.

- strictNullChecks 설정을 켜면 앞의 두 가지 문제점이 드러난다.

  ```
  function extent(nums: numbers[]) {
    let min, max;
    for (const num of nums) {
      if (!min) {
        min = num;
        max = num;
      } else {
        min = Math.min(min, num);
        max = Math.max(max, num);
        //             ~~~ 'number | undefined' 형식의 인수는
        //                 'number' 형식의 매개변수에 할당할 수 없습니다.
      }
    }
    return [min, max];
  }
  ```

  extent의 반환 타입이 (number | undefined)[]로 추론되어서 설계적 결함이 분명해졌다. 이제는 extent를 호출하는 곳마다 타입 오류의 형태로 나타난다.

  ```
  const [min, max] = extent([0, 1, 2]);
  const span = max - min;
  //           ~~~   ~~~  개체가 'undefined'인 것 같습니다.
  ```

  extent 함수의 오류는 undefined를 min에서만 제외했고 max에서는 제외하지 않았기 때문에 발생했다. 두 개의 변수는 동시에 초기화되지만, 이러한 정보는 타입 시스템에서 표현할 수 없다. max에 대한 체크를 추가해서 오류를 해결할 수 있지만 버그가 두 배로 늘어날 것이다.

  <br>

  더 나은 해법을 찾아보자. min과 max를 한 객체 안에 넣고 null이거나 null이 아니게 하면 된다.

  ```
  function extent(nums: number[]) {
    let result: [number, number] | null = null;
    for (const num of nums) {
      if (!result) {
        result = [num, num];
      } else {
        result = [Math.min(min, result[0]), Math.max(num, result[1])];
      }
    }
    return result;
  }
  ```

  이제는 반환 타입이 [number, number] | null이 되어서 사용하기가 더 수월해졌다. null 아님 단언(!)을 사용하면 min과 max를 얻을 수 있다.

  ```
  const [min, max] = extent([0, 1, 2]);
  const span = max - min; // 정상
  ```

  null 아님 단언 대신 단순 if 문으로 체크할 수도 있다.

  ```
  const range = extent([0, 1, 2]);
  if (range) {
    const [min, max] = range;
    const span = max - min; // 정상
  }
  ```

  extent의 결괏값으로 단일 객체를 사용함으로써 설계를 개선했고, 타입스크립트가 null 값 사이의 관계를 이해할 수 있도록 했으며 버그도 제거했다. if(!result) 체크는 이제 제대로 동작한다.

  <br>

- null과 null이 아닌 값을 섞어서 사용하면 클래스에서도 문제가 생긴다.
- 예를 들어, 사용자와 그 사용자의 포럼 게시글을 나타내는 클래스를 가정해 보자.

  ```
  class UserPosts {
    user: UserInfo | null;
    posts: Post[] | null;

    constructor() {
      this.user = null;
      this.posts = null;
    }

    async init(userId: string) {
      return Promise.all([
        async () => this.user = await fetchUser(userId);
        async () => this.posts = await fetchPostsForUser(userId);
      ]);
    }

    getUserName() {
      // ... ?
    }
  }
  ```

  두 번의 네크워크 요청이 로드되는 동안 user와 posts 속성은 null 상태이다. 어떤 시점에는 둘 다 null이거나, 둘 중 하나만 null이거나, 둘 다 null이 아닐 것이다. 총 네 가지 경우 존재. **속성값의 불확실성이 클래스의 모든 메서드에 나쁜 영향**을 미친다. 결국 null 체크가 난무하고 버그를 양산하게 된다.

  <br>

  설계를 개선해 보자. 필요한 데이터가 모두 준비된 후에 클래스를 만들도록 바꿔보자.

  ```
  class UserPosts {
    user: UserInfo;
    posts: Post[];

    constructor(user: UserInfo, posts: Post[]) {
      this.user = user;
      this.posts = posts;
    }

    static async init(userId: string): Promise<UserPosts> {
      const [user, posts] = await Promise.all([
        fetchUser(userId),
        fetchPostsForUser(userId)
      ]);
      return new UserPosts(user, posts);
    }

    getUserName() {
      return this.user.name;
    }
  }
  ```

  이제 UserPosts 클래스는 완전히 null이 아니게 되었고, 메서드를 작성하기 쉬워졌다. 물론 이 경우에도 데이터가 부분적으로 준비되었을 때 작업을 시작해야 한다면, null과 null이 아닌 경우의 상태를 다루어야 한다.

  <br>

  null인 경우가 필요한 속성은 프로미스로 바꾸면 안 된다. 코드가 매우 복잡해지며 모든 메서드가 비동기로 바뀌어야 한다. 프로미스는 데이터를 로드하는 코드를 단순하게 만들어 주지만, 데이터를 사용하는 클래스에서는 반대로 코드가 복잡해지는 효과를 내기도 한다.
