import { rest } from 'msw';
import { productMock } from '../../datas/product.data';

export const addProduct = rest.post('/api/product', async (req, res, ctx) => {
  let title;
  let price;
  let description;
  let category;
  let region;
  let tag;
  let images;

  const data = req.body;

  title = data.title;
  price = data.price;
  description = data.description;
  category = data.category;
  region = data.region;
  tag = data.tag;
  images = data.images;

  productMock.unshift(data);

  return res(
    ctx.status(200),
    ctx.json({
      id: Math.floor(Math.random() * 10000),
      title,
      price,
      description,
      category,
      region,
      tag,
      images,
    })
  );
});

/* api를 만들었다면 handler에서 등록을 해주자 */

export const getProducts = rest.get(
  '/api/product/search',
  async (req, res, ctx) => {
    const productCategory = req.url.searchParams.get('category');

    let newList;
    let returnList;

    console.log(productCategory);
    console.log(productMock);

    switch (productCategory) {
      case '0':
        newList = [...productMock];
        returnList = newList.filter(product => product.category === 0);
        return res(ctx.status(200), ctx.json(returnList));
      case '1':
        newList = [...productMock];
        returnList = newList.filter(product => product.category === 1);
        return res(ctx.status(200), ctx.json(returnList));
      default:
        return res(ctx.status(200), ctx.json(productMock));
    }
  }
);
