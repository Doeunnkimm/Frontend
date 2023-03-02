const {useState} = require('react');

const useInputs = (initialValues) => {
  const [values, setValues] = useState(initialValues); // initialValues에는 email과 password가 키값이고 각각 빈값을 가진 객체가 들어올 것

  const onChange = (event) => {
    setValues((prev) => ({
      // 소괄호로 객체를 바로 리턴
      ...prev,
      // 객체는 기존에 있던 키의 값이 들어오면
      // 그 키 값을 수정하게 됨
      [event.target.name]: event.target.value,
    }));

    /*
        {
            email: "",
            password: "",
        }

        state 불변성(값이나 상태가 변경할 수 없는 것)

        state는 이전 상태값과 비교하여 값이 달라졌는지 확인하고
        값이 달라졌으면 렌더링

        Object
        이전 참조값과 현재 참조값만을 비교하여 상태 변화를 감지하고 렌더링
        리액트에서 오브젝트(배열, 객체)의 원본 데이터가 변경되면
        상태 변화를 감지할 수 없으므로 깊은 복사를 통하여 새로운 참조값을 생성하고
        해당 참조값을 가진 오브젝트로 업데이트

        띠라서 이렇게 되면 원본 데이터 <--> 새로운 참조값 데이터를 비교할 수 있고
        화면을 렌더링할 수 있다.

        이점 사이드 이펙트(외부효과)의 배제를 통한 예상치 못한(엣지 케이스)를 방지
        리액트의 state는 하나의 컴포넌트가 참조하는 것이 아니라
        굉장히 많은 컴포넌트가 참조할 수 있다.

        그러나 한 가지 기능을 위하여 state의 값이 수정되면
        해당 상태를 참조하고 있는 다른 components에서 예상치 못하는 에러가 발생할 수 있다.

        1. 효율적인 상태 업데이트
            얕은 비교를 통해 (객체의 속성값을 일일이 확인하지 않아도)
            참조 값만을 비교하여 상태를 업데이트하기 떄문에, 효율적으로 cost를 줄이고 효율적으로 상태를 업데이트 할 수 있다.

        2. 사이드 이펙트 방지

        => 깊은 복사를 통한 얕은 비교로 상태를 업데이트한다.

    */
  };
  return [values, onChange, setValues];
};
export default useInputs;
