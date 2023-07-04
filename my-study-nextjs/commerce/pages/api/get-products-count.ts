import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const getProductsCount = async () => {
  try {
    const response = await prisma.products.count()
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
  try {
    const response = await getProductsCount()
    res.status(200).json({ products: response, message: `Success` })
  } catch (error) {
    return res.status(400).json({ message: `Failed` })
  }
}
