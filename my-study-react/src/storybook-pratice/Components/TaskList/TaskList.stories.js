import TaskList from './TaskList';
import * as TaskStories from '../Task/Task.stories';

import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

/**
 * TaskList는 컨테이너이며
 * 더 이상 props도 받지 않기 때문에 스토리북 테스트는 작동을 멈추었을 것이다.
 *
 * 이 문제를 해결하기 위해
 * 유사한 데코레이터에 의존하고 모방된 저장소를 스토리북 스토리에 제공할 수 있다.
 */

export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null,
};

const Mockstore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex(task => task.id === id);
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  title: 'Components/TaskList',
  component: TaskList,
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
  excludeStories: /.*MockedState$/,
};

const Template = () => <TaskList />;

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
  story => {
    const pinnedtasks = [
      ...MockedState.tasks.slice(0, 5),
      { id: '6', title: 'Task 6(pinned)', state: 'TASK_PINNED' },
    ];

    return (
      <Mockstore taskboxState={{ ...MockedState, tasks: pinnedtasks }}>
        {story()}
      </Mockstore>
    );
  },
];

export const Loading = Template.bind({});
Loading.decorators = [
  story => (
    <Mockstore
      taskboxState={{
        ...MockedState,
        status: 'loading',
      }}
    >
      {story()}
    </Mockstore>
  ),
];

export const Empty = Template.bind({});
Empty.decorators = [
  story => (
    <Mockstore
      taskboxState={{
        ...MockedState,
        tasks: [],
      }}
    >
      {story()}
    </Mockstore>
  ),
];
