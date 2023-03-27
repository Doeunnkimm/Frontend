import { Suspense } from 'react';
import fetchData from './fetchData';
import User from './User';

function Main() {
  return (
    <main>
      <h2>Suspense 사용</h2>
      <Suspense
        fallback={<p style={{ color: 'red' }}> 사용자 정보 로딩중...</p>}
      >
        <User resource={fetchData('1')} />
      </Suspense>
    </main>
  );
}
export default Main;
