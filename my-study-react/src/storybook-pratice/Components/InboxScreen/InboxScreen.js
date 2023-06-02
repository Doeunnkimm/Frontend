import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../lib/store';
import TaskList from '../TaskList/TaskList';

export default function InboxScreen() {
  const dispath = useDispatch();
  // 업데이트된 스토어에서 오류를 검사
  const { error } = useSelector(state => state.taskbox);
  useEffect(() => {
    dispath(fetchTasks());
  }, []);

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    );
  }
  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">
          <span className="title-wrapper">Taskbox</span>
        </h1>
      </nav>
      <TaskList />
    </div>
  );
}
