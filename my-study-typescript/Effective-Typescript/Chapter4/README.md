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

---

## 🌱 아아템32. 유니온의 인터페이스보다 인터페이스의 유니온을 사용하기

- 유니온 타입의 속성을 가지는 인터페이스를 작성 중이라면, 인터페이스의 유니온 타입을 사용하는 게 더 알맞지는 않을지 검토해 봐야 한다.
- 벡터를 그리는 프로그램을 작성 중이고, 특정한 기하학적 타입을 가지는 계층의 인터페이스를 정의한다고 가정해 보자.

  ```
  interface Layer {
    layout: FillLayout | LineLayout | PointLayout;
    paint: FillPaint | LinePaint | PointPaint;
  }
  ```

  layout 속성은 모양이 그려지는 방법과 위치(둥근 모서리, 직선)를 제어하는 반면, paint 속성은 스타일(파란선, 굵은선, 얇은선, 점선)을 제어한다.

  <br>

  layout이 LineLayout이면서 paint 속성이 FillPaint 타입인 것은 말이 되지 않는다. 이런 조합을 허용한다면 라이브러리에서는 오류가 발생하기 십상이고 인터페이스를 다루기도 어려울 것이다.

  <br>

  더 나은 방법으로 모델링하려면 각각 타입의 계층을 분리된 인터페이스로 둬야 한다.

  ```
  interface FillLayout {
    layout: FillLayout;
    paint: FillPaint;
  }
  interface LineLayout {
    layout: LineLayout;
    paint: LinePaint;
  }
  interface PointLayout {
    layout: PointLayout;
    paint: PointPaint;
  }
  type Layout = FillLayout | LineLayout | PointLayout;
  ```

  이런 형태로 Layout를 정의하면 layout과 paint 속성이 잘못된 조합으로 섞이는 경우를 방지할 수 있다.

  <br>

  이러한 패턴의 가장 일반적인 예시는 태그된 유니온(또는 구분된 유니온)이다. Layout의 경우 속성 중의 하나는 문자열 리터럴 타입의 유니온이 된다.

  ```
  interface Layout {
    type: 'fill' | 'line' | 'point';
    layout: FillLayout | LineLayout | PointLayout;
    paint: FillPaint | LinePaint | PointPaint;
  }
  ```

  type: 'fill'과 함께 LineLayout과 PointPaint 타입이 쓰이는 것은 말이 되지 않는다. 이러한 경우를 방지하기 위해 Layout을 인터페이스의 유니온으로 변환해 보겠다.

  ```
  interface FillLayer {
    type: 'fill';
    layout: FillLayout;
    paint: FillPaint;
  }
  interface LineLayer {
    type: 'line',
    layout: LineLayout;
    paintL LintPaint;
  }
  interface PointLayer {
    type: 'point';
    layout: PointLayout;
    paint: PointPaint;
  }
  type Layout = FillLayout | LineLayout | PointLayout;
  ```

  type 속성은 '태그'이며 런타임에 어떤 타입의 Layer가 사용되는지 판단하는 데 쓰인다. 타입스크립트는 태그를 참고하여 Layer의 타입의 범위를 좁힐 수 있다.

  ```
  function drawLayer(layer: Layer) {
    if (layer.type === 'fill') {
      const { paint } = layer; // 타입이 FillPaint
      const { layout } = layer; // 타입이 FillLayout
    } else if (layer.type === 'line') {
      const { paint } = layer; // 타입이 LinePaint
      const { layout } = layer; // 타입이 LineLayout
    } else {
      const { paint } = layer; // 타입이 PointPaint
      const { layout } = layer; // 타입이 PointLayout
    }
  }
  ```

  각 타입의 속성들 간의 관계를 제대로 모델링하면, 타입스크립트가 코드의 정확성을 체크하는 데 도움이 된다. 다만 타입 분기 후 layer가 포함된 동일한 코드가 반복되는 것이 어수선해 보인다.

  <br>

- 태그된 유니온은 타입스크립트 타입 체커와 잘 맞기 때문에 타입스크리브 코드 어디서에서나 찾을 수 있다.
- 이 패턴을 잘 기억해서 필요할 때 적용할 수 있도록 해야 한다.
- 어떤 데이터 타입을 태그된 유니온으로 표현할 수 있다면, 보통은 그렇게 하는 것이 좋다.
- 또는 여러 개의 선택적 필드가 동시에 값이 있거나 동시에 undefined인 경우도 태그된 유니온 패턴이 잘 맞는다.
- 다음 코드의 타입을 보자.

  ```
  interface Person {
    name: string;
    // 다음은 둘 다 동시에 있거나 동시에 없다.
    placeOfBirth: string;
    dateOfBirth: Date;
  }
  ```

  타입 정보를 담고 있는 주석은 문제가 될 소지가 매우 높다. placeOfBirth와 dateOfBirth 필드는 실제로 관련되어 있지만, 타입 정보에는 어떠한 관계도 표현되지 않았다.

  <br>

  두 개의 속성을 하나의 객체로 모으는 것이 더 나은 설계이다. 이 방법은 null 값을 경계로 두는 방법과 비슷하다.

  ```
  interface Person {
    name: string;
    birth?: {
      place: string;
      date: Date;
    }
  }
  ```

  이제 place만 있고 date가 없는 경우에는 오류가 발생한다.

  ```
  const alanT: Person = {
    name: 'Alan Turing',
    birth: {
    ~~~~~ 'date' 속성이 '{ place: string; }' 형식에 없지만
          '{ place: string; date: Date; }' 형식에서 필수입니다.
      place: 'London';
    }
  }
  ```

  Person 객체를 매개변수로 받는 함수는 **birth 하나만 체크하면** 된다.

  ```
  function eulogize(p: Person) {
    console.log(p.name);
    const { birth } = p;
    if (birth) {
      console.log(`was born on ${birth.date} in ${birth.place}.`);
    }
  }
  ```

  타입의 구조를 손 댈 수 없는 상화(예를 들어 API의 결과)이면, 앞서 다룬 인터페이스의 유니온을 사용해서 속성 사이의 관계를 모델링할 수 있다.

  ```
  interface Name {
    name: string;
  }
  interface PersonWithBirth extends Name {
    placeOfBirth: string;
    dateOfBirthL: Date;
  }
  type Person = Name | PersonWithBirth;
  ```

  이제 중첩된 객체에서도 동일한 효과를 볼 수 있다.

  ```
  function eulogize(p: Person) {
    if ('placeOfBirth' in p) {
      // p의 타입은 PersonWithBirth
      const { dateOfBirth } = p; // 정상. 타입이 Date
    }
  }
  ```

  앞의 두 경우 모두 타입 정의를 통해 속성 간의 관계를 더 명확하게 만들 수 있다.

---

## 🌱 아이템33. string 타입보다 더 구체적인 타입 사용하기

- string 타입의 범위는 매우 넓다.
- "x"나 "y" 같은 한 글자로, '모비 딕'의 전체 내용도 string 타입이다.
- string 타입으로 변수를 선언하려 한다면, 혹시 그보다 더 좁은 타입이 적절하지는 않을지 검토해 봐야 한다.
- 음악 컬렉션을 만들기 위해 앨범의 타입을 정의한다고 가정해 보자

  ```
  interface Album {
    artist: string;
    title: string;
    releaseDate: string; // YYYY-MM-DD
    recordingType: string; // 예를 들어, 'live' 또는 'studio'
  }
  ```

  string 타입을 남발한 모습이다. 게다가 주석에 타입 정보를 적어둔 걸 보면 현재 인터페이스가 잘못되었다는 것을 알 수 있다. 다음 예시처럼 **Album 타입에 엉뚱한 값을 설정할 수** 있다.

  ```
  const kindOfBlue: Album = {
    artist: 'Miles Davis',
    title: 'Kind of Blue',
    releaseDate: 'August 17th, 1959', // 날짜 형식이 다르다.
    recordingType: 'Studio', // 오타(대문자 S)
  }; // 정상
  ```

  releaseDate 필드의 값은 주석에 설명된 형식과 다르며, recordingType 필드의 값 "Studio"는 소문자 대신 대문자가 쓰였다. 그러나 이 두 값 모두 문자열이고, 해당 객체는 Album 타입에 할당 가능하며 타입 체커를 통과한다.

  <br>

  또한 string 타입의 범위가 넓기 때문에 제대로 된 Album 객체를 사용하더라도 **매개변수 순서가 잘못된 것이 오류로 드러나지 않는다.**

  ```
  function recordRelease(title: string, date: string) { ... }
  recordRelease(kindOfBlue.releaseDate, kindOfBlue.title); // 오류여야 하지만 정상
  ```

  recordRelease 함수의 호출에서 매개변수들의 순서가 바뀌었지만, 둘 다 문자열이기 때문에 타입 체커가 정상적으로 인식한다. 앞의 예제처럼 string 타입이 남용된 코드를 "문자열을 남발하여 선언되었다(stringly typed)"고 표현하기도 한다.

  <br>

- 앞의 오류를 방지하기 위해 타입의 범위를 좁히는 방법을 생각해보자.

  ```
  type RecordingType = 'studio' | 'live';

  interface Album {
    artist: string;
    title: string;
    releaseDate: Date;
    recordingType: RecordingType;
  }
  ```

  위와 같은 방식에는 세 가지 장점이 더 있다.

  - 첫 번째, 타입을 명시적으로 정의함으로써 다른 곳으로 값이 전달되어도 타입 정보가 유지된다.
    예를 들어, 특정 레코딩 타입의 앨범을 찾는 함수를 작성한다면 다음처럼 정의할 수 있다.

    ```
    function getAlbumOfType(recordingType: string): Album[] {
      // ...
    }
    ```

    getAlbumOfType 함수를 호출하는 곳에서 recordingType의 값이 string타입이어야 한다는 것 외에는 다른 정보가 없다. 주석으로 써놓은 "studio" 또는 "live"는 Album의 정의에 숨어 있고, 함수를 사용하는 사람은 recordingType이 "studio" 또는 "live"여야 한다는 것을 알 수 없다.

    <br>

  - 두 번째, 타입을 명시적으로 정의하고 해당 타입의 의미를 설명하는 주석을 붙여 넣을 수 있다.
    ```
    /** 이 녹음은 어떤 환경에서 이루어졌는지? */
    type RecordingType = 'live' | 'studio';
    ```
    getAlbumOfType이 받는 매개변수를 string 대신 RecordingType으로 바꾸면, 함수를 사용하는 곳에서 RecordingType의 설명을 볼 수 있다.

  <br>

  - 세 번째, keyof 연산자로 더욱 세밀하게 객체의 속성 체크가 가능해진다.

<br>

- 함수의 매개변수에 string을 잘못 사용하는 일은 흔하다.
- 어떤 배열에서 한 필드의 값만 추출하는 함수를 작성한다고 생각해보자.
- 실제로 언더스코어(Underscore) 리어브러리에는 pluck이라는 함수가 있다.

  ```
  function pluck(records, key) {
    return records.map(r => r[key]);
  }
  ```

  pluck 함수의 시그니처를 다음처럼 작성할 수 있다.

  ```
  function pluck(records: any[], key: string): any[] {
    return records.map(r => r[key]);
  }
  ```

  타입 체크가 되긴 하지만 any 타입이 있어서 정밀하게 못한다. 특히 반환 값에 any를 사용하는 것은 매우 좋지 않은 설계이다. 먼저 타입 시그니처를 개선하는 첫 단계로 제너릭 타입을 도입해 보자.

  ```
  function pluck<T>(records: T[], key: string): any[] {
    return records.map(r => r[key]);
                          // ~~~~~~ '{}' 형식에 인덱스 시그니처가 없으므로
                          //         요소에 암시적으로 'any' 형식이 있습니다.
  }
  ```

  이제 타입스크립트는 key의 타입이 string이기 때문에 범위가 너무 넓다는 오류를 발생시킨다. Album의 배열을 매개변수로 전달하면 기존의 string 타입의 넓은 범위와 반대로, key는 단 네 개의 값("artist", "title", "releaseDate", "recordingType")만이 유효하다. 다음 예시는 keyof Album 타입으로 얻게 되는 결과이다.

  ```
  type K = keyof Album;
  // 탸입이 "artist" | "title" | "releaseDate" | "recordingType"
  ```

  그러므로 string의 keyof T로 바꾸면 된다.

  ```
  function pluck<T>(records: T[], key: keyof T) {
    return records.map(r => r[key])
  }
  ```

  이 코드는 타입 체커를 통과한다. 또한 타입스크립트가 반환 타입을 추론할 수 있게 해준다. pluck 함수에 마우스를 올려 보면, 추론된 타입을 알 수 있다.

  ```
  function pluck<T>(records: T[], key: keyof T): T[keyof T][]
  ```

  T[keyof T]는 T 객체 내의 가능한 모든 값의 타입이다.

  <br>

  그런데 key의 값으로 하나의 문자열을 넣게 되면, 그 범위가 너무 넓어서 적절한 타입이라고 보기 어렵다. 예를 들어보자

  ```
  const releaseDates = pluck(albums, 'releaseDate'); // 타입이 (string | Date)[]
  ```

  releaseDate의 타입은 (string | Date)[]가 아니라 Date[]이어야 한다. keyof T는 string에 비하면 훨씬 범위가 좁기는 하지만 그래도 여전히 넓다. 따라서 범위를 좁히기 위해서, keyof T의 부분 집합(아마도 단일 값)으로 두 번째 제너릭 매개변수를 도입해야 한다.

  ```
  function pluck<T, K extends keyof T>(records: T[], key: K): T[k][] {
    return records.map(r => r[key]);
  }
  ```

  이제 타입 시그니처가 완벽해졌다. pluck을 여러 가지 방법으로 호출하면서 제대로 반환 타입이 추론되는지, 무효한 매개변수를 방지할 수 있는지 확인해 볼 수 있다.

  ```
  pluck(albums, 'releaseDate'); // 타입이 Date[]
  pluck(albums, 'artist'); // 타입이 string[]
  pluck(albums, 'recordingType'); // 타입이 RecordingType[]
  pluck(albums, 'recordingDate');
               // ~~~~~~~~~~~~~ '"recordingDate"' 형식의 인수는
                                 ... 형식의 매개변수에 할당될 수 없습니다.

  ```

  매개변수 타입이 정밀해진 덕분에 언어 서비스는 Album의 키에 자동 완성 기능을 제공할 수 있게 해준다.

<br>

- string은 any와 비슷한 문제를 가지고 있다.
- 따라서 잘못 사용하게 되면 무효한 값을 허용하고 타입 간의 관계도 감추어 버린다.
- 이러한 문제점은 타입 체커를 방해하고 실제 버그를 찾지 못하게 만든다.
- 타입스크립트에서 string의 부분 집합을 정의할 수 있는 기능은 자바스크립트 코드에 타입 안전성을 높인다.
- 보다 정확한 타입을 사용하면 오류를 방지하고 코드의 가독성도 향상시킬 수 있다.

---

## 🌱 아이템34. 부정확한 타입보다는 미완성 타입을 사용하기

- 타입 선언을 작성하다 보면 코드의 동작을 더 구체적으로 또는 덜 구체적으로 모델링하게 되는 상황을 맞닥뜨리게 된다.
- 일반적으로 타입이 구체적일수록 버그를 더 많이 잡고 타입스크립트가 제공하는 도구를 활용할 수 있게 된다.
- 그러나 타입 선언의 정밀도를 높이는 일에는 주의를 기울여야 한다.
- 실수가 발생하기 쉽고 잘못된 타입은 차라리 타입이 없는 것보다 못할 수 있기 때문이다.

<br>

- 아이템31에서 보았던 GeoJSON 형식의 타입 선언을 작성한다고 가정해 보자.
- GeoJSON 정보는 각각 다른 형태의 좌표 배열을 가지는 몇 가지 타입 중 하나가 될 수 있다.

  ```
  interface Point {
    type: 'Point';
    coordinates: number[];
  }
  interface LineString {
    type: 'LineString';
    coordinates: number[][];
  }
  interface Polygon {
    type: 'Polygon';
    coordinates: number[][][];
  }
  type Geometry = Point | LineString | Polygon; // 다른 것들도 추가될 수 있습니다.
  ```

  큰 문제는 없지만 좌표에 쓰이는 number[]가 약간 추상적이다. 여기서 number[]는 경도와 위도를 나타내므로 튜플 타입으로 선언하는 것이 낫다.

  ```
  type GeoPosition = [number, number];
  interface Point {
    type: 'Point';
    coordinates: GeoPosition;
  }
  ```

  타입을 더 구체적으로 개선했기 때문에 더 나은 코드가 된 것 같다. 안타깝게도 **새로운 코드가 빌드를 깨뜨린다며 불평**하는 사용자들의 모습만 보게 될 것이다.

  <br>

  코드에는 위도와 경도만을 명시했지만, GeoJSON의 위치 정보에는 세 번째 요소인 고도가 있을 수 있고 또 다른 정보가 있을 수 있다.

  <br>

  결과적으로 타입 선언을 세밀하게 만들고자 했지만 시도가 너무 과했고 오히려 타입이 부정확해졌다.

  <br>

  현재의 타입 선언을 그대로 사용하려면 사용자들은 타입 단언문을 도입하거나 as any를 추가해서 타입 체커를 완전히 무시해야 한다.

  <br>

- 이번에는 JSON으로 정의된 Lisp와 비슷한 언어의 타입 선언을 작성한다고 생각해보자.

  ```
  ["+", 1, 2] // 3
  ["/", 20, 2] // 10
  ["case", [">", 20, 10], "red", "blue"] // "red"
  ["rgb", 255, 0, 177] // "#FF007F"
  ```

  맵박스(Mapbox) 라이브러리는 이런 시스템을 사용하여 수많은 기기에서 지도 기능의 형태를 결정한다. 다음은 이런 동작을 모델링해 볼 수 있는 입력값의 전체 종류이다.

  ```
  1. 모두 허용
  2. 문자열, 숫자, 배열 허용
  3. 문자열, 숫자, 알려진 함수 이름으로 시작하는 배열 허용
  4. 각 함수가 받는 매개변수의 개수가 정확한지 확인
  5. 각 함수가 받는 매개변수의 타입이 정확한지 확인
  ```

  처음 두 개 옵션은 간단하다.

  ```
  type Expression1 = any;
  type Expression2 = number | string | any[];
  ```

  또한 표현식의 유효성을 체크하는 테스트 세트를 도입해 본다. 타입을 더 구체적으로 만들수록 정밀도가 손상되는 것을 방지하는 데 도움이 된다.

  ```
  const tests: Expression2[] = [
    10,
    "red",
    true,
  //~~~~ 'true' 형식은 'Expression2' 형식에 할당할 수 없습니다.
    ["+", 10, 5],
    ["case", [">", 20, 10], "red", "blue", "green"], // 값이 너무 많습니다.
    ["**", 2, 31], // "**"는 함수가 아니므로 오류가 발생해야 합니다.
    ["rgb", 255, 128, 64],
    ["rgb", 255, 0, 127, 0] // 값이 너무 많습니다.
  ];
  ```

  정밀도를 한 단계 더 끌어 올리기 위해서 튜플의 첫 번째 요소에 문자열 리터럴 타입의 유니온을 사용해 보자.

  ```
  type FnName = '+' | '-' | '*' | '/' | '>' | '<' | 'case' | 'rgb';
  type CallExpression = [FnName, ...any[]];
  type Expression3 = number | string | CallExpression;

  const tests: Expression3[] = [
    10,
    "red",
    true,
  //~~~~~ 'true' 형식은 'Expression3' 형식에 할당할 수 없다.
    ["+", 10, 5],
    ["case", [">", 20, 10], "red", "blue", "green"],
    ["**", 2, 31],
  //~~~~~~~~~~~~~~ '"**"'형식은 'FnName' 형식에 할당할 수 없습니다.
    ["rgb", 255, 128, 64],
  ]
  ```

  정밀도를 유지하면서 오류를 하나 더 잡았다.

  <br>

  각 함수의 매개변수 개수가 정확한지 확인하기 위해 모든 함수 호출을 확인할 수도 있지만 재귀적으로 동작하기 때문에 좋은 방법은 아니다. 타입스크립트 3.6에서는 함수의 매개변수 개수를 알아내기 위해 최소한 하나의 인터페이스를 추가해야 한다.

  <br>

  여러 인터페이스를 호출 표현식으로 한번에 묶을 수는 없기 때문에, 각 인터페이스를 나열해서 호출 표현식을 작성해야 한다.

  <br>

  고정 길이 배열은 튜플 타입으로 가장 간단히 표현할 수 있기 때문에, 어색해 보일 수는 있지만 다음 코드처럼 구현할 수 있다.

  ```
  type Expression4 = number | string | CallExpression;

  type CallExpression = MathCall | CaseCall | RGBCall;

  interface MathCall {
    0: '+' | '-' | '/' | '*' | '>' | '<';
    1: Expression4;
    2: Expression4;
    length: 3;
  }

  interface CaseCall {
    0: 'case';
    1: Expression4;
    2: Expression4;
    3: Expression4;
    length: 4 | 6 | 8 | 10 | 12 | 14 | 16 // 등등
  }

  interface RGBCall {
    0: 'rgb';
    1: Expression4;
    2: Expression4;
    3: Expression4;
    length: 4;
  }

  const tests: Expression4[] = [
    10,
    "red",
    true,
  //~~~~~ 'true' 형식은 'Expression4' 형식에 할당할 수 없습니다.
    ["+", 10, 5],
    ["case", [">", 20, 10], "red", "blue", "green"],
           // ~~~~~~~~~~~
           // ["case", [">", ...], ...] 형식은 'string' 형식에 할당할 수 없습니다.
    ["**", 2, 31],
        // ~  ~~~ 'number' 형식은 'string' 형식에 할당할 수 없습니다.
    ["rgb", 255, 128, 64],
    ["rgb", 255, 128, 64, 73]
    //      ~~~~ ~~~  ~~  ~~  'number' 형식은 'string' 형식에 할당할 수 없습니다.
  ]
  ```

  이제 무효한 표현식에서 전부 오류가 발생한다. 이 코드에서는 타입스크립트 인터페이스를 사용해서 '짝수 길이의 배열' 같은 것을 표현할 수 있다.

  <br>

  그러나 오류가 나면 엉뚱한 메시지를 출력하며, \*\*에 대한 오류는 오히려 이전 버전보다 메시지가 부정확해진다.

  <br>

  타입 정보가 더 정밀해졌지만 결과적으로 이전 버전보다 개선되었다고 보기는 어렵다. 잘못 사용된 코드에서 오류가 발생하기는 하지만 오류 메시지는 더 난해해졌다.

  <br>

  언어 서비스는 타입 체크 못지않게 타입스크립트 경험에서 중요한 부분이므로, 타입 선언으로 인한 오류 메시지를 살펴보고 타입 선언이 동작해야 하는 곳에는 자동 완성을 적용하는 것이 좋다.

  <br>

  새 타입 선언은 더 구체적이지만 자동 완성을 방해하므로 타입스크립트 개발 경험을 해치게 된다.

  <br>

  타입 선언의 복잡성으로 인해 버그가 발생할 가능성도 높아졌다. 예를 들어 Expression4는 모든 수학 연산자에 두 개의 매개변수가 필요하지만, 맵박스 표현식에서는 +와 \*가 더 많은 매개변수를 받을 수 있다. 또한 입력을 음수로 바꿔주는 -는 한 개의 매개변수만 필요하다. Expression4는 이러한 경우들에 잘못된 오류를 표시하게 된다.

  ```
  const okExpressions: Expression4[] = [
    ['-', 12],
       // ~~ 'number' 형식은 'string' 형식에 할당할 수 없습니다.
    ['+', 1, 2, 3],
       // ~  ~  ~  'number' 형식은 'string' 형식에 할당할 수 없습니다.
    ['*', 2, 3, 4],
       // ~  ~  ~ 'number' 형식은 'string' 형식에 할당할 수 없습니다.
  ]
  ```

  **코드를 더 정밀하게 만들려던 시도가 너무 과했고 그로 인해 코드가 오히려 더 부정확해졌다.**

  <br>

  이렇게 부정확함을 바로잡는 방법을 쓰는 대신, **테스트 세트를 추가하여 놓친 부분이 없는지 확인**해도 된다. 일반적으로 복잡한 코드는 더 많은 테스트가 필요하고 타입의 관점에서도 마찬가지이다.

  <br>

  타입을 정제(refine)할 때, '불쾌한 골짜기(uncanny valley)' 은유를 생각해보면 도움이 될 수 있다. 일반적으로 any 같은 매우 추상적인 타입은 정제하는 것이 좋다. 그러나 타입이 구체적으로 정제된다고 해서 정확도가 무조건 올라가지는 않는다. 타입에 의존하기 시작하면 부정확함으로 인해 발생하는 문제는 더 커질 것이다.

---

## 🌱 아이템35. 데이터가 아닌, API와 명세를 보고 타입 만들기

- 이 장의 다른 아이템들에서는 타입을 잘 설계하면 어떠한 이점이 있는지, 반대로 설계가 잘못되면 무엇이 잘못될 수 있는지에 대해서 다루었다.
- 잘 설계된 타입은 타입스크립트 사용을 즐겁게 해 주는 반면, 잘못 설계된 타입은 비극을 불러온다.😵‍💫
- 이러한 양면성 때문에 타입 설계를 잘 해야 한다는 압박감이 느껴질 수 있다.
- 이런 상황에서 타입을 직접 작성하지 않고 자동으로 생성할 수 있다면 매우 유용할 것이다.

<br>

- 파일 형식, API, 명세(specification) 등 우리가 다루는 타입 중 최소한 몇 개는 프로젝트 외부에서 비롯된 것이다.
- 이러한 경우는 **타입을 직접 작성하지 않고 자동으로 생성할 수 있다.**
- 여기서 핵심은, **예시 데이터가 아니라 명세를 참고해 타입을 생성한다는 것이다.**
- 명세를 참고해 타입을 생성하면 타입스크립트는 사용자가 실수를 줄일 수 있게 도와준다.
- 반면에 예시 데이터를 참고해 타입을 생성하면 눈앞에 있는 데이터들만 고려하게 되므로 예기치 않은 곳에서 오류가 발생할 수 있다.

<br>

- 아이템31에서 Feature의 경계 상자를 계산하는 calculateBoundingBox 함수를 사용했다. 실제 구현은 다음과 같은 모습이다.

  ```
  function calculateBoundingBox(f: Feature): BoundingBox | null {
    let box: BoundingBox | null = null;

    const helper = (coords: any[]) => {
      // ...
    }

    const { geometry } = f;
    if (geometry) {
      helper(geometry.coordinates);
    }

    return box;
  }
  ```

  Feature 타입은 명시적으로 정의된 적이 없다. 아이템 31에 등장한 focusOnFeature 함수 예제를 사용하여 작성해 볼 수 있다. 그러나 공식 GeoJSON 명세를 사용하는 것이 더 낫다. 다행히도 DefinitelyTyped에는 이미 타입스크립트 타입 선언이 존재한다. 따라서 다음과 같이 익숙한 방법을 이용해 추가할 수 있다.

  ```
  $ npm i -D @types/geojson
  ```

  GeoJSON 선언을 넣는 순간, 타입스크립트는 오류를 발생시킨다.

  ```
  import {Feature} from 'geojson';

  function calculateBoundingBox(f: Feature): BoundingBox | null {
    let box: BoundingBox | null = null;

    const helper = (coords: any[]) => {
      // ...
    }

    const { geometry } = f;
    if (geometry) {
      helper(geometry.coordinates);
                   // ~~~~~~~~~~~
                   // 'Geometry' 형식에 'coordinates' 속성이 없습니다.
                   // 'GeometryCollection' 형식에
                   // 'coordinates' 속성이 없습니다.
    }

    return box;
  }
  ```

  geometry에 coordinates 속성이 있다고 가정한 게 문제입니다. 이러한 관계는 점, 선, 다각형을 포함한 많은 도형에서는 맞는 개념이다. 그러나 GeoJSON은 다양한 (heterogenuous) 도형의 모음인 GeometryCollection일 수도 있다. 다른 도형 타입과 다르게 GeometryCollection에는 coordinates 속성이 없다.

  <br>

  geometry가 GeometryCollection 타입인 Feature를 사용해서 calculateBoundingBox를 호출하면 undefined의 0 속성을 읽을 수 없다는 오류를 발생한다.

  <br>

  이 오류를 고치는 한 가지 방법은 다음 코드처럼 GeometryCollection을 명시적으로 차단하는 것이다.

  ```
  const {geometry} = f;
  if (geometry) {
    if (geometry.type === 'GeometryCollection') {
      throw new Error('GeometryCollections are not supported');
    }
    helper(geometry.coordinates); // 정상
  }
  ```

  타입스크립트는 타입을 체크하는 방법으로 도형의 타입을 정제할 수 있으므로 정제된 타입에 한해서 geometry.coordinates의 참조를 허용하게 된다. 차단된 GeometryCollection 타입의 경우, 사용자에게 명확한 오류 메시지를 제공한다.

  <br>

  그러나 **GeometryCollection 타입을 차단하기보다는 모든 타입을 지원하는 것이 더 좋은 방법**이기 때문에 조건을 분기해서 헬퍼 함수를 호출하면 모든 타입을 지원할 수 있다.

  ```
  const geometryHelper = (geometry: Geometry) => {
    if (geometry.type === 'GeometryCollection') {
      geometry.geometries.forEach(geometryHelper);
    } else {
      helper(geometry.coordinates); // 정상
    }
  }

  const { geometry } = f;
  if (geometry) {
    geometryHelper(geometry);
  }
  ```

  그동안 GeoJSON을 사용해온 경험을 바탕으로 GeoJSON의 타입 선언을 직접 작성했을 수도 있다. 아마도 직접 작성한 타입 선언에는 GeometryCollection 같은 예외 상황이 포함되지 않았을 테고 완벽할 수도 없다. 반면, 명세를 기반으로 타입을 작성한다면 현재까지 경험한 데이터뿐만 아니라 사용 가능한 모든 값에 대해서 작동한다는 확신을 가질 수 있다.

  <br>

  API 호출에도 비슷한 고려 사항들이 적용된다. API의 명세로부터 타입을 생성할 수 있다면 그렇게 하는 것이 좋다. 특히 GraphQL처럼 자체적으로 타입이 정의된 API에서 잘 동작한다.

  <br>

  GraphQL API는 타입스크립트와 비슷한 타입 시스템을 사용하여, 가능한 모든 쿼리와 인터페이스를 명세하는 스키마로 이루어진다. 우리는 이러한 인터페이스를 사용해서 특정 필드를 요청하는 쿼리를 작성한다. 예를 들어, GitHub GraphQL API를 사용해서 저장소에 대한 정보를 얻는 코드는 다음처럼 작성할 수 있다.

  ```
  query {
    repository(owner: "Microsoft", name: "TypeScript") {
      createdAt
      description
    }
  }
  ```

  결과는 다음과 같다.

  ```
  {
    "data": {
      "repository": {
        "createdAt": "2014-06-17T15:28:39Z",
        "description": "TypeScript is a superset of JavaScript that compiles to JavaScript."
      }
    }
  }
  ```

  **⭐ GraphQL의 장점은 특정 쿼리에 대해 타입스크립트 타입을 생성할 수 있다는 것이다.** GeoJSON 예제와 마찬가지로 GraphQL을 사용한 방법도 타입에 null이 가능한지 여부를 정확하게 모델링할 수 있다.

  <br>

  다음 예제는 GitHub 저장소에서 오픈 소스 라이선스를 조회하는 쿼리이다.

  ```
  query getLicense($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      description
      licenseInfo {
        spdxId
        name
      }
    }
  }
  ```

  $owner와 $name은 타입이 정의된 GraphQL의 변수이다. 타입 문법이 타입스크립트와 매우 비슷하다. String은 GraphQL의 타입이다. 타입스크립트에서는 string이 된다. 그리고 타입스크립트에서 string 타입은 null이 불가능하지만 GraphQL의 String 타입에서는 null이 가능하다. 타입 뒤의 !는 null이 아님을 명시한다.

  <br>

  GraphQL 쿼리를 타입스크립트 타입으로 변환해 주는 많은 도구가 존재한다. 그중 하나는 Apollo이다. 다음은 Apollo를 어떻게 사용하는지 보여준다.

  ```
  $ apollo client:codegen \
      --endpoint https://api.github.com/graphql \
      --includes license.graphql \
      --target typescript
   Loading Apollo Project
   Generating query files with 'typescript' target - wrote 2 files
  ```

  쿼리에서 타입을 생성하려면 **GraphQL의 스키마가 필요**하다. Apollo는 `api.github.com/graphql`로부터 스키마를 얻는다. 실행의 결과는 다음과 같다.

  ```
  export interface getLicense_repository_licenseInfo {
    __typename: "License";
    /** Short identifier specified by <https://spdx.org/licenses> */
    spdxId: string | null;
    /** The license full name specified by <https://spdx.org/licenses> */
    name: string;
  }

  export interface getLicense_repository {
    __typename: "Repository";
    /** The description of the repository */
    description: string | null;
    /** The license associated with the repository */
    licenseInfo: getLicense_repository_licenseInfo | null;
  }

  export interface getLicense {
    /** Lookup a given repository by the owner and repository name. */
    repository: getLicense_repository | null;
  }

  export interface getLicenseVariable {
    owner: string;
    name: string;
  }
  ```

  주목할 만한 점은 다음과 같다.

  - 쿼리 매개변수(getLicenseVariable)와 응답(getLicense) 모두 인터페이스가 생성되었다.
  - null 가능 여부는 스키마로부터 응답 인터페이스로 변환되었다. repository, description, licenseInfo, spdxId 속성은 null이 가능한 반면, name과 쿼리에 사용된 변수들은 그렇지 않다.
  - 편집기에서 확인할 수 있도록 주석은 JSDoc으로 변환되었다. 이 주석들은 GraphQL 스키마로부터 생성되었다.

  <br>

  자동으로 생성된 타입 정보는 API를 정확히 사용할 수 있도록 도와준다. 쿼리가 바뀐다면 타입도 자동으로 바뀌며 스키마가 바뀐다면 타입도 자동으로 바뀐다.

  <br>

  **타입은 단 하나의 원천 정보인 GraphQL 스키마로부터 생성되기 때문에 타입과 실제 값이 항상 일치한다.**

  <br>

  만약 명세 정보나 공식 스키마가 없다면 데이터로부터 타입을 생성해야 한다. 이를 위해 quicktype과 같은 도구를 사용할 수 있다. 그러나 생성된 타입과 실제 데이터와 일치하지 않을 수 있다는 점을 주의해야 한다. 예외적인 경우가 존재할 수 있다.

  <br>

  우리는 이미 자동 타입 생성의 이점을 누리고 있다. 브라우저 DOM API에 대한 타입 선언은 공식 인터페이스로부터 생성되었다. 이를 통해 복잡한 시스템을 정확히 모델링하고 타입스크립트가 오류나 코드상의 의도치 않은 실수를 잡을 수 있게 한다.

---

## 🌱 아이템36. 해당 분야의 용어로 타입 이름 짓기

<p align="center">컴퓨터 과학에서 어려운 일은 단 두가지뿐이다. 캐시 무효화와 이름 짓기. - 필 칼튼</p>

- 이름 짓기 역시 타입 설계에서 중요한 부분이다.
- 엄선된 타입, 속성, 변수의 이름은 의도를 명확히 하고 코드와 타입의 추상화 수준을 높여 준다.
- 잘못 선택한 타입 이름은 코드의 의도를 왜곡하고 잘못된 개념을 심어 주게 된다.
- 동물들의 데이터베이스를 구축한다고 가정해 보자. 이를 표현하기 위한 인터페이스는 다음과 같다.

  ```
  interface Animal {
    name: string;
    endangered: boolean;
    habitat: string;
  }

  const leopard: Animal = {
    name: 'Snow Leopard',
    endangered: false,
    habitat: 'tundra',
  };
  ```

  이 코드에는 네 가지 문제점이 있다.

  - name은 매우 일반적인 용어이다. 동물의 학명인지 일반적인 명칭인지 알 수 없다.
  - endangered 속성이 멸종 위기를 표현하기 위해 boolean 타입을 사용한 것이 이상하다. 이미 멸종된 동물은 true로 해야 하는지 판단할 수 없다. endangered 속성의 의도를 '멸종 위기 또는 멸종'으로 생각한 것일지도 모른다.
  - 서식지를 나타내는 habitat 속성은 너무 범위가 넓은 string 타입일 뿐만 아니라 서식지라는 뜻 자체도 불분명하기 때문에 다른 속성들보다도 훨씬 모호하다.
  - 객체의 변수명이 leopard이지만, name 속성의 값은 'Snow leopard'이다. 객체의 이름과 속성의 name이 다른 의도로 사용된 것이닞 불분명하다.

  <br>

  이 예제의 문제를 해결하려면, 속성에 대한 정보가 모호하기 때문에 해당 속성을 작성한 사람을 찾아서 의도를 물어봐야 한다.

  <br>

  반면, 다음 코드의 타입 선언은 의미가 분명하다.

  ```
  interface Animal {
    commonName: string;
    genus: string;
    species: string;
    status: ConservationStatus;
    climates: KoppenClimate[];
  }
  type ConservationStatus = 'EX' | 'EW' | 'CR' | 'EN' | 'VU' | 'NT' | 'LC';
  type KoppenClimate = 'Af' | 'Am' | ... | 'ET';

  const snowLeopard: Animal = {
    commonName: 'Snow Leopard',
    genus: 'Panthera',
    species: 'Uncia',
    status: 'VU', // 취약종
    climates: ['ET', 'EF', 'Dfd'], // 고산대(alpine) 또는 아고산대(subalpine)
  }
  ```

  이 코드는 다음 세가지를 개선했다.

  - name은 commonName, genus, species 등 더 구체적인 용어로 대체했다.
  - endangered는 동물 보호 등급에 대한 IUCN의 표준 분류 체계인 ConservationStatus 타입의 Status로 변경했다.
  - habitat은 기후를 뜻하는 Climates로 변경되었으며, 쾨펜 기후 분류(Koppen climate classification)를 사용한다.

  <br>

  이번 예제에서는 데이터를 훨씬 명확하게 표현하고 있다. 그리고 정보를 찾기 위해 사람에 의존할 필요가 없다.

  <br>

  코드로 표현하고자 하는 모든 분야에는 주제를 설명하기 위한 전문 용어들이 있다. 자체적으로 용어를 만들어 내려고 하지 말고, 해당 분야에 이미 존재하는 용어를 사용해야 한다. 이런 용어들은 수 년, 수십 년, 수 세기에 걸쳐 다듬어져 왔으며 현장에서 실제로 사용되고 있을 것이다.

  <br>

  이런 용어들은 사용하면 사용자와 소통에 유리하며 타입의 명확성을 올릴 수 있다.

  <br>

  전문 분야의 용어는 정확하게 사용해야 한다. 특정 용어를 다른 의미로 잘못 쓰게 되면, 직접 만들어 낸 용어보다 더 혼란을 주게 된다.

  <br>

  타입, 속성, 변수에 이름을 붙일 때 명심해야 할 세 가지 규칙이 있다.

  - **동일한 의미를 나타낼 때는 같은 용어를 사용해야 한다.** 정말로 의미적으로 구분이 되어야 하는 경우에만 다른 용어를 사용해야 한다.
  - data, info, thing, item, object, entity 같은 **모호하고 의미 없는 이름은 피해야** 한다. 만약 entity라는 용어가 해당 분야에서 특별한 의미를 가진다면 괜찮다. 그러나 귀찮다고 무심코 의미 없는 이름을 붙여서는 안 된다.
  - **이름을 지을 때는 포함된 내용이나 계산 방식이 아니라 데이터 자체가 무엇인지를 고려**해야 한다. 좋은 이름은 추상화의 수준을 높이고 의도치 않은 충돌의 위험성을 줄여 준다.

---

## 🌱 아이템37. 공식 명칭에는 상표를 붙이기

- 구조적 타이핑의 특성 때문에 가끔 코드가 이상한 결과를 낼 수 있다. 다음 코드를 보자.

  ```
  interface Vector2D {
    x: number;
    y: number;
  }
  function calculateNorm(p: Vector2D) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
  }

  calculateNorm({x: 3, y: 4}); // 정상. 결과는 5
  calculateNorm({x: 3, y: 4, z: 1}); // 정상! 동일하게 5
  ```

  이 코드는 구조적 타이핑 관점에서는 문제가 없기는 하지만, 수학적으로 따지면 2차원 벡터를 사용해야 이치에 맞다.

  <br>

  calculateNorm 함수가 3차원 벡터를 허용하지 않게 하려면 공식 명칭(nominal typing)을 사용하면 된다. 공식 명칭을 사용하는 것은, 타입이 아니라 값의 관점에서 Vector2D라고 말하는 것이다. **공식 명칭 개념을 타입스크립트에서 흉내 내려면 '상표(brand)'를 붙이면 된다.**

  ```
  interface Vector2D {
    _brand: '2d';
    x: number;
    y: number;
  }
  function vec2D(x: number, y: number): Vector2D {
    return {x, y, _brand2D};
  }
  function calculateNorm(p: Vector2D) {
    return Math.sqrt(p.x * p.x + p.y * p.y); // 기존과 동일
  }

  calculateNorm(vec2D(3, 4)); // 정상, 5를 반환
  calculateNorm({ x: 3, y: 4, z: 1 });
             //  ~~~~~~~~~~~~~~~~~~~~ '_brand' 속성이 ... 형식에 없습니다.
  ```

  상표(\_brand)를 사용해서 calculateNorm 함수가 Vector2D 타입만 받는 것을 보장한다. 그러나 vec3D 값에 \_brand: '2d'라고 추가하는 것 같은 악의적인 사용을 막을 수는 없다. 다만 단순한 실수를 방지하기에는 충분하다.

  <br>

  상표 기법은 타입 시스템에서 동작하지만 런타임에 상표를 검사하는 것과 동일한 효과를 얻을 수 있다. 타입 시스템이기 때문에 런타임 오버헤드를 없앨 수 있고 추가 속성을 붙일 수 없는 string이나 number 같은 내장 타입도 상표화할 수 있다.

  <br>

  예를 들어, 절대 경로를 사용해 파일 시스템에 접근하는 함수를 가정해 보자. 런타임에는 절대 경로('/')로 시작하는지 체크하기 쉽지만, **타입 시스템에서는 절대 경로를 판단하기 어렵기 때문에 상표 기법을 사용**한다.

  ```
  type AbsolutePath = string & {_brand: 'abs'};
  function listAbsolutePath(path: AbsolutePath) {
    // ...
  }
  function isAbsolutePath(path: string): path is AbsolutePath {
    return path.startsWith('/');
  }
  ```

  string 타입이면서 \_brand 속성을 가지는 객체를 만들 수는 없다. AbsolutePath은 온전히 타입 시스템의 영역이다.

  <br>

  만약 path 값이 절대 경로와 상대 경로 둘 다 될 수 있다면, 타입을 정제해 주는 타입 가드를 사용해서 오류를 방지할 수 있다.

  ```
  function f(path: string) {
    if (isAbsolutePath(path)) {
      listAbsolutePath(path);
    }
    listAbsolutePath(path);
                  // ~~~~~ 'string' 형식의 인수는 'AbsolutePath' 형식의
                  // 매개변수에 할당될 수 없습니다.
  }
  ```

  if 체크로 타입을 정제하는 방식은 매개변수 path가 절대 경로인지 또는 상대 경로인지에 따라 분기하기 때문에 분기하는 이유를 주석으로 붙이기에도 좋다.

  <br>

  반면, 로직을 분기하는 대신 오류가 발생한 곳에 path as AbsolutePath를 사용해서 오류를 제거할 수도 있지만 단언문은 지양해야 한다. 단언문을 쓰지 않고 AbsolutePath 타입을 얻기 위한 유일한 방법은 AbsolutePath 타입을 매개변수로 받거나 타입이 맞는지 체크하는 것뿐이다.

  <br>

  **상표 기법은 타입 시스템 내에서 표현할 수 없는 수많은 속성들을 모델링하는 데 사용되기도 한다.** 예를 들어, 목록에서 한 요소를 찾기 위해 이진 검색을 하는 경우를 들어보겠다.

  ```
  function binarySearch<T>(xs: T[], x: T): boolean {
    let low = 0, high = xs.length - 1;
    while (high >= low) {
      const mid = low + Math.floor((high - low) / 2);
      const v = xs[mid];
      if (v === x) return true;
      [low, high] = x > v ? [mid + 1, high] : [low, mid - 1];
    }
    return false;
  }
  ```

  이진 검색은 이미 정렬된 상태를 가정하기 때문에, 목록이 이미 정렬되어 있다면 문제가 없다. 하지만 목록이 정렬되어 있지 않다면 잘못된 결과가 나온다. 타입스크립트 **타입 시스템에서는 목록이 정렬되어 있다는 의도를 표현하기 어렵다.** 따라서 다음 예제처럼 상표 기법을 사용해 보자.

  ```
  type SortedList<T> = T[] & {_brand: 'sorted'};

  function isSorted<T>(xs: T[]): xs is SortedList<T> {
    for (let i=1; i<xs.length; i++) {
      if (xs[i] < xs[i-1]) {
        return false;
      }
    }
    return true
  }

  function binarySearch<T>(xs: SortedList<T>, x: T): boolean {
    // ...
  }
  ```

  binarySearch를 호출하려면, 정렬되어있다는 상표가 붙은 SortedList 타입의 값을 사용하거나 isSorted를 호출하여 정렬되었음을 증명해야 한다. isSorted에서 목록 전체를 루프 도는 것은 효율적인 방법은 아니지만 적어도 안전성은 확보할 수 있다.

  <br>

  앞의 예제는 타입 체커를 유용하게 사용하는 일반적인 패턴이다. 예를 들어, 객체의 메서드를 호출하는 경우 null이 아닌 객체를 받거나 조건문을 사용해서 해당 객체가 null이 아닌지 체크하는 코드와 동일한 형태이다.

  <br>

  number 타입에서도 상표를 붙일 수 있다. 예를 들어, 단위를 붙여 보겠다.

  ```
  type Meters = number & {_brand: 'meters'};
  type Seconds = number & {_brand: 'seconds'};

  const meters = (m: number) => m as Meters;
  const seconds = (s: number) => s as Seconds;

  const oneKim = meters(1000); // 타입이 number
  const oneMin = seconds(60); // 타입이 number
  ```

  number 타입에 상표를 붙여도 산술 연산 후에는 상표가 없어지기 때문에 설계로 사용하기에는 무리가 있다.

  ```
  const temKim = oneKim * 10; // 타입이 number
  const v = oneKim / OneMin;
  ```

  그러나 이 코드에 여러 단위가 혼합된 많은 수의 숫자가 들어 있는 경우, 숫자의 단위를 문서화하는 괜찮은 방법일 수 있다.
