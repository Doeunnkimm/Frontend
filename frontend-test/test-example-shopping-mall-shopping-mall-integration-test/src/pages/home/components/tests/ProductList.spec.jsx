import { screen, within } from '@testing-library/react';
import React from 'react';

import data from '@/__mocks__/response/products.json';
import ProductList from '@/pages/home/components/ProductList';
import { formatPrice } from '@/utils/formatter';
import {
  mockUseUserStore,
  mockUseCartStore,
} from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';

const PRODUCT_PAGE_LIMIT = 5;

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => navigateFn,
    useLocation: () => ({
      state: {
        prevPath: 'prevPath',
      },
    }),
  };
});

it('로딩이 완료된 경우 상품 리스트가 제대로 모두 노출된다', async () => {
  // 많은 데이터를 기준으로 검증할 필요는 없음
  await render(<ProductList limit={PRODUCT_PAGE_LIMIT} />);

  // findBy는 Promise를 반환
  // getBy가 아니라 findBy를 사용하면 요소가 없다고 테스트 실패 처리를 하고 종료하는 것이 아니라
  // 일정 시간 동안 요소가 있는지 조회한 후에 다음 테스트 코드를 실행한다.
  // 기본적으로 1초 동안 50ms마다 요소가 있는지 조회
  const productCards = await screen.findAllByTestId('product-card');

  expect(productCards).toHaveLength(PRODUCT_PAGE_LIMIT);

  productCards.forEach((el, index) => {
    const productCard = within(el);
    const product = data.products[index];

    // Card의 요솓들이 잘 렌더링 되었는지 단언
    expect(productCard.getByText(product.title)).toBeInTheDocument();
    expect(productCard.getByText(product.category.name)).toBeInTheDocument();
    expect(
      productCard.getByText(formatPrice(product.price)),
    ).toBeInTheDocument();
    expect(
      productCard.getByRole('button', { name: '장바구니' }),
    ).toBeInTheDocument();
    expect(
      productCard.getByRole('button', { name: '구매' }),
    ).toBeInTheDocument();
  });
});

it('보여줄 상품 리스트가 더 있는 경우 show more 버튼이 노출되며, 버튼을 누르면 상품 리스트를 더 가져온다.', async () => {
  // 먼저 컴포넌트를 렌더링
  const { user } = await render(<ProductList limit={PRODUCT_PAGE_LIMIT} />);

  // show more의 노출 여부는 상품 목록 데이터를 가져와 렌더링된 후에 알 수 있다.
  // show more 버튼의 노출 여부를 정확하게 판단하기 위해
  // findBy 쿼리를 사용하여 먼저 첫 페이지에 해당하는 상품 목록이 렌더링되는 것을 기다려야 함
  await screen.findAllByTestId('product-card');

  // show more 버튼이 잘 나타났는지 단언
  expect(screen.getByRole('button', { name: 'Show more' })).toBeInTheDocument();

  // Show more 버튼을 누르면 5개의 상품을 더 가져오는 지 확인해야 함
  const moreBtn = screen.getByRole('button', { name: 'Show more' });
  await user.click(moreBtn);

  // 이미 상품의 모든 데이터(가격, 상품명 등)이 잘 렌더링되는지는
  // 앞선 테스트에서 확인했으므로
  // 여기서는 상품 갯수가 10개가 되었는지만 확인
  expect(await screen.findAllByTestId('product-card')).toHaveLength(
    PRODUCT_PAGE_LIMIT * 2,
  );
});

it('보여줄 상품 리스트가 없는 경우 show more 버튼이 노출되지 않는다.', async () => {
  // 모킹 데이터 20개보다 많은 수 50으로 limit를 설정
  await render(<ProductList limit={50} />);

  // findBy 쿼리를 사용하여 먼저 첫 페이지에 해당하는 상품 목록이 렌더링되는 것을 기다려야 함
  await screen.findAllByTestId('product-card');

  // Show more 버튼이 렌더링되지 않는 것을 단언
  expect(screen.queryByText('Show more')).not.toBeInTheDocument();
});

describe('로그인 상태일 경우', () => {
  beforeEach(() => {
    // 가짜 사용자 정보로 항상 로그인 되어 있도록 설정
    mockUseUserStore({ isLogin: true, user: { id: 10 } });
  });

  it('구매 버튼 클릭시 addCartItem 메서드가 호출되며, "/cart" 경로로 navigate 함수가 호출된다.', async () => {
    // 통합 테스트 역시 좀 더 큰 범위로 비즈니스 로직을 검증할 수 있지만,
    // 이처럼 다른 페이지의 로직을 검증할 수 없기 때문에 이러한 모킹 작업이 필요
    const addCartItemFn = vi.fn();
    mockUseCartStore({ addCartItem: addCartItemFn });

    const { user } = await render(<ProductList limit={PRODUCT_PAGE_LIMIT} />);

    await screen.findAllByTestId('product-card');

    // 첫번째 상품을 대상으로 검증한다.
    const productIndex = 0;
    await user.click(
      screen.getAllByRole('button', { name: '구매' })[productIndex],
    );

    // addCartItemFn이 원하는 인자와 1번 호출되었는지 단언
    expect(addCartItemFn).toHaveBeenNthCalledWith(
      1,
      data.products[productIndex],
      10,
      1,
    );
    // 장바구니 페이지로 이동하는지 단언
    expect(navigateFn).toHaveBeenNthCalledWith(1, '/cart');
  });

  it('장바구니 버튼 클릭시 "장바구니 추가 완료!" toast를 노출하며, addCartItem 메서드가 호출된다.', async () => {
    const addCartItemFn = vi.fn();
    mockUseCartStore({ addCartItem: addCartItemFn });

    const { user } = await render(<ProductList limit={PRODUCT_PAGE_LIMIT} />);

    await screen.findAllByTestId('product-card');

    // 첫번째 상품을 대상으로 검증한다.
    const productIndex = 0;
    const product = data.products[productIndex];
    await user.click(
      screen.getAllByRole('button', { name: '장바구니' })[productIndex],
    );

    expect(addCartItemFn).toHaveBeenNthCalledWith(1, product, 10, 1);
    expect(
      screen.getByText(`${product.title} 장바구니 추가 완료!`),
    ).toBeInTheDocument();
  });
});

describe('로그인이 되어 있지 않은 경우', () => {
  it('구매 버튼 클릭시 "/login" 경로로 navigate 함수가 호출된다.', async () => {
    const { user } = await render(<ProductList limit={PRODUCT_PAGE_LIMIT} />);

    await screen.findAllByTestId('product-card');

    // 첫번째 상품을 대상으로 검증한다.
    const productIndex = 0;
    await user.click(
      screen.getAllByRole('button', { name: '구매' })[productIndex],
    );

    expect(navigateFn).toHaveBeenNthCalledWith(1, '/login');
  });

  it('장바구니 버튼 클릭시 "/login" 경로로 navigate 함수가 호출된다.', async () => {
    const { user } = await render(<ProductList limit={PRODUCT_PAGE_LIMIT} />);

    await screen.findAllByTestId('product-card');

    // 첫번째 상품을 대상으로 검증한다.
    const productIndex = 0;
    await user.click(
      screen.getAllByRole('button', { name: '장바구니' })[productIndex],
    );

    expect(navigateFn).toHaveBeenNthCalledWith(1, '/login');
  });
});

it('상품 클릭시 "/product/:productId" 경로로 navigate 함수가 호출된다.', async () => {
  const { user } = await render(<ProductList limit={PRODUCT_PAGE_LIMIT} />);

  const [firstProduct] = await screen.findAllByTestId('product-card');

  // 첫번째 상품을 대상으로 검증한다.
  await user.click(firstProduct);

  expect(navigateFn).toHaveBeenNthCalledWith(1, '/product/6');
});
