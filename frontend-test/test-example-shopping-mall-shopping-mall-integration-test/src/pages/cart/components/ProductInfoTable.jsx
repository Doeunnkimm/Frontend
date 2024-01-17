import { TableContainer, Table, TableBody, Paper } from '@mui/material';
import React from 'react';

import ProductInfoTableRow from '@/pages/cart/components/ProductInfoTableRow';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

// cart state 변경에 따른 UI 변경도 검증 → 실제 앱의 기능과 유사함
// ProductInfoTableRow 컴포넌트의 기능까지 모두 검증할 수 있음

// ProductInfoTableRow에서도 state나 액션을 가져옴
// → 상태 관리 코드 산재 → 로직 파악 및 테스트 파악 어려움
// state, api에 대한 제어 코드를 통합 테스트 대상 컴포넌트로 응집 → 유지보수성 향상, 테스트의 단위 나누기 좋음
const ProductInfoTable = () => {
  // 테스트 실행 전에 zustand 스토어의 state를 원하는 대로 변경 필요
  const { cart, removeCartItem, changeCartItemCount } = useCartStore(state =>
    pick(state, 'cart', 'removeCartItem', 'changeCartItemCount'),
  );
  const { user } = useUserStore(state => pick(state, 'user'));

  return (
    <TableContainer component={Paper} sx={{ wordBreak: 'break-word' }}>
      <Table aria-label="장바구니 리스트">
        <TableBody>
          {Object.values(cart).map(item => (
            <ProductInfoTableRow
              key={item.id}
              item={item}
              user={user}
              removeCartItem={removeCartItem}
              changeCartItemCount={changeCartItemCount}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductInfoTable;
