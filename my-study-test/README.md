## Jest 및 테스팅 라이브러리로 React 테스트하기

### jest-dom으로 처음 테스트해보기

```bash
$ npm test
```

- create-react-app과 함께 설치되는 jest-dom 실행
- setupTest.js파일을 사용해 각 테스트 전에 jest-dom을 가져온다.
- 즉, 모든 테스트에서 jest-dom 매처를 사용할 수 있다.

### Github/testing-libaray/jest-dom

- [Github](https://github.com/testing-library/jest-dom/tree/main#tohavestyle)

### W3C

- [공식문서](https://www.w3.org/TR/wai-aria/#role_definitions)

### user-event of Testing Library

- [공식문서](https://testing-library.com/docs/user-event/intro)
- `npm list @testing-library/user-event`로 확인 가능
- 14버전 설치 : `npm i @testing-library/user-event@^14`

- 일부 test 파일만 테스팅하기

  ```bash
  $ npm test
  p
  [fileName]
  ```

- 일부 test 파일에서도 특정 test만 테스팅하기

  ```javascript
  // 테스팅 하고 싶은 테스트
  test.only('...', () => {});

  // 테스팅 안 하고 싶은 테스트
  test.skip('...', () => {});
  ```

### Custom Render

- wrapper를 모든 컴포넌트에 전역적으로 적용하고 싶을 때
- [공식문서](https://testing-library.com/docs/react-testing-library/setup/)
