import { Suspense } from 'react';
import Posts from './Posts';

function User({ resource }) {
  const user = resource.user.read();

  return (
    <div>
      <p>
        {user.name}({user.email}) 님이 작성한 글
      </p>
      <Suspense fallback={<p>글목록 로딩중...</p>}>
        <Posts resource={resource} />
      </Suspense>
    </div>
  );
}
export default User;
