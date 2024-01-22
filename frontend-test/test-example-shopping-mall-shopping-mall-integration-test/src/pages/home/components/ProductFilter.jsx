import { Box, Skeleton } from '@mui/material';
import React, { Suspense } from 'react';

import ApiErrorBoundary from '@/pages/common/components/ApiErrorBoundary';
import CategoryRadioGroup from '@/pages/home/components/CategoryRadioGroup';
import PriceRange from '@/pages/home/components/PriceRange';
import SearchBar from '@/pages/home/components/SearchBar';
import { useFilterStore } from '@/store/filter';
import { pick } from '@/utils/common';

const ProductFilterBox = ({ children }) => (
  <Box sx={{ padding: '10px 0' }}>{children}</Box>
);

/**
 * ProductFilter의 비즈니스 로직
 * - 카테고리 목록을 가져온 후 필드에 정보가 올바르게 렌더링
 * - 상품명을 수정하는 경우 setTitle이 호출
 * - 카테고리를 클릭한 경우, 클릭한 카테고리가 체크
 * - 최소/최대 가격을 수정하면 setMinPrice/setMaxPrice가 호출
 */
const ProductFilter = () => {
  const { categoryId, setCategoryId, setMaxPrice, setMinPrice, setTitle } =
    useFilterStore(state =>
      pick(
        state,
        'categoryId',
        'setMinPrice',
        'setMaxPrice',
        'setTitle',
        'setCategoryId',
      ),
    );

  const handleChangeInput = ev => {
    setTitle(ev.target.value);
  };
  const handleMinPrice = ev => {
    setMinPrice(ev.target.value);
  };
  const handleMaxPrice = ev => {
    setMaxPrice(ev.target.value);
  };
  const handleChangeCategory = ev => {
    setCategoryId(ev.target.value);
  };

  return (
    <Box sx={{ padding: '10px' }}>
      <ProductFilterBox>
        <SearchBar onChangeInput={handleChangeInput} />
      </ProductFilterBox>
      <ProductFilterBox>
        <ApiErrorBoundary>
          <Suspense fallback={<Skeleton height="100px" />}>
            <CategoryRadioGroup
              categoryId={categoryId}
              onChangeCategory={handleChangeCategory}
            />
          </Suspense>
        </ApiErrorBoundary>
      </ProductFilterBox>
      <ProductFilterBox>
        <PriceRange
          onChangeMinPrice={handleMinPrice}
          onChangeMaxPrice={handleMaxPrice}
        />
      </ProductFilterBox>
    </Box>
  );
};

export default ProductFilter;
