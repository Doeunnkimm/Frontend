import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { MemoryRouter } from 'react-router-dom';

// https://tanstack.com/query/v4/docs/react/guides/testing
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      // 테스트할 때 재시도를 하다보면 실행시간이 늘어날 수도
      // 시간 초과 에러가 나면 제대로된 에러 피드백을 못 받을 수도 있다.
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
});

export default async (component, options = {}) => {
  const { routerProps } = options;
  const user = userEvent.setup();

  return {
    user,
    ...render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter {...routerProps}>{component}</MemoryRouter>
        <Toaster />
      </QueryClientProvider>,
    ),
  };
};
