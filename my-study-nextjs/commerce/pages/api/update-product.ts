import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const updateProduct = async (id: number, contents: string) => {
  try {
    const response = await prisma.products.update({
      where: {
        id,
      },
      data: {
        contents,
      },
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
  const { id, contents } = JSON.parse(req.body)

  if (id === null || contents === null) {
    return res.status(400).json({ message: 'No id or contents' })
  }

  try {
    const response = await updateProduct(Number(id), contents)
    res.status(200).json({ products: response, message: `Success` })
  } catch (error) {
    return res.status(400).json({ message: `Failed` })
  }
}
