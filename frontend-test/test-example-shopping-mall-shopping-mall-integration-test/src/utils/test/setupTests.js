import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

import { handlers } from '@/__mocks__/handlers';

/* msw */
export const server = setupServer(...handlers);
// msw 설정 적용
// → 테스트 환경에서 API 호출은 msw의 핸들러에 설정한 응답으로 모킹
beforeAll(() => {
  server.listen(); // 서버 구동
});

afterEach(() => {
  server.resetHandlers(); // 런타임에 변경한 msw의 모킹을 초기화
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
  server.close(); // 서버 종료
});

vi.mock('zustand');

// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
