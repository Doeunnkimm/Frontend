import { Provider } from 'react-redux';
import Button from '../Components/Button/Button';
import Task from '../Components/Task/Task';
import store from '../lib/store';
import InboxScreen from '../Components/InboxScreen/InboxScreen';

function StoryMain() {
  return (
    <Provider store={store}>
      <div>
        <p>메인입니다.</p>
        <Button>테스트 버튼</Button>
        <Task
          task={{ id: '1', title: '스토리북 공부', state: 'TASK_ARCHIVED' }}
        />
      </div>
      <InboxScreen />
    </Provider>
  );
}
export default StoryMain;
