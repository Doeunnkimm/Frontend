import { screen } from '@testing-library/react';
import { vi } from 'node_modules/vitest/dist/index';
import React from 'react';

import ProductFilter from '@/pages/home/components/ProductFilter';
import { mockUseFilterStore } from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';

const setMinPriceFn = vi.fn();
const setMaxPriceFn = vi.fn();
const setTitleFn = vi.fn();

beforeEach(() => {
  mockUseFilterStore({
    setMinPrice: setMinPriceFn,
    setMaxPrice: setMaxPriceFn,
    setTitle: setTitleFn,
  });
});

it('카테고리 목록을 가져온 후 카테고리 필드의 정보들이 올바르게 렌더링된다.', async () => {
  await render(<ProductFilter />);

  // 카테고리 데이터는 api를 통해 비동기 Promise로 데이터를 가져온다.
  // 따라서 getBy 쿼리가 아닌 findBy 쿼리를 사용해야 api 응답이 완료될 때까지 재시도를 하여 성공적으로 테스트를 할 수 있다.
  expect(await screen.findByLabelText('category1')).toBeInTheDocument();
  expect(await screen.findByLabelText('category2')).toBeInTheDocument();
  expect(await screen.findByLabelText('category3')).toBeInTheDocument();
});

it('상품명을 수정하는 경우 setTitle 액션이 호출된다.', async () => {
  const { user } = await render(<ProductFilter />);

  const textInput = screen.getByLabelText('상품명');
  await user.type(textInput, 'test');

  expect(setTitleFn).toHaveBeenCalled('test');
});

it('카테고리를 클릭 할 경우의 클릭한 카테고리가 체크된다.', async () => {
  // 라디오 클릭 → setCategoryId → categoryId state 변경 → 선택한 라디오 값 변경
  const { user } = await render(<ProductFilter />);

  const category3 = await screen.findByLabelText('category3');
  await user.click(category3);

  expect(category3).toBeChecked();
});

it('최소 가격 또는 최대 가격을 수정하면 setMinPrice과 setMaxPrice 액션이 호출된다.', async () => {
  const { user } = await render(<ProductFilter />);

  const minPriceTextInput = screen.getByPlaceholderText('최소 금액');
  await user.type(minPriceTextInput, '1');

  expect(setMinPriceFn).toHaveBeenCalledWith('1');

  const maxPriceTextInput = screen.getByPlaceholderText('최대 금액');
  await user.type(maxPriceTextInput, '2');

  expect(setMaxPriceFn).toHaveBeenCalledWith('2');
});
