import { QueryClient, QueryClientProvider } from 'react-query';
import UserList from './Components/UserList';
import useApiError from './Hooks/useApiError';

function QueryErrorHandlingIndex() {
  //   const { handleError } = useApiError();

  const { handleError } = useApiError();

  const queryClient = new QueryClient({
    defaultOptions: {
      onError: handleError,
    },
  });

  // const queryClient = new QueryClient();
  // 전역으로 에러 핸들링할 때
  // {
  // defaultOptions: {
  //   onError: handleError,
  // },
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}
export default QueryErrorHandlingIndex;

/*
    👺 React-Query + 커스텀 훅으로 에러 핸들링 👺

    0. 라이브러러 설치
      ex) npm i @tanstack/react-query @tanstack/react-query-devtools

    1. 전역으로 에러를 핸들링해줄 함수를 작성
      ex) Utils / ErrorHandler / handler.js 파일

        export const defaultHandler = () => {
          // 전역에서 사용할 에러 핸들 로직
          alert("defaultHandler");
        }

        export const defaultErrorHandler404 = () => {
          alert("404에러입니다.")
        }

    2. 에러를 핸들링하는 에러핸들링 Hook 함수를 만든다
      ex) Hooks / useApiError.js 파일

        (1) 기본 핸들러. 상세 핸들러가 들어오지 않았을 때 사용할 핸들러

          const defaultHandlers = {
            default: defaultHandler,
            404: {
              default: defaultErrorHandler404
            }
          }

        (2) Hook 함수 작성
            - 매개변수 handlers는 상세 핸들러가 들어올 자리이다.
              상세 컴포넌트에서 재정의한 handlers가 들어오면 그걸 우선순위로 찾게 된다.

            const useApiError = (handlers) => {
              // ...

              const handleError = useCallback((error) => {
                // console.log(error); // <- 꼭 에러를 콘솔에 찍어보고, Status 코드가 어디에 있는지 확인해야 한다
                const httpStatus = error.response.status;

                while (true) {
                  if (httpStatus && handlers[httpStatus]) {
                    handlers[httpStatus].default();
                    break;
                  } else if (defaultHandlers[httpStatus]) {
                    defaultHandlers[httpStatus].default();
                    break;
                  } else {
                    defaultHandlers.default()
                  }
                }
              }, [handlers])

              return { handleError };
            }
    
    3. queryClient 옵션 안에 onError에 2에서 만든 핸들링 Hook을 통해 리턴되는 handleError를 담아준다.
      
      ex) App.js에서

            const { handleError } = useApiError();

            const queryClient = new QueryClient({
              defaultOptions: {
                onError: handleError,
              }
            })

            return(
              <QueryClient client={client}>
                // ...
              </QueryClient>
            )

      ---> 여기까지 하면 전역에서 에러를 핸들링할 수 있게 된다.
              그런데 상세 컴포넌트에서 상사하게 에러를 핸들링하고 싶다면 ?
              
              ** 핸들링 해주는 함수를 재정의해서 2에서 만든 Hook 함수 인자로 전달해준다
             
    *4*. 상세적으로 에러를 핸들링하고 싶을 때
   
      (1) 핸들링 함수를 재정의한다
          
          const detailErrorHandler404 = () => {
            alert("개별 컴포넌트에서 재정의한 404에러 핸들러");
          }

          const useGetUser = () => {
            const { handleError } = useApiError({
              404: {
                default: detailErrorHandler404
              }
            })
          }
      
      (2) useQuery의 option 안의 onError에 방금 재정의해서 탄생한 handleError를 넣어준다

          const getUser = async () => {
            const res = await UserApi.getUser();
            return res;
          }

          const { data, error, status, isLoading } = useQuery('key', getUser, {
            // ...
            onError: handleError
          })

      ---> 이렇게 세부적으로 재정의해서 핸들링 Hook 함수에 넘겨주게 되면
            재정의한 핸들러 함수가 우선순위가 높아서 먼저 if문에 걸리고
            결과적으로는 재정의한 핸들러 함수가 실행될 것이다.

*/
