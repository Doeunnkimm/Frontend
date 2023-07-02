import { Client } from '@notionhq/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
})

const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string

const addItem = async (name: string) => {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    })
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

type Data = {
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
    await addItem(name as string)
    res.status(200).json({ message: `Success ${name} added` })
  } catch (error) {
    return res.status(400).json({ message: `Failed ${name} added` })
  }
}
