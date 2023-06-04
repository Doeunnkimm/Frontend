import { useState } from 'react';
import TextArea from './TextArea';
export default {
  title: 'Components/TextArea',
  component: TextArea,
};

const Template = args => {
  const [value, setValue] = useState(args.value || '');

  const onChange = e => {
    setValue(e);
  };

  return <TextArea {...args} value={value} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {
  label: '공지사항',
  maxLength: 100,
};

export const LongText = Template.bind({});
LongText.args = {
  label: '공지사항',
  value:
    '긴 글을 작성하고 있어요. 테스트중입니다. 테스트 테스트 테스트 테스트 테스트',
  maxLength: 100,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: '공지사항',
  maxLength: 100,
  disabled: true,
};
