import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid, Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { TOAST_ID } from '@/constants';
import ProductCard from '@/pages/home/components/ProductCard';
import useProducts from '@/pages/home/hooks/useProducts';
import { useCartStore } from '@/store/cart';
import { useFilterStore } from '@/store/filter';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

// API 호출 → 여러 컴포넌트가 조합된 영역에서 발생 → 통합 테스트 검증 필요
const PRODUCT_PAGE_LIMIT = 20;
// 실제 앱에서 사용자와 상호 작용할 로직
const ProductList = ({ limit = PRODUCT_PAGE_LIMIT }) => {
  const navigate = useNavigate();
  // 실제 목록 조회를 위해 필요한 필터 조건(스토어에서 조회)
  const filter = useFilterStore(state =>
    pick(state, 'categoryId', 'title', 'minPrice', 'maxPrice'),
  );
  // 로그인 여부, 사용자 정보 조회(스토어에서 조회)
  const { user, isLogin } = useUserStore(state =>
    pick(state, 'user', 'isLogin'),
  );
  // 장바구니 상품 추가 액션(스토어에서 조회)
  const { addCartItem } = useCartStore(state => pick(state, 'addCartItem'));

  // Tanstack Query를 통한 상품 목록 API 호출
  const { data, ...productsMethods } = useProducts({
    limit,
    params: filter,
  });

  const products =
    data?.pages.reduce((acc, cur) => [...acc, ...cur.products], []) ?? [];
  const { fetchNextPage, isFetchingNextPage, hasNextPage } = productsMethods;

  const handleClickCart = (ev, product) => {
    ev.stopPropagation();
    if (isLogin) {
      addCartItem(product, user.id, 1);
      toast.success(`${product.title} 장바구니 추가 완료!`, { id: TOAST_ID });
    } else {
      navigate(pageRoutes.login);
    }
  };
  const handleClickPurchase = (ev, product) => {
    ev.stopPropagation();
    if (isLogin) {
      addCartItem(product, user.id, 1);
      navigate(pageRoutes.cart);
    } else {
      navigate(pageRoutes.login);
    }
  };

  return (
    <Grid container spacing={1} rowSpacing={1} justifyContent="center">
      {products.map((product, index) => (
        <ProductCard
          key={`${product.id}_${index}`}
          product={product}
          onClickAddCartButton={handleClickCart}
          onClickPurchaseButton={handleClickPurchase}
        />
      ))}
      {hasNextPage && (
        <Grid item>
          <Button
            variant="contained"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
          >
            Show more
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductList;
