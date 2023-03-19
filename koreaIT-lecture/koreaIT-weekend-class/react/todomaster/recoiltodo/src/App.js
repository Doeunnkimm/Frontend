import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';

import theme from './styles/theme';
import router from './routes/routing';
import AuthProvider from 'contexts/auth';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  // client는 기본 설정(config의 느낌)이다

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <GlobalStyles />
            <RouterProvider router={router} />
          </AuthProvider>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
/*
    ⭐⭐ React-query ⭐⭐

    0. 라이브러리 설치
        ex) npm i @tanstack/react-query @tanstack/react-query-devtools
    
    1. 기본 설정을 위한 queryClient라는 변수를 만든다(App.js에서 작성한다..한 줄)
        ex) const queryClient = new QueryClient();

    2. 다시한번 최상위에 <QueryClientProvider client={queryClient}></QueryClientProvider>로 감싼다

    3. **post**  ------> useMutation 사용

      방법1) queries 폴더에 로직을 모아두고 mutate로 사용한다 (mutate 앞에는 await를 붙일 수 없다)
          * 사용할 로직 이름 앞에 use를 붙여야 한다 *

          (1) react-query의 useMutation을 리턴하는 함수 형태로 작성한다
              ex) const useUserLogin = () => {
                  // ...
                  return useMutation(비동기 통신 로직...)
                }
                export default useUserLogin;
          
          (2) useMutation 안 로직을 작성한다.
              위 예시에서는 login을 하는 로직이 필요하다\

              ex) const useUserLogin = () => {
                  const auth = useAuth(); // 여기에는 로그인 로직(로그인하면 토큰을 담고, ..)하는 로그인 관련 함수도 담겨있다.
                  return useMutation(({ email, password }) => AuthApi.login(email, password), {
                    // 위 비동기 통신이 성공했을 때와 실패했을 때 로직을 작성한다
                    onSuccess: (res) => {
                      auth.login(res.data.token);
                    }
                    onError: (err) => {
                      console.log(err);
                    }
                  })
                }
          
          (3) 값을 전달할 수 있는 배달원 같은 mutate를 선언해서 사용해보자
              
              ex) const { mutate } = useUserLogin();
              
                  --> 우리는 useUserLogin이라는 함수를 작성했었다.
                      * useMutation()을 리턴하는 함수였다
                      * useMutation() 안에는 비동기 통신을 하고, 
                        그 통신이 성공/실패에 따른 로직도 작성되어 있었다
                      * useMutation((mutate에 받을 매개변수) => {받은 값으로 실행할 비동기 통신 로직}, 
                          {onSuccess, onError}
                        )

                  mutate({email, password})

                  --> mutate는 useUserLogin에게 값을 전달해줘서 내부 로직이 실행되게 해준다


      방법2) 사용할 컴포넌트 내부에 mutateAsync로 사용한다

          (1) 이번에도 useMutation안에서 비동기 통신 로직을 작성해준다.
                ※ 다만, 방법1과는 달리 성공/실패 로직을 함께 작성하지는 않는다

                const { mutateAsync } = useMutation(() => {})

                ex) const { mutateAsync } = useMutation(({email, password}) => {
                      AuthApi.signup(email, password)
                    }) 

                --> 사용할 때에는 방법1과 동일하게 mutateAsync()에게 매개변수를 전달해서 비동기 로직을 작동시킨다

          (2) 원래 axios 통신 로직을 작성하듯이 try-catch 안에서 사용한다.

                ex) 
                    const getData = async () => {
                      try {
                        const res = await mutateAsync({email, password});
                      } catch(err) {
                        console.log(err)
                      }
                    }

    4. **get** ------> useQuery 사용

      ==> react-query의 특징을 다시 생각해보자
            
            * react-query는 get 요청에 대해서 응답값을 캐싱해두었다가
              똑같은 값에 대해 다시 또 응답을 받지 않는다

              이때 응답을 받았던 데이터의 staleTime 즉, 
              유효시간이 끝나게 되면 refetch를 시도한다

            * React Query의 라이크 사이클
              (1) A 쿼리 인스턴스가 mount 됨
              (2) 네트워크에서 데이터가 fetch하고 A라는 query key로 캐싱함
              (3) 이 데이터는 fresh(신선한) 상태에서 staleTime(기본값 0) 이후 stale(신선하지 않은 상태)로 변경됨
              (4) A 쿼리 인스턴스가 unmount 됨
              (5) 캐시는 cacheTime(기본값 5min) 만큼 유지되다가 가비지 컬렉터로 수집됨
              (6) 만일 cacheTime이 지나기 전에 A 쿼리 인스턴스가 새롭게 mount 되면, fetch가 실행되고
                    fresh(신선한) 값을 가져오는 동안 캐시 데이터를 보여줌

            * staleTime
              - 데이터가 fresh -> stale 상태로 변경되는데 걸리는 시간
              - fresh 상태일 때는 쿼리 인스턴스가 새롭게 mount 되어도 네트워크 fetch가 일어나지 않는다
              - 데이터가 한번 fetch되고 나서 staleTime이 지나지 않았다면 unmount 후 mount 되어도 fetch가 일어나지 않는다(캐싱되어 있는 것을 보여줌)

            * cacheTime
              - 데이터가 inValid 상태일 때 캐싱된 상태로 남아있는 시간
              - 쿼리 인스턴스가 unmount 되면 데이터는 inValid 상태로 변경되며, 캐시는 cacheTime 만큼 유지된다
              - cacheTime이 지나기 전에 쿼리 인스턴스가 다시 마운트 되면, 데이터를 fetch하는 동안 캐시 데이터를 보여준다.
              - cacheTime은 staleTime과 관계없이, 무조건 inValid된 시점을 기준으로 캐시 데이터 삭제를 결정한다
      
      위 내용을 참고해보았을 때, get 요청을 보내야 할 때 생각해야 하는 점들 !
             => useQuery(queryKey, queryFn, options)

             * options에서
                  (1) refetchOnWindowFocus(boolean | "always")
                        : 데이터가 stale 상태일 경우, 윈도우가 포커싱될 때마다 refetch할건지
                          -> 크롬에서 다른 탭을 눌렀다가 다시 원래 보던 중인 탭을 눌렀을 때도,
                              그리고 F12를 눌러 개발자 도구 창을 켜서 네트워크 탭이든, 콘솔 탭이든
                              개발자 도구 창에서 있다가 다시 내부를 클릭했을 때도 모든 focus 되는 경우에 fetch를 할건지
                  (2) retry(boolean | number | (failureCount: number, error: TError) => boolean)
                        : retry는 실패한 쿼리를 재시도하는 옵션
                          -> 기본적으로 쿼리 실패 시 3번 재시도
                              true로 설정하면 실패 시 무한 재시도하고 false로 설정하면 재시도를 하지 않는다.
                  
                  (3) staleTime(number | Infinity)
                        : staleTime은 데이터가 fresh 상태로 유지되는 시간이다.
                          해당 시간이 지나면 stale 상태가 된다.
                          default staleTime은 0이다
                          fresh 상태에서는 쿼리가 다시 mount 되어도 fetch가 실행되지 않는다

                  (4) cacheTime(number | Infinity)
                        : cacheTime은 inactive 상태인 캐시 데이터가 메모리에 남아있는 시간이다.
                          이 시간이 지나면 캐시 데이터는 가비지 컬렉터에 의해 메모리에서 삭제된다
                          default cacheTime은 5분이다
                  
                  (5) refetchOnMount(boolean | "always")
                        : refetchOnMount는 데이터가 stale 상태일 경우 마운트 시 마다 refetch를 실행하는 옵션
                          default는 true
                          always로 설정하면 마운트 시 마다 매번 refetch를 실행한다

                  (6) onSuccess((data) => void)
                        : 쿼리 성공 시 실행되는 함수
                          매개변수 data는 성공 시 서버에서 넘어오는 response 값이다.
                  
                  (7) onError((error) => void)
                        : 쿼리 실패 시 실행되는 함수
                          매개변수로 에러 값을 받을 수 있다
      
      이제는 작성 순서를 정리해보자 ----------------
      
      (1) 쿼리 함수를 작성하자(useQuery)
          --> 이 쿼리 함수를 실행하게 되면, 내부 콜백함수와 옵션을 거친 data, error, status, isLoading이 리턴되게 된다!!

          ex) const useGetTodo = () => {
                
                const { data, error, status, isLoading } = useQuery(queryKey, queryFn, options)

                return { data, error, status, isLoading }
            }

          *1* 쿼리 key를 작성한다 ---> useQuery의 첫번째 인자: [쿼리키값]
              --> 이 키값을 가지고 외부에서도 이 쿼리의 상태를 관리한다.
              --> 따라서 오탈자가 있으면 안된다.
              ==> 따로 consts 폴더에서 키값을 관리하기도 한다.
                ex) consts/query-key.js에서
                    export const QUERY_KEY = {
                      GET_TODO: 'GET_TODO'
                    }
              
              ex) const useGetTodo = () => {
                    const { data, error, status, isLoading } = useQuery(
                      [QUERY_KEY.GET_TODO], 쿼리함수, 옵션
                    )
                    return { data, error, status, isLoading }
                  }
          
          *2* 콜백 함수를 작성한다 ---> useQuery의 두번째 인자 : 콜백함수(함수가 호출되었을 때 진행될 비동기 통신 로직)
                  
                ex) const useGetTodo = () => {
                    const { data, error, status, isLoading } = useQuery(
                      [QUERY_KEY.GET_TODO],
                      () => TodoApi.getTodo(),
                      옵션
                    )
                  }

          *3* 옵션을 작성한다 ---> useQuery의 세번째 인자 : 옵션(서버 데이터 업데이트 옵션)
         
                ex) const useGetTodo = () => {
                    const { data, error, status, isLoading } = useQuery(
                      [QUERY_KEY.GET_TODO],
                      () => TodoApi.getTodo(),
                      {
                        refetchOnWindowFocus: false, // true로 하면 윈도우창이 focus될 때마다 fetch를 한다
                        retry: 1, // 요청이 실패되면 재요청을 1번 더 보낸다
                        cacheTime: 1000 * 60 * 5, // 5분. amount되고 5분이 지나면 캐시를 가비지 컬렉터가 수집해서 지운다
                        onSuccess: () => {},
                        onError: () => {}
                      }
                    );

                    return { data, error, status, isLoading }
                  }
      
      (2) 그 서버 데이터가 필요한 컴포넌트에서 state를 관리해보자
            
          ex) const { data: todoList, status, isLoading } = useGetTodo();
          
              // todoList.map(...)
          
    5. 4에서 전역으로 백엔드 데이터를 가져오는 쿼리를 작성했었다(useQuery를 통해서)
       그런데 이 데이터는 staleTime이 0이 되기 전 혹은 inValid 상태가 아니라면 재요청을 보내지 않는다
       
       그런데 예를 들어 전역에서 관리하고 있는 백엔드 데이터 todoList 데이터에 addTodo 하는 경우에는
       이 추가되고서 todoList를 재요청해야 한다(그래야 추가된게 보일테니까)

       따라서 addTodo할 때 getTodo를 invalid 상태로 만들어서 재요청을 받게끔 해야 한다.

       ex) const useAddTodo = () => {
            const setAddModal = useSetRecoilState(addModalAtom); // 이건 추가되면서 바로 모달 떠지도록
            const queryClient = useQueryClient(); // 캐싱되어 있는 데이터를 불러올 수 있다

            // addTodo의 경우에도 post하는 로직이기 때문에 useMutation을 사용한다.
            return useMutation(((todo) => TodoApi.addTodo(todo), {
                onSuccess: () => {
                  // 위 콜백함수가 성공하게 되면 --> 데이터가 잘 추가되었다는 말이므로
                  // 쿼리 키값을 넣어줘서 invalid 상태를 만들 수 있음
                  queryClient.invalidateQueries(QUERY_KEY.GET_TODO);
                  setAddModal(false);
                }
            })
          }
          
        사용할 때는...

        ex) const { mutate } = useAddTodo(); // useAddTodo에 값을 전달해주는 전달부 mutate

            // ...
            mutate(todo)
    
*/

/*
    Recoil 🍉 

    0. 라이브러리 설치
        ex) npm i recoil

    1. App.js에서 최상위에 <RecoilRoot></RecoilRoot>를 감싼다

    2. atoms 폴더에 필요한 atom을 만든다

        ex) export const addModalAtom = atom({
              key: 'addModalAtom',
              default: false,
            });

          --> 'addModalAtom'이라는 atom명으로 전역으로 default값이 관리되고 있다

    3. 1에서 atom에 담겨있는 default값을 사용하고 싶은 컴포넌트에서 사용한다

        ex) const [state, useState] = useRecoilState(atom명)
            
            + state만 필요하면 useRecoilValue(atom명)
            + 업데이트하는 로직만 필요하면 useRecoilSetState(atom명)
*/
