import Button from '../Components/Button/Button';
import Task from '../Components/Task/Task';

function StoryMain() {
  return (
    <div>
      <p>메인입니다.</p>
      <Button>테스트 버튼</Button>
      <Task
        task={{ id: '1', title: '스토리북 공부', state: 'TASK_ARCHIVED' }}
      />
    </div>
  );
}
export default StoryMain;
