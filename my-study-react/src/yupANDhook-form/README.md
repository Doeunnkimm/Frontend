# Yup와 React Hook Form 같이 사용해서 폼 만들기

## 🤔 Yup ?

JavaScript에서 사용되는 객체 스키마 유효성 검사 라이브러리이다. 이를 통해 간편하게 데이터의 유효성을 확인하고 검사할 수 있다.

<br>

아래는 Yup의 주요 문법과 기능에 대한 설명이다.

### 스키마 정의

Yup을 사용하려면 **스키마를 정의**해야 한다. 스키마는 데이터 모델을 설명하는 객체이다. `yup.object()`를 사용하여 스키마를 정의할 수 있다.

### 필드 유효성 검사

스키마 내에서 **각 필드의 유효성 검사를 정의**할 수 있다. 다양한 메서드를 사용하여 유효성 규칙을 설정할 수 있다. 예를 들어, `.string()`, `.number()` 등 필드의 타입을 지정할 수 있다.

### 필수 필드

`.required()`메서드를 사용하여 필드가 반드시 존재해야 함을 명시할 수 있다.

### 값 범위 검사

`.min()`, `.max()`메서드를 사용하여 값의 최소 및 최대 범위를 검사할 수 있다.

### 패턴 검사

`.matches()`메서드를 사용하여 정규식 패턴을 통한 값의 형식을 검사할 수 있다.

### 에러 메시지

각 유효성 검사 규칙에 대한 커스텀 에러 메시지를 설정할 수 있다. `.required('Custom error message')와 같이 사용할 수 있다.

### 체이닝

Yup은 메서드 체이닝을 통해 여러 유효성 검사 규칙을 연결할 수 있다.

### 유효성 검사 실행

정의된 스키마에 따라 데이터의 유효성을 검사할 수 있다. `schema.validate(data, options)` 메서드를 사용하여 유효성 검사를 수행. 유효성 검사 통과여부는 Promise 객체로 반환된다.

## 🤔 React Hook Form의 Controller ?

Controller는 React-Select, AntD 및 MUI와 같이 외부 제어 구성 요소와의 작업을 더 쉽게 할 수 있도록 하는 컴포넌트

### Controller의 구성 요소

- name: 입력의 고유한 이름
- control: `useForm`의 control
- render: field에 의존하는 children node. register 대신 사용

  ```jsx
  render={({ field, fieldState, formState }) => {
      const { onChange, onBlur, value, ref, name } = field
      const { invalid, isTouched, isDirty, error } = fieldState
      const { isDirty, dirtyFields, touchedFields, defaultValues, isSubmitted, isSubmitSuccessful, isSubmitting, isLoading, submitCount, isValid, isValidating, errors } = formState
  }}
  ```

  # 참고 문서

- [leitmotif - Hook Form으로 상태 관리하기](https://velog.io/@leitmotif/Hook-Form%EC%9C%BC%EB%A1%9C-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)
- [boyeon_jeong - mui와 같이 사용하기 | Controller, useController](https://velog.io/@boyeon_jeong/React-Hook-Form-Controller-useController-y6v2mfc9)
