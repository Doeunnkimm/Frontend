import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import Pagination from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default = () => {
  const [page, setPage] = useState(1)

  const handlePage = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <Pagination
      totalPage={24}
      nowPage={page}
      handlePage={handlePage}
    />
  )
}

export const WeightGhost: Story = {
  args: {
    weight: 'ghost',
    totalPage: 24,
    nowPage: 3,
  },
}
