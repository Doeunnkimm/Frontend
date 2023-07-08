import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getProductsCount = async (category: number, contains: string) => {
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

  try {
    const response = await prisma.products.count({ where })
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
  const { category, contains } = req.query

  try {
    const response = await getProductsCount(Number(category), String(contains))
    res.status(200).json({ products: response, message: `Success` })
  } catch (error) {
    return res.status(400).json({ message: `Failed` })
  }
}
