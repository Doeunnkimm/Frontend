{
  /*
    enum
    as const
    ReturnType

*/

  // enum은 어떠한 상태일 때 검사하는 용도로 사용됨
  // enum 타입은 해당 값이 enum으로 정의된 타입 안에 있는지 없는지
  // 열거형 데이터와 일치하는지 검사
  // 비슷한 용도로 객체로 선언하여 사용 가능(const, type Alias)를 사용해도 같은 효과를 볼 수 있지만
  // 선언하는 용도가 다름. 안에 데이터 값이 있는지 검사만 할 때는 enum
  // 얘가 하나의 객체로서 사용되고 있는가

  // enum은 타입으로 사용할 수 있고 값으로도 사용할 수 있다

  // '객체'의 용도를 잘 생각해보자
  // ==> enum은 굳이 객체 타입으로 선언하지 않아도 값을 검사할 수가 있음
  // 용도를 구분해서 사용하고 싶다면 객체를 왜 쓰는지를 생각해보자

  enum State {
    Idle,
    Loading,
    Success,
    Failure,
  }

  const StateObj = {
    Idle: 'Idle',
    Loading: 'Loading',
    Success: 'Success',
    Failure: 'Failure',
  } as const;
  // as const readonly 타입이 됨. 객체라고 하더라도 수정이 불가능
  // COLORS와 같은 수정이 되지 않은 상수의 객체는 as const를 활용하여 readonly 상태를 만들고
  // 그 값을 타입으로써 사용이 가능
  // 객체의 변경을 방지하고 안전한 상황에서 프로그래밍 할 수 있다.

  type StateAlias = 'Idle' | 'Loading';

  let state: State = State.Loading; // 값o, 타입o --> 열거형 값이 있는지 확인할 때
  let stateObj = StateObj.Idle; // 값o, 타입x --> 수정이 안 되는 객체를 만들 때
  let stateAlias: StateAlias = 'Idle'; // 값x, 타입o --> 일차적으로 타입검사만 할 때

  function add(state: State) {
    if (state === State.Idle) {
      let state = State.Loading;
    }
  }
}
