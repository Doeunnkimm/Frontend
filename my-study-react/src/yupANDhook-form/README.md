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
- control: 구성 요소를 react-hook-form에 등록하기 위한 메서드가 포함된 객체
- render: 렌더링을 위한 함수

  ```jsx
  render={({ field, fieldState, formState }) => {
      const { onChange, onBlur, value, ref, name } = field
      const { invalid, isTouched, isDirty, error } = fieldState
      const { isDirty, dirtyFields, touchedFields, defaultValues, isSubmitted, isSubmitSuccessful, isSubmitting, isLoading, submitCount, isValid, isValidating, errors } = formState
  }}
  ```

### Controller를 사용하는 상황

1. 재사용 가능한 컴포넌트에 hook form이 포함되어야 할 때

   `Controller`를 처음 알게 된 계기 역시 해당 내용과 관련이 있다.

   ```jsx
   <label>이름</label>
   <input {...register("name", { required: true, minLength: 2 })} />
   <label>나이</label>
   <input type="number" {...register("age", { min: 18, max: 99 })} />
   <input type="submit" />
   ```

   폼에 입력해야 하는 사항들이 많아질 수록 위와 같이 동일한 패턴의 코드를 반복적으로 사용하는 경우가 생겼었다.

   우선 모듈화를 하려할 때 form 전체를 컨트롤하는 무언가(가령 예를 들자면 errors)를 같이 넘겨야 자식 컴포넌트로 빼더라도 전체 폼이 온전하게 구동될 것이라고 생각이 들었다.

   `useForm()`의 `control`을 이용하여 form 자체를 컨트롤하는 객체를 넘기고, `<Controller>` 컴포넌트의 `render` 함수를 통해 렌더링을 위한 요소들을 이용할 수 있었다.

2. MUI 같이 외부 라이브러리에 hook form이 포함되어야 할 때

   해당 상황도 1번과 비슷하면서도 조금 다른 느낌이 들 수 있다.

   외부 라이브러리를 사용하다보면 `onChange` 함수나 `value`자체를 props로 넘겨주어야 하는 경우가 종종 존재한다.

   이럴 때 역시도 해당 컴포넌트가 form 내부 하나의 필드라면? form에 등록되어야 하며 `onChange` 함수 역시도 form과 긴밀하게 엮여있어야 할 것이다.

   (onChange에 따라 form에 error가 존재하냐 마냐가 결정될 수 있기 때문에)

### 그럼 form을 제어하기 위해서는 render가 꼭 필요하다는 말인가?

form에 등록하기 위한 메서드가 `render`에도 포함되어 있어 해당 객체를 자식 컴포넌트에게 넘겨주어 등록할 수 있다는 말이다.

모듈화나 외부 라이브러리를 사용하지 않는다면, `useForm()`의 `register`나 `formState`객체를 바로 이용해서 form을 구성해도 전혀 무관하다.

### 그럼 render랑 Controller 없이는 모듈화나 외부 라이브러리에 제어 요소들 주입이 불가능하다는 말인가?

1. 재사용 가능한 컴포넌트에 hook form이 포함되어야 할 때

   `<Controller>` 없이 `register`와 `errors`를 props로 전달하여 동일하게 구현이 가능했다.

   말을 더해보자면, form을 제어하는 역할을 하는 `register`와 `errors`를 따로 넘겨주었지만, `<Controller>`를 사용했을 때에는 `render`만 넘겨 모든 제어가 가능했다.

2. 외부 라이브러리에 hook form이 포함되어야 할 때

   특히 `onChange`와 `value`를 직접 set하고 get하는 부분을 추가하여 props로 넘겨주었다.

   뿐만 아니라 react-hook-form이 기본적으로 `ref`를 사용하여 폼을 관리하기 때문에 알아서 error가 검사 및 업데이트되지 않았다. onChange가 될 때 `trigger`를 통해 다시 error를 검사하도록 조작해 주었다.

   굉장히 번거로웠다 .....

### Controller에 대한 개인적인 의견

`<Controller>` 없이도 구현할 수 있긴 했다. 사용하지 않는다면 넘겨주어야 할 props가 더 많았으며 신경써줘야 하는 사항들도 더 많아졌다. 그래서 편리한 `<Controller>`를 사용할 것 같다.

# 참고 문서

- [leitmotif - Hook Form으로 상태 관리하기](https://velog.io/@leitmotif/Hook-Form%EC%9C%BC%EB%A1%9C-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)
- [boyeon_jeong - mui와 같이 사용하기 | Controller, useController](https://velog.io/@boyeon_jeong/React-Hook-Form-Controller-useController-y6v2mfc9)
- [Using_Material_UI_with_React_Hook_Form](https://blog.logrocket.com/using-material-ui-with-react-hook-form/)
