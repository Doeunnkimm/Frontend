import {useRef, useState} from 'react';
import styled from 'styled-components';
import PlayListMock from '../../__mock__/playList.json';

function State1() {
  /* 
    문제 1.

    state를 다루기 위한 기초 문제입니다.
    음악 목록 10가지의 mock data가 있습니다.

    아래에 추가버튼을 눌러 목록에 리스트를 추가하고 
    삭제 버턴을 눌렀을 때 데이터가 삭제될 수 있도록 해주세요
  */

  console.log(PlayListMock.playlist);
  /* 데이터 콘솔에 찍어두었으니 확인해볼 것 */

  const titleRef = useRef();
  const signerRef = useRef();

  const [playList, setPlayList] = useState(PlayListMock.playlist);

  const onAddPlayList = () => {
    const newPlayList = {
      title: titleRef.current.value,
      signer: signerRef.current.value,
    };
    setPlayList([...playList, newPlayList]);
  };

  const onDeletePlayList = (idx) =>
    setPlayList(playList.filter((song) => playList.indexOf(song) !== idx));

  return (
    <>
      <h1>문제1</h1>
      <ul>
        {playList.map((playlist, idx) => (
          <li key={idx}>
            <h3>{playlist.title}</h3>
            <p>{playlist.signer}</p>
            <button onClick={() => onDeletePlayList(idx)}>삭제</button>
          </li>
        ))}
      </ul>
      <div>
        <p>
          곡명 : <input ref={titleRef} />
        </p>
        <p>
          가수/작곡 : <input ref={signerRef} />
        </p>
        <p>
          <button onClick={onAddPlayList}>추가</button>
        </p>
      </div>
    </>
  );
}
export default State1;
