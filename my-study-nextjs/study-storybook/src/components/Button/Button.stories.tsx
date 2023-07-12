import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
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
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Reverse: Story = {
  args: {
    variant: 'default-reverse',
    children: 'Button',
  },
}

export const Disable: Story = {
  args: {
    disabled: true,
    children: 'Button',
  },
}

export const Round: Story = {
  args: {
    shape: 'round',
    children: 'Button',
  },
}

export const Square: Story = {
  args: {
    shape: 'square',
    children: 'Button',
  },
}
