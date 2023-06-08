// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// src/setupTests.js
import { server } from './__mocks__/server';
// Establish API mocking before all tests.
beforeAll(() => server.listen()); // msw로 라우팅하도록 가로챌 준비

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
// 테스트가 끝나면 핸들러를 서버를 정의했을 때의 핸들러로 재설정
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
// 테스트가 끝나면 서버를 close
afterAll(() => server.close());
