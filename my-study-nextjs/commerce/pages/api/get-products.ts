import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getOrderBy } from './../../constants/products'

const prisma = new PrismaClient()

const getProducts = async ({
  skip,
  take,
  category,
  orderBy,
  contains,
}: {
  skip: number
  take: number
  category: number
  orderBy: string
  contains: string
}) => {
  const containsCondition =
    contains && contains !== ''
      ? {
          name: { contains },
        }
      : undefined

  const where =
    category && category !== -1
      ? {
          category_id: category,
          ...containsCondition,
        }
      : containsCondition
      ? containsCondition
      : undefined

  const orderByCondition = getOrderBy(orderBy)

  try {
    const response = await prisma.products.findMany({
      skip,
      take,
      ...orderByCondition,
      where,
    })
    console.log(response)
    return response // 받아서 써야하니까
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  products?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { skip, take, category, orderBy, contains } = req.query

  if (skip === null || take === null) {
    return res.status(400).json({ message: 'No skip or take' })
  }

  try {
    const response = await getProducts({
      skip: Number(skip),
      take: Number(take),
      category: Number(category),
      orderBy: String(orderBy),
      contains: String(contains),
    })
    res.status(200).json({ products: response, message: `Success` })
  } catch (error) {
    return res.status(400).json({ message: `Failed` })
  }
}
