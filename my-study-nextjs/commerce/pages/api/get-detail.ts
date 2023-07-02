import { Client } from '@notionhq/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
})

const getDetail = async (pageId: string, propertyId: string) => {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    })
    console.log(response)
    return response // 받아서 써야하니까
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  detail?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { pageId, propertyId } = req.query

  try {
    const response = await getDetail(String(pageId), String(propertyId))
    res.status(200).json({ detail: response, message: `Success` })
  } catch (error) {
    return res.status(400).json({ message: `Failed` })
  }
}
