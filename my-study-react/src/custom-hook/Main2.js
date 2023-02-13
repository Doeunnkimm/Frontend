import {useFetch} from './useFetch';

const baseUrl = 'https://jsonplaceholder.typicode.com';

function Main2() {
  //--------------------------------------
  // 이러한 기능을 다른 여러 컴포넌트들에서도 사용한다면?
  // 복붙보다는 커스텀 훅을 사용해보자!
  //   const [data, setData] = useState(null);

  //   const fetchUrl = (type) => {
  //     fetch(baseUrl + '/' + type) // 더미 데이터를 반환
  //       .then((res) => res.json())
  //       .then((res) => setData(res));
  //   };

  //   // 네트워크 상에서 데이터를 가져오는 fetch 커스텀 훅을 만들어보자
  //   useEffect(() => {
  //     fetchUrl('users');
  //   }, []);
  //-------------------------------------------

  //   const {data, fetchUrl} = useFetch(baseUrl, 'users');
  //   console.log(data);
  const {data: userData} = useFetch(baseUrl, 'users');
  const {data: postData} = useFetch(baseUrl, 'posts');

  return (
    <div>
      <h1>useFetch</h1>
      {/* <button onClick={() => fetchUrl('users')}>Users</button>
      <button onClick={() => fetchUrl('posts')}>Posts</button>
      <button onClick={() => fetchUrl('todos')}>Todos</button>
      <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <h1>User</h1>
      {userData && <pre>{JSON.stringify(userData[0], null, 2)}</pre>}
      <h1>Post</h1>
      {postData && <pre>{JSON.stringify(postData[0], null, 2)}</pre>}
    </div>
  );
}
export default Main2;
