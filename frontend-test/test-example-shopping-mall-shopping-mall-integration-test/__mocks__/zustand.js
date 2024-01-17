const { create: actualCreate } = await vi.importActual('zustand'); // 실제 zustand 모듈을 가져온다
import { act } from '@testing-library/react';

// __mocks__ 하위에 위치한 파일 → vitest나 jest에서 특정 모듈을 자동 모킹

// 앱에 선언된 모든 스토어에 대해 재설정 함수를 저장
const storeResetFns = new Set();

// 스토어를 생성할 때 초기 상태를 가져와 리셋 함수를 생성하고 set에 추가합니다.
export const create = createState => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

// 테스트가 구동되기 전 모든 스토어를 리셋합니다.
// 테스트의 독립성 유지
beforeEach(() => {
  act(() => storeResetFns.forEach(resetFn => resetFn()));
});
