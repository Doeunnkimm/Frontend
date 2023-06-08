import { render, screen } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
// eslint-disable-next-line jest/no-mocks-import
import { server } from '../../../__mocks__/server';

/**
 * 스쿱 및 토핑 라우트 핸들링
 */
test('handles error for scoops and toppings routes', async () => {
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
  const alerts = await screen.findAllByRole('alert', {
    name: 'An unexpected error ocurred. Please try again later.',
  });

  // 에러가 발생하도록 했으므로
  // 2개의 alerts가 떠야 함
  expect(alerts).toHaveLength(2);
});
