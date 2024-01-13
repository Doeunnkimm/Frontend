import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// 사전 작업을 명령 가능
// beforeEach(() => {
//   console.log('root - beforeEach');
// });
// beforeAll(() => {
//   console.log('root - beforeAll');
//   // beforeAll은 주로 스코프 내에서 전역으로 공유할 환경이나 상태를 설정할 때 사용하면 유용
// });

/**
 * root에 작성된 beforeAll 함수가 제일 먼저 한번 실행
 * 이후 테스트가 실행되기 전에 beforeEach 함수가 실행이 되고
 * 블록 안에 있는 beforeEach 함수가 실행
 */

// afterEach(() => {
//   console.log('root - afterEach');
// });
// afterAll(() => {
//   console.log('root - afterAll');
// });

/**
 * 테스트마다 끝날 때 afterEach 함수가 실행되고
 * 최종적으로 테스트가 마무리되었을 때 딱 한번 afterAll 함수가 실행된다.
 */

// my-class란 class가 항상 적용된 컴포넌트를 렌더링
// beforeEach(async () => {
//   await render(<TextField className="my-class" />);
// });

// let someCondition = false;

// beforeEach(async () => {
//   if (someCondition) {
//     await render(<TextField className="my-class" />);
//   } else {
//     // ...
//   }
// });

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // Arrange - 테스트를 위한 환경 만들기
  // → className을 지닌 컴포넌트 렌더링
  // Act - 테스트할 동작 발생
  // → 렌더링에 대한 검증이기 대문에 이 단계는 생략
  // → 클릭이나 메서드 호출, prop 변경 등등에 대한 작업이 여기에 해당
  // Assert - 올바른 동작이 실행되어있는지 검증
  // → 렌더링 후 DOM에 해당 class가 존재하는지 검증

  // render API를 호출 → 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영
  // jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 구현
  await render(<TextField className="my-class" />);

  // vitest의 expect 함수를 사용하여 기대 결과를 검증
  // screen.getByPlaceholderText('텍스트를 입력해 주세요.'); // 요소 조회

  // className이란 내부 prop이나 state 값을 검증 (X)
  // 렌더링되는 DOM 구조가 올바르게 변경되었는지 확인 (O) → 최종적으로 사용자가 보는 결과는 DOM
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // 테스트가 실행되는 과정 속에서 이 컴포넌트가 jsDOM에 어떤 식으로 렌더링되는 지 알 수 있다.
  screen.debug();
  expect(textInput).toHaveClass('my-class');
});

describe('placeholder', () => {
  beforeEach(() => {
    console.log('placeholder - beforeEach');
  });
  // it → test 함수의 alias
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    // 기대 결과 === 실제 결과 → 성공
    // 기대 결과 !== 실제 결과 → 실패
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    screen.debug();

    // 기대 결과는 expect 함수를 이용해서 작성한다.
    expect(textInput).toBeInTheDocument();
    // 단언(assertion) → 테스트가 통과하기 위한 조건 → 검증 실행
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    // 기대 결과 === 실제 결과 → 성공
    // 기대 결과 !== 실제 결과 → 실패
    await render(<TextField placeholder="상품명을 입력해 주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    screen.debug();

    // 기대 결과는 expect 함수를 이용해서 작성한다.
    expect(textInput).toBeInTheDocument();
    // 단언(assertion) → 테스트가 통과하기 위한 조건 → 검증 실행
  });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn(); // 스파이 함수
  // 스파이 함수: 테스트 코드에서 특정 함수가 호출되었는지, 함수의 인자로 어떤 것이 넘어왔는지 어떤 값을 변환하는지 등 다양한 값들을 저장
  const { user } = await render(<TextField onChange={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // 사용자가 input에 'test'를 입력한 것처럼 테스트 코드를 작성할 수 있게 해준다.
  await user.type(textInput, 'test');

  // 스파이 함수가 내가 원하는 'test'라는 문자열과 함께 올바르게 호출되었는지 단언할 수 있다.
  expect(spy).toHaveBeenCalledWith('test');
});

it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();

  const { user } = await render(<TextField onEnter={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test{Enter}');

  expect(spy).toHaveBeenCalledWith('test');
});

it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  // 포커스 활성화
  // 탭 키로 인풋 요소로 포커스 이동
  // 인풋 요소를 클릭했을 때
  // textInput.focus()로 직접 발생

  const spy = vi.fn();
  const { user } = await render(<TextField onFocus={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  // 스파이 함수의 호출 여부만 단언할 때는 toHaveBeenCalled
  expect(spy).toHaveBeenCalled();
});

it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(textInput).toHaveStyle({
    borderWidth: 2,
    borderColor: 'rgb(25, 118, 210)',
  });
});
