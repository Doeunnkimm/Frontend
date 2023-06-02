import InboxScreen from './InboxScreen';
import store from '../../lib/store';
import { Provider } from 'react-redux';
import { MockedState } from '../TaskList/TaskList.stories';
import { rest } from 'msw';

export default {
  component: InboxScreen,
  title: 'Components/InboxScreen',
  decorators: [story => <Provider store={store}>{story()}</Provider>],
};

const Template = () => <InboxScreen />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        'https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, ctx) => {
          return res(ctx.json(MockedState.tasks));
        }
      ),
    ],
  },
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get(
        'https://jsonplaceholder.typicode.com/todos/userId=1',
        (req, res, ctx) => {
          return res(ctx.status(403));
        }
      ),
    ],
  },
};
