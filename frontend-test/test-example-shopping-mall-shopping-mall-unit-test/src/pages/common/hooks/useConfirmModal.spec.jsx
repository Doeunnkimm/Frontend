import { renderHook, act } from '@testing-library/react';

import useConfirmModal from './useConfirmModal';

// 리액트 훅은 반드시 리액트 컴포넌트내에서만 호출되어야 정상적으로 실행
// RTL에서는 리액트 컴포넌트 없이도 리액트 훅의 기본 기능을 쉽게 검증할 수 있도록
// `renderHook`이라는 API를 제공
it('호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.', () => {
  // result: 훅을 호출하여 얻은 결과 값을 반환 → result.current 값의 참조를 통해 최신 상ㅌ애를 추적할 수 있다.
  // rerender: 훅을 원하는 인자와 함께 새로 호출하여 상태를 갱신한다.
  const { result, rerender } = renderHook(useConfirmModal);
  expect(result.current.isModalOpened).toBe(false);
});

it('호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened 상태가 설정된다.', () => {
  const { result } = renderHook(() => useConfirmModal(true));
  expect(result.current.isModalOpened).toBe(true);
});

it('훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.', () => {
  const { result } = renderHook(useConfirmModal);
  act(() => result.current.toggleIsModalOpened()); // 함수 호출(직접 상태를 변경한 경우) → 이럴 경우 act를 사용해야 한다.

  expect(result.current.isModalOpened).toBe(true);
});
