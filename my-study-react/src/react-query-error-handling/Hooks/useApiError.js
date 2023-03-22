import { useCallback } from 'react';
import {
  defaultErrorHandler401,
  defaultErrorHandler404,
  defaultErrorHandler500,
  defaultHandler,
} from '../Utils/ErrorHandler/handler';

// 기본 핸들러 예시. 특정 HTTP Status와 서비스 표준 에러 Code 일 때 전역적으로 적용하기로 사전 정의한 핸들러들입니다.
const defaultHandlers = {
  default: defaultHandler,
  401: {
    default: defaultErrorHandler401,
  },
  404: {
    default: defaultErrorHandler404,
  },
  500: {
    default: defaultErrorHandler500,
  },
};

// 매개변수 handlers: 컴포넌트에서 재정의한 핸들러 모음
const useApiError = (handlers) => {
  // ...

  // 우선순위에 따른 핸들러의 선택과 실행
  const handleError = useCallback(
    (error) => {
      // console.log(error); // 꼭 에러를 콘솔에 찍어보고 Status 코드가 어디에 있는지 확인하자
      const httpStatus = error.response.status; // HTTP Status
      console.log(httpStatus);
      console.log(handlers[httpStatus]);
      console.log(httpStatus && handlers[httpStatus]);

      // const serviceCode = error.response.code; // 서비스 표준 에러 Code

      // console.log(httpStatus);
      // console.log(handlers[httpStatus].default());
      while (true) {
        if (httpStatus && handlers[httpStatus]) {
          handlers[httpStatus].default();
          break;
        } else if (defaultHandlers[httpStatus]) {
          defaultHandlers[httpStatus].default();
          break;
        } else {
          defaultHandlers.default();
        }
      }

      // switch (true) {
      //   case handlers && handlers[httpStatus][serviceCode]:
      //     // 우선순위 1. 컴포넌트에서 (HTTP Status, 서비스 표준 에러 Code) Key 조합으로 재정의한 핸들러
      //     handlers[httpStatus][serviceCode]();
      //     break;
      //   case handlers && handlers[httpStatus]:
      //     // 우선순위 2. 컴포넌트에서 (HTTP Status) Key로 재정의한 핸들러
      //     handlers[httpStatus].default();
      //     break;
      //   case defaultHandlers[httpStatus][serviceCode]:
      //     // 우선순위 3. Hook에서 (HTTP Status, 서비스 표준 에러 Code) Key 조합으로 정의한 핸들러
      //     defaultHandlers[httpStatus][serviceCode]();
      //     break;
      //   case defaultHandlers[httpStatus]:
      //     // 우선순위 4. Hook에서 (HTTP Status) Key로 정의한 핸들러
      //     defaultHandlers[httpStatus].default();
      //     break;
      //   default:
      //     // 우선순위 5. 어디에서도 정의되지 못한 에러를 처리하는 핸들러
      //     defaultHandlers.default();
      // }
    },
    [handlers]
  );

  // ...
  return { handleError };
};

export default useApiError;
