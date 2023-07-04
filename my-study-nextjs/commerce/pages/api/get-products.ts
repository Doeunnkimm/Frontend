import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const getProducts = async (skip: number, take: number) => {
  try {
    const response = await prisma.products.findMany({
      skip,
      take,
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
  const { skip, take } = req.query

  if (skip === null || take === null) {
    return res.status(400).json({ message: 'No skip or take' })
  }

  try {
    const response = await getProducts(Number(skip), Number(take))
    res.status(200).json({ products: response, message: `Success` })
  } catch (error) {
    return res.status(400).json({ message: `Failed` })
  }
}
