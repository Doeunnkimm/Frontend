import TaskList from './TaskList';

import * as TaskStories from '../Task/Task.stories';

export default {
  title: 'Components/TaskList',
  component: TaskList,
  decorators: [story => <div>{story()}</div>],
  tags: ['autodocs'],
};

export const Default = {
  args: {
    // args 구성을 통해 스토리 형성
    // 데이터는 Task.stories.js의 기본 스토리에서 상속되었다
    tasks: [
      { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
      { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
      { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
      { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
      { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
      { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
    ],
  },
};

export const WithPinnedTasks = {
  args: {
    tasks: [
      ...Default.args.tasks.slice(0, 5),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ],
  },
};

export const Loading = {
  args: {
    tasks: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    // 로드 중 스토리에서 가져온 상속된 데이터
    ...Loading.args,
    loading: false,
  },
};
