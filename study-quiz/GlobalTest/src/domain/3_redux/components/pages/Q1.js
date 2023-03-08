import { useDispatch } from 'react-redux';
import NavigateButton from '../../../../components/NavigateButton';
import { ADD_POST } from '../../../../store/4_redux';

import PostForm from '../atom/Post/Form';
import AllPosts from '../atom/Posts';

const ReduxQ1Page = () => {
  /* 
        문제 3

        1) 이전에 주어졌던 토이프로젝트에 데이터입니다.
           이제는 우리는 여태까지의 문제풀이를 통해 state와 조금 익숙해지는 시간을 가졌습니다.
           그렇다면 이제 조금 더 복잡한 데이터를 다뤄보도록 하겠습니다.

        2) src/__mock__/mockPosts.js에 있는 데이터를 이용하여
           아래의 AllPosts 컴포넌트를 구현해주세요.
           구현 기능에는 게시글 추가, 게시글 삭제, 게시글 수정이 있습니다.

        3) 마찬가지로 각 게시글의 수정, 삭제 버튼를 통해
           게시글을 수정 및 삭제할 수 있습니다

        4) 단 이 상태의 변화는 모두 redux를 통해 관리합니다.

            redux 관련 설정은 admin/src/store.js에 구현해주시면 됩니다.
            단, 개발자모드, 릴리즈모드에 따라서 redux devtools와 logger를 사용할 수 있도록 해주세요.

            관련 비즈니스 로직은
            src/store/4_redux.js에 구현해주세요.
  */

  // const [Posts, setPosts] = useState(MockPosts(10));
  const dispatch = useDispatch();

  const onSubmit = (title, content) => {
    console.log('submit');

    dispatch(
      ADD_POST({
        Comments: [],
        Post_img: [''],
        User: {
          id: Math.floor(Math.random() * 10000),
          nickname: 'Doeunn',
          profileImg:
            'https://i.pinimg.com/originals/d6/6b/7b/d66b7bc6d790cee508541fe1f80a3a2a.jpg',
        },
        content,
        createdAt: new Date(),
        id: Math.floor(Math.random() * 10000),
        myPost: true,
        title,
      })
    );
  };

  return (
    <>
      <PostForm onSubmit={onSubmit} />
      <AllPosts />
      <NavigateButton isLastPage />
    </>
  );
};
export default ReduxQ1Page;

/*
    🔥 순서 정리 🔥

    0. 라이브러리 설치
      ex)   npm i redux react-redux
            npm i -D redux-devtools-extension redux-logger

    1. rootReducer를 만든다
       rootReducer는 가장 큰 Reducer가 된다. 참고로 여기 안에는 reducer들을 담긴다.
       ↔ useReducer는 reducer 하나하나를 각각의 저장소(Context)에 담아야 했다. (가장 큰 저장소 하나에 reducer들을 담는 redux와의 차이점)

       ※ rootReducer를 가장 큰 저장소라고 생각하지는 말자
           왜냐하면 rootReducer를 다시 담아야 하는 store가 따로 있다

    2. 세부 reducer를 정의해서 rootReducer에 넣는다
       redux에서는 reducer를 정의할 때부터 state 부분에 initialState를 넣어준다
      
      ex) const reducer = (state=initialState, action) => {...}
          ==> const rootReducer = combineReducers({ reducer })

    3. 이제 비어있는 저장소를 만들어서 rootReducer를 넣어주자
        + 미들웨어

        ex) const reduxConfig = () => {
              const store = createStore(
                  rootReducer,
                  process.env.NODE_ENV === 'development' &&
                    composeWithDevTools(applyMiddleware(logger))
              );
              return store;
        }

    4. 최상위에 Provider(덮개)를 덮어주고 store 속성에 만들어뒀던
        rootReducer가 채워져있는 store를 넣어주자

    5. useSelector로 store에 있는 reducer를 사용한다.
       => useSelector를 이용하면 rootReducer에 담겨있는 reducer의 state를 가져올 수 있다

        # useSelector : rootReducer에 있는 reducer를 가져올 수 있다. 
                        정확히는 그 가져온 특정 reducer의 state

        ex) const posts = useSelector((state) => state.postReducer);
            => posts는 state가 되었다
            ==> 이제 이 posts는 dispatch를 통해서만 상태가 업데이트 된다

    6. useDispatch로 state를 업데이트 하자
       => useDispatch를 이용하면 rootReducer에게 action객체를 보낼 수 있다
*/
