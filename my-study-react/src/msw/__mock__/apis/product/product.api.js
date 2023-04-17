import { rest } from 'msw';

export const addProduct = rest.post('/api/product', async (req, res, ctx) => {
  let title;
  let price;
  let description;
  let category;
  let region;
  let tag;
  let images;

  const data = req.json();

  title = data.title;
  price = data.price;
  description = data.description;
  category = data.category;
  region = data.region;
  tag = data.tag;
  images = data.images;

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
