import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Header from './Header';

export default function Board(props) {
  const [mode, setMode] = useState('list'); // list, view, edit
  const [selected, setSelected] = useState(null);

  const onEvent = (eventid, item) => {
    console.log(item);
    setMode(eventid);
    setSelected(item);
  };
  return (
    <div>
      <Header name="board" />
      <div>
        <button onClick={() => setMode('list')}>목록</button>
        <button onClick={() => setMode('view')}>조회</button>
        <button onClick={() => setMode('edit')}>편집</button>
      </div>
      <section className="board-layer">
        {/* mode일 때 별로 보여줄 컴포넌트를 설정 */}
        {mode === 'list' && <BoardList onEvent={onEvent} />}
        {mode === 'view' && <BoardView onEvent={onEvent} item={selected} />}
        {mode === 'edit' && <BoardEdit onEvent={onEvent} item={selected} />}
      </section>
    </div>
  );
}

// 게시판 목록 화면
const BoardList = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('/api/board', {}).then((res) => setList(res.data.result));
  }, []);

  const onClickItem = (item) => {
    // console.log(item);
    props.onEvent('view', item);
  };

  const onClickNew = () => {
    props.onEvent('edit', null);
  };

  return (
    <div className="list">
      <h1>게시판 목록</h1>
      <div className="buttons">
        <button onClick={onClickNew}>추가</button>
      </div>
      {list && // 리스트가 있다면
        list.map((item) => {
          return (
            <li key={item.boardid} onClick={() => onClickItem(item)}>
              <span className="title">{item.title}</span>
              <span className="date">{item.regdate}</span>
            </li>
          );
        })}
    </div>
  );
};

// 게시판 조회 화면
const BoardView = (props) => {
  const onClickEdit = () => {
    console.log('onClickEdit');

    props.onEvent('edit', props.item);
  };

  const onClickList = () => {
    console.log('onClickList');

    props.onEvent('list');
  };

  const onClickRemove = () => {
    console.log('onClickRemove');

    const isok = window.confirm('정말로 삭제하시겠습니까?');
    if (isok === true) {
      axios
        // {params: ...} <- 꼭 params 해야함!~
        .delete('/api/board/item', { params: { boardid: props.item.boardid } })
        .then((res) => props.onEvent('list'));
    }
  };

  return (
    <div className="view">
      <h1>게시판 조회</h1>
      <div className="buttons">
        <button onClick={onClickEdit}>편집</button>
        <button onClick={onClickRemove}>삭제</button>
        <button onClick={onClickList}>목록</button>
      </div>
      <div>
        <div className="head">
          <h2>{props.item.title}</h2>
          <span className="date">{props.item.regdate}</span>
        </div>
        <div className="text">
          <p>{props.item.text}</p>
        </div>
      </div>
    </div>
  );
};

// 게시판 편집 화면
const BoardEdit = (props) => {
  const [text, setText] = useState(props.item && props.item.text);
  const [title, setTitle] = useState(props.item && props.item.title);

  const onClickCancel = () => {
    console.log('onClickCancel');

    props.onEvent('view', props.item); // 삭제하면 view 화면으로 넘어가도록
  };

  const onClickSave = () => {
    // 편집
    if (props.item && props.item.boardid) {
      axios
        .put('/api/board/item', {
          boardid: props.item.boardid,
          text: text,
          title: title,
        })
        .then((res) => {
          // 넘겨 받은 onRefresh가 있을 때만 호출한다.
          // props.onRefresh && props.onRefresh();

          // 우리는 text만 변경했기 때문에
          // 나머지 성분들과 바뀐 text를 전달
          props.onEvent('view', { ...props.item, text: text });
        });
    } else {
      // 추가
      axios
        .post('/api/board/item', {
          text: text,
          title: title,
        })
        .then((res) => {
          // 넘겨 받은 onRefresh가 있을 때만 호출한다.
          // props.onRefresh && props.onRefresh();

          // 우리는 text만 변경했기 때문에
          // 나머지 성분들과 바뀐 text를 전달
          //   props.onEvent('view', { ...props.item, text: text });

          props.onEvent('list');
        });
    }
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div className="edit">
      <h1>게시판 편집</h1>
      <div className="buttons">
        <button onClick={onClickCancel}>취소</button>
        <button onClick={onClickSave}>저장</button>
      </div>

      <div>
        <div className="head">
          <input defaultValue={title} onChange={onChangeTitle}></input>
          <h2>{props.item && props.item.title}</h2>
          <span className="date">{props.item && props.item.regdate}</span>
        </div>
        <div className="text">
          <textarea defaultValue={text} onChange={onChange}></textarea>
        </div>
      </div>
    </div>
  );
};
