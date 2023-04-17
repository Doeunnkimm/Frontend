/* 모든 api들을 모아줄 */
import * as ProductApi from './product/product.api';

export const handler = [...Object.values(ProductApi)];
