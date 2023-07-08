import { PrismaClient } from '@prisma/client'
import jwtDecode from 'jwt-decode'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const signUp = async (credential: string) => {
  const decoded: { id: string; name: string; email: string; image: string } =
    jwtDecode(credential)

  try {
    const response = await prisma.user.upsert({
      where: {
        email: decoded.email,
      },
      update: {
        name: decoded.email,
        image: decoded.image,
      },
      create: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.email,
        image: decoded.image,
      },
    })
    console.log(response)
    return response
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
  const { credential } = req.query

  try {
    const response = await signUp(String(credential))
    res.status(200).json({ items: response, message: `Success` })
  } catch (error) {
    return res.status(400).json({ message: `Failed` })
  }
}
