export const CATEGORY_MAP = ['Sneakers', 'T-Shirt', 'Pants', 'Cap', 'Hoodie']

export const TAKE = 9 // 한 페이지에 9개씩

export const FILTERS = [
  {
    label: '최신순',
    value: 'latest',
  },
  {
    label: '가격 높은 순',
    value: 'expensive',
  },
  {
    label: '가격 낮은 순',
    value: 'cheep',
  },
]

export const getOrderBy = (orderBy?: string) => {
  return orderBy
    ? orderBy === 'latest'
      ? { orderBy: { createdAt: 'desc' } }
      : orderBy === 'expensive'
      ? { orderBy: { price: 'desc' } }
      : { orderBy: { price: 'asc' } }
    : undefined
}
