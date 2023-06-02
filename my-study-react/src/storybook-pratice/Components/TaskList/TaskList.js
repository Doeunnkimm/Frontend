import Task from '../Task/Task';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskState } from '../../lib/store';

/**
 * 복잡 구성요소
 * -------------------------
 * 작업 목록인 TaskList를 만들기 위해 내용을 확장
 * 구성 요소를 함께 결합하고 더 많은 복잡성을 도입해보자
 */

function TaskList() {
  const tasks = useSelector(state => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter(t => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter(t => t.state !== 'TASK_PINNED'),
    ];
    const filteredTasks = tasksInOrder.filter(
      t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
    return filteredTasks;
  });

  const { status } = useSelector(state => state.taskbox);
  const dispatch = useDispatch();

  const pinTask = value => {
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }));
  };
  const archiveTask = value => {
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="list-items" data-testid="loading" key={'loading'}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key={'empty'} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">일정이 없습니다 🌄</p>
          <p className="subtitle-message">편히 쉬세요 !</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items">
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onPinTask={task => pinTask(task)}
          onArchiveTask={task => archiveTask(task)}
        />
      ))}
    </div>
  );
}

export default TaskList;

/** 데이터 요구 사항 정의
 *
 * Task가 TaskList의 자식 요소이므로
 * 올바른 모양으로 데이터를 제공하여 렌더링해야 한다.
 *
 * Type의 propTypes에서 정의한 것을 재사용하자
 */
TaskList.propTypes = {
  /** Checks if it`s in loading state */
  loading: PropTypes.bool,
  /** The list of tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
};

TaskList.defaultProps = {
  loading: false,
};
