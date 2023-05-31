import Button from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'], // 자동으로 Document를 작성해주는 기능
  argTypes: {
    variant: {
      options: ['primary', 'text', 'default'],
      control: { type: 'radio' },
    },
    shape: {
      options: ['default', 'round'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
};

const Template = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  variant: 'default',
  children: 'Button Test',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  children: 'Button Test',
};

export const Primary = Template.bind({});
Primary.args = {
  disabled: false,
  variant: 'primary',
  children: 'Button Test',
};

export const PrimaryRound = Template.bind({});
PrimaryRound.args = {
  disabled: false,
  variant: 'primary',
  shape: 'round',
  children: 'Button Test',
};

export const Small = Template.bind({});
Small.args = {
  disabled: false,
  size: 'small',
  children: 'Button Test',
};

export const Medium = Template.bind({});
Medium.args = {
  disabled: false,
  size: 'medium',
  children: 'Button Test',
};

export const Large = Template.bind({});
Large.args = {
  disabled: false,
  size: 'large',
  children: 'Button Test',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  disabled: false,
  fullWidth: true,
  children: 'Button Test',
};
