import React from 'react';

import PageTitle from '@/pages/cart/components/PageTitle';
import render from '@/utils/test/render';

// 테스트 파일 내에 스냅샷까지 함께 관리하고 싶을 경우
it('pageTitle 스냅샷 테스트(toMatchInlineSnapshot)', async () => {
  const { container } = await render(<PageTitle />);

  // 테스트를 실행하면 DOM 구조가 직렬화되어 추가된다
  // 스냅샷 내용과 달라지면 테스트가 실패하게 되고
  // 원하는 경우 이 스냅샷을 업데이트하는 것도 가능하다
  // 반대로 의도한 변경사항이 아닐 경우 잘못된 부분을 찾아 수정해야 한다
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h1
        class="MuiTypography-root MuiTypography-h4 css-1lnl64-MuiTypography-root"
      >
        상품 리스트
      </h1>
      <div
        style="position: fixed; z-index: 9999; top: 16px; left: 16px; right: 16px; bottom: 16px; pointer-events: none;"
      />
    </div>
  `);
});

// 테스트 파일과 스냅샷 파일을 별도로 관리하고 싶은 경우
it('pageTitle 스냅샷 테스트(toMatchSnapshot)', async () => {
  const { container } = await render(<PageTitle />);

  // 별도 파일(PageTitle.spec.jsx.snap) 파일에서 별도로 스냅샷이 기록된다
  expect(container).toMatchSnapshot();
});
