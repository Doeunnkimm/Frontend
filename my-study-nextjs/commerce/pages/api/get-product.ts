import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getProduct = async (id: number) => {
  try {
    const response = await prisma.products.findUnique({
      where: {
        id: id,
      },
    })
    console.log(response)
    return response // 받아서 써야하니까
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query

  if (id === null) {
    return res.status(400).json({ message: 'No id' })
  }

  try {
    const response = await getProduct(Number(id))
    res.status(200).json({ items: response, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
