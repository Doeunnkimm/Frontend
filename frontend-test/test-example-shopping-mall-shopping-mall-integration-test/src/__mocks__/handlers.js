import { rest } from 'msw';

import response from '@/__mocks__/response';
import { apiRoutes } from '@/apiRoutes';

const API_DOMAIN = 'http://localhost:3000';

export const handlers = [
  ...[
    apiRoutes.users,
    apiRoutes.product,
    apiRoutes.categories,
    apiRoutes.couponList,
  ].map(path =>
    // request 쿼리 파라미터에 따라 응답을 변경
    // http status를 변경하는 것과 같은 다양한 처리 가능
    rest.get(`${API_DOMAIN}${path}`, (_, res, ctx) =>
      res(ctx.status(200), ctx.json(response[path])),
    ),
  ),
  // 테스트 환경에서 상품 목록 API 요청이 실행되면 msw에서 요청을 가로챈다.
  // products.json에 정의한 상품 목록 모킹 데이터를 페이징 단위로 잘라 API 응답처럼 반환
  // 테스트 코드에서 항상 동일한 모킹 데이터를 기반으로 원하는 시나리오에 대한 안정성 있는 검증 가능
  rest.get(`${API_DOMAIN}${apiRoutes.products}`, (req, res, ctx) => {
    const data = response[apiRoutes.products];
    const offset = Number(req.url.searchParams.get('offset'));
    const limit = Number(req.url.searchParams.get('limit'));
    const products = data.products.filter(
      (_, index) => index >= offset && index < offset + limit,
    );

    return res(
      ctx.status(200),
      ctx.json({ products, lastPage: products.length < limit }),
    );
  }),
  // 사용자 정보가 없는 비로그인 상태로 모킹
  // 하지만, 테스트 실행 시 profile get API에 대해 사용자 정보가 응답으로 오도록 모킹 필요
  // 이미 API 모킹 설정이 되어 있지만, 테스트 실행 시에 응답을 변경하여 API 모킹을 다시 해야 하는 경우가 있다.
  // 이때 msw에서 제공하는 use라는 함수를 사용하면 동적으로 API 응답을 변경할 수 있다.
  rest.get(`${API_DOMAIN}${apiRoutes.profile}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(null));
  }),
  rest.post(`${API_DOMAIN}${apiRoutes.users}`, (req, res, ctx) => {
    if (req.body.name === 'FAIL') {
      return res(ctx.status(500));
    }

    return res(ctx.status(200));
  }),
  rest.post(`${API_DOMAIN}${apiRoutes.login}`, (req, res, ctx) => {
    if (req.body.email === 'FAIL@gmail.com') {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json({
        access_token: 'access_token',
      }),
    );
  }),
  rest.post(`${API_DOMAIN}${apiRoutes.log}`, (_, res, ctx) => {
    return res(ctx.status(200));
  }),
];
