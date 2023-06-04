import Button from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'], // 자동으로 Document를 작성해주는 기능
  /**
   * 아래를 설정하지 않으면 모든 간격 및 내부 요소를
   * 일일이 설정하여 확인해야 한다.
   */
  argTypes: {
    variant: {
      options: ['primary', 'text', 'default'],
      control: { type: 'radio' },
      type: 'string',
    },
    shape: {
      options: ['default', 'round'],
      control: { type: 'radio' },
      type: 'string',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      type: 'string',
    },
    onClick: {
      action: 'onClick',
    },
  },
};

// 기본 기능을 설정해주는 역할
const Template = args => <Button {...args} />;

// export할 때마다 Template의 기본 기능을 가져감
export const Default = Template.bind({});
Default.args = {
  // 추가적인 args 선언
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
