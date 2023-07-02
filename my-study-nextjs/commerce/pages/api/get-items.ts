import { Client } from '@notionhq/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
})

const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string

const getItems = async () => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
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
  const { name } = req.query

  if (name === null) {
    return res.status(400).json({ message: 'No name' })
  }

  try {
    const response = await getItems()
    res.status(200).json({ items: response?.results, message: `Success` })
  } catch (error) {
    return res.status(400).json({ message: `Failed` })
  }
}
