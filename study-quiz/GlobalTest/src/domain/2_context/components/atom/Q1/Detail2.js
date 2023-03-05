const ContextQ1Detail2 = ({ detail2, setDetail2 }) => {
  const onShowDetail2 = () => setDetail2((prev) => !prev);

  return (
    <>
      <h2>ContextQ1Detail2</h2>
      <button onClick={onShowDetail2}>{detail2 ? '숨기기' : '보이기'}</button>
    </>
  );
};
export default ContextQ1Detail2;
