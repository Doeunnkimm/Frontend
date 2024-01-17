import { Divider } from '@mui/material';
import React from 'react';

import PageTitle from '@/pages/cart/components/PageTitle';
import PriceSummary from '@/pages/cart/components/PriceSummary';
import ProductInfoTable from '@/pages/cart/components/ProductInfoTable';

// ProductInfoTable, PriceSummary 로 나누어 통합 테스트 작성
// pageTitle, divider는 단순한 UI 렌더링 → 테스트 작성 X
// ProductInfoTable, PriceSummary로 나누어 통합 테스트 작성 → 장바구니 state를 사용하여 데이터를 렌더링

// CartTable 통합 테스트 → 큰 범위의 통합 테스트는 모킹해야 하는 정보가 많아지며 변경에도 깨지기 쉬움

// ProductInfoTable, PriceSummary → 각각 별도로 zustand store에서 필요한 state와 action을 가져옴
// 독립적으로 분리하여 통합 테스트로 필요한 비즈니스 로직을 검증하기 용이
const CartTable = () => {
  return (
    <>
      <PageTitle />
      <ProductInfoTable />
      <Divider sx={{ padding: 2 }} />
      <PriceSummary />
    </>
  );
};

export default CartTable;
