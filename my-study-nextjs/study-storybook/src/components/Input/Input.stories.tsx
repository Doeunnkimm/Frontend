import type { Meta, StoryObj } from '@storybook/react'

import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'components/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '30rem' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: '이메일',
  },
}

export const DefaultIcon: Story = {
  args: {
    label: '이메일',
    icon: (
      <FontAwesomeIcon
        icon={faEnvelope}
        size='lg'
      />
    ),
  },
}

export const WithError: Story = {
  args: {
    label: '이메일',
    status: 'error',
    message: '이메일 형식에 알맞게 입력해주세요',
  },
}
