import type { Meta } from '@storybook/react'
import Select from './Select'
import { useState } from 'react'

const meta: Meta<typeof Select> = {
  title: 'components/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

export const Default = () => {
  const [selectedValue, setValue] = useState('red')

  return (
    <Select
      selectedValue={selectedValue}
      setValue={setValue}
      options={{
        red: { title: '빨간색' },
        orange: { title: '주황색' },
        yellow: { title: '노란색' },
      }}
    />
  )
}
