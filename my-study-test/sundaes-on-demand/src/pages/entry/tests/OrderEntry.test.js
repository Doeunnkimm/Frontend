import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
// eslint-disable-next-line jest/no-mocks-import
import { server } from '../../../__mocks__/server';

/**
 * 스쿱 및 토핑 라우트 핸들링
 */
test.only('handles error for scoops and toppings routes', async () => {
  // handler 오버라이드
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');

    // 에러가 발생하도록 했으므로
    // 2개의 alerts가 떠야 함
    expect(alerts).toHaveLength(2);
    // waitFor을 해주지 않으면 요소를 하나만 찾음(원래 alert 2개 찾아야 하는데)
    // 지금 2개의 서버 호출을 기다리고 있음(scoops, toppings)
    // 둘 중 하나가 호출되면서 await가 실행되고 그 하나만 찾게 된 것
    // expect문이 실행되기 전에 두 서버 호출이 반환되면 확인 가능
    // expect가 원하는 걸 찾을 때까지 기다리게 함
    // ⭐ 그래서 모두 찾아서 반환하거나 / 타임아웃 제한에 도달해서 테스트가 멈추거나
  });
});
