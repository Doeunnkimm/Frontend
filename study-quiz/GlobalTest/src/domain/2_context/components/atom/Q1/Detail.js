import { useContext, useEffect, useState } from 'react';
import { IsModalContext } from '../../../../../store/2_context';
import ContextQ1Detail2 from './Detail2';

const ContextQ1Detail = () => {
  const { setIsModalOpen } = useContext(IsModalContext); // useContext를 통해 IsModalContext라는 저장소에 있는 value를 가져와서 사용하자

  const [detail, setDetail] = useState(false);
  const [detail2, setDetail2] = useState(false);

  useEffect(() => {
    if (detail && detail2) return setIsModalOpen(true);
    if (!detail && !detail2) return setIsModalOpen(false);
  }, [detail, detail2]);

  const onShowDetail = () => setDetail((prev) => !prev);

  return (
    <>
      <h2>ContextQ1Detail</h2>
      <button onClick={onShowDetail}>{detail ? '숨기기' : '보이기'}</button>
      <ContextQ1Detail2 detail2={detail2} setDetail2={setDetail2} />
    </>
  );
};
export default ContextQ1Detail;
