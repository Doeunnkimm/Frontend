import { screen } from '@testing-library/react';
import React from 'react';

import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import render from '@/utils/test/render';

// 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행
// useNavigate 훅으로 반환받은 navigate 함수가 올바르게 호출되었는가 → 스파이 함수
const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  // 우리는 react-router-dom의 useNavigation 기능을 모킹하고 싶은 것
  const original = await vi.importActual('react-router-dom');
  return { ...original, useNavigate: () => navigateFn }; // useNavigate의 기능을 대체
});

it('"홈으로 가기" 링크를 클릭할경우 "/"경로로 navigate함수가 호출된다', async () => {
  const { user } = await render(<EmptyNotice />);

  await user.click(screen.getByText('홈으로 가기'));

  expect(navigateFn).toHaveBeenNthCalledWith(1, '/');
});
