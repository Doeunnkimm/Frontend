import { useLocation } from 'react-router-dom';

function Order() {
  const location = useLocation();
  console.log(location);

  const { title, content } = location.state;

  console.log(title, content);
  return (
    <>
      <h3>제목 : {title}</h3>
      <h3>내용 : {content}</h3>
    </>
  );
}
export default Order;
