import Task from './Task';

export default {
  title: 'Components/Task', // Storybook 사이드바에서 구성 요소를 그룹화하거나 분류하는 방법
  component: Task, // 컴포넌트 자체
  tags: ['autodocs'], // 컴포넌트에 대한 문서를 자동으로 생성하기 위해
};

const Template = args => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2021, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  },
};
