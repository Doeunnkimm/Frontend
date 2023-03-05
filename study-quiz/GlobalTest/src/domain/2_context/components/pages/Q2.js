import { useState } from 'react';
import NavigateButton from '../../../../components/NavigateButton';
import UserProvider, { useUserContext } from '../../../../store/3_context';
import ContextQ2Form from '../atom/Q2/Form';
import ContextQ2Form3 from '../atom/Q2/Form3';

const ContextQ2Page = () => {
  /*
    문제 2 - 2
      1. Form1에서 값을 입력하면 userList에 데이터가 추가되도록 구현해보세요
      2. Form2에서 버튼을 클릭하면 userList의 각 요소에 isEdit: true의 속성이 추가되도록 구현해보세요
      3. Form3에서 reset 버튼을 클릭하면 userList를 초기화 시키도록 구현해보세요
      4. 제출 버튼을 누르면 isEdit true인 userList만 console.log로 출력해보세요
        (단, isEdit이 true인 데이터도 전역으로 관리해주세요.)
  */

  // const [userList, setUserList] = useState([
  //   { id: 1, name: '홍길동', nickname: '히히' },
  // ]);

  /*
    단, userList 상태 관리는 전역으로 관리하고 비즈니스 로직도 분리하기 위해
    useReducer, useContext를 사용하여 구현해보세요

    (일반 state를 사용하는 문제가 아니기 때문에 전역으로 상태관리를 할 수 있도록 해주세요)

    관련 로직은 src/store/3_context.js에 구현해주세요
  */

  const userList = useUserContext();

  const onSubmitUserList = () => {
    const submitUserList = userList.filter((user) => user.isEdit);
    console.log(submitUserList);
  };

  return (
    <>
      <h2>문제 2 - 2</h2>
      <ContextQ2Form />
      <ContextQ2Form3 />
      <div
        style={{
          marginTop: '32px',
        }}
      >
        <button onClick={onSubmitUserList}>SUBMIT</button>
      </div>
      <NavigateButton to={'/3_redux/q1'} />
    </>
  );
};
export default ContextQ2Page;

/*
  useContext를 통해 저장소를 만들고 useReducer로는 상태를 업데이트하는 로직을 분리한다.
  
    이 두 hook 함수를 같이 쓰게 되면 ?
      --> 분리한 로직 역시도 저장소에 담아서 업데이트하는 로직을 전역에서 사용할 수 있게 된다

  
    1. 저장소를 만든다
      ex) export const UserContext = createContext(); // userList를 담을 저장소
          export const UserDispatchContext = createContext(); // useList를 업데이트 하는 로직을 담을 저장소

    2. 저장소를 가져다 쓸 때 사용하기 편하도록(매번 useContext를 선언하지 않아도 되도록) 함수로 만들어준다
      * useContext(가져오고 싶은 저장소) 
          : 가져오고 싶은 저장소의 이름을 매개변수로 넘기면 그 저장소의 담겨있는 value를 리턴 받는다

      ex) export const useUserContext = () => useContext(UserContext);
          export const useUserDispatchContext = () => useContext(UserDispatchContext);

          --> 나중에 변수에다가 함수를 호춣해주면 그 변수에는 저장소의 value가 담기게 될 것이다

    3. 아직 저장소가 비어있다. 채워줄 것들을 만들어주자
       우리는 지금 UserContext에는 userList를 담아야 하고
                   UserDispatchContext에는 userList를 업데이트 하는 로직을 담아야 한다.

        (이후에 useReducer를 통해 Reducer와 initialState를 담아 userList와 dispatch로 만들어낼 것이다)

        (1) Reducer : 상태를 업데이트할 로직
              ex) const userReducer = (state, action) => {...}\

        (2) initialState

        --> 

    4. Provider를 만들자
       Provider는 최종적으로 최상단에 감싸주게 될 덮개가 될 것이다
       ex) const Provider = ({children}) => {
        
        return(
          <UserContext.Provider value={?}>
            <UserDispatchContext.Provider value={?}>
              {children}                              <---- children은 Provider가 감싸고 있는 모든 하위 컴포넌트가 될 것이다
            </UserDispatchContext.Provider value={?}>
          </UserContext.Provider value={?}>
        )
       }

      아직도 저장소들은 비어있다. 위에 보이는 value에 값을 넣어줘야 저장소에 값이 채워진다.
      위에서도 말했지만, UserContext 저장소에는 userList가 들어가야 하고,
                        UserDispatchContext 저장소에는 userList를 업데이트하는 로직이 들어가야 한다.
      따라서 외부에 따로 작성했었던 업데이트 로직을 useReducer로 넘겨주어 state를 관리하도록
      
      즉, userList와 따로 작성한 업데이트 로직을 연결하자
      ex) const [userList, dispatch] = useReducer(userReducer, initialState);

      **** 이제는 정말로 값을 채워주자
      ex) const Provider = ({children}) => {

        // 이제 userList는 dispatch에 의해서만 상태가 업데이트될 것이다!!!!
        const [userList, dispatch] = useReducer(userReducer, initialState);
        
        return(
          <UserContext.Provider value={userList}>
            <UserDispatchContext.Provider value={dispatch}>
              {children}                              <---- children은 Provider가 감싸고 있는 모든 하위 컴포넌트가 될 것이다
            </UserDispatchContext.Provider value={?}>
          </UserContext.Provider value={?}>
        )
       }

    5. export한 Provider를 최상위에 감싸준다.

    6. 이제는 하위 컴포넌트 어디에서든 불러와서 사용이 가능하다.

       ex) const userList = useUserContext();
           const dispatch = useUserDispatchContext();

*/
