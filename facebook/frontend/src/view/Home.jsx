import { Image, Title, Subtitle, Button, Input } from './Component';
import Header from './Header.jsx';

import EDU_ICON from '../images/edu_icon.png';
import MORE_ICON from '../images/more.png';
import HOME_ICON from '../images/home.png';
import YOUTUBE_ICON from '../images/youtube.png';
import PEOPLE_ICON from '../images/people.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home(props) {
  const [array, setArray] = useState([]);

  useEffect(() => {
    axios.get('/api/home').then((res) => {
      setArray(res.data.result);
    });
  }, []);

  const onRefreshHome = () => {
    axios.get('/api/home').then((res) => {
      setArray(res.data.result);
    });
  };

  return (
    <>
      <Header name="home" />

      <section className="home-layer">
        <ul className="list">
          {array &&
            array.map((item, index) => {
              //console.log(item);
              return (
                <CardBox
                  key={item.homeid}
                  value={item}
                  onRefresh={onRefreshHome}
                />
              );
            })}
        </ul>
      </section>
    </>
  );
}

const CardBox = (props) => {
  const { homeid, likecount, title, subtitle, tags, url, text, image } =
    props.value;
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    axios
      .get('/api/home/comment', { params: { homeid: homeid } })
      .then((res) => {
        console.log(res.data);
        setComment(res.data.result);
      });
  }, []);

  const onClickLike = () => {
    // console.log(props.value)
    axios
      .put('/api/home/like', { homeid: homeid, likecount: likecount })
      .then((res) => {
        props.onRefresh(); // props의 자식으로 가지고 있는 화면들을 리프레시
      });
  };

  const onClickComment = () => {
    console.log('show comment box ====> ' + show);
    setShow(!show); //true => false, false => true
  };

  const onRefresh = () => {
    axios
      .get('/api/home/comment', { params: { homeid: homeid } })
      .then((res) => {
        setComment(res.data.result);
      });
  };

  return (
    <li>
      <div className="card">
        <div className="head">
          <div>
            <Image src={EDU_ICON} alt="광고 아이콘" />
            <span className="title">{title}</span>
            <Image className="more" src={MORE_ICON} alt="더보기 메뉴" />
          </div>
          <div className="text">
            <p>{subtitle}</p>
            <p className="blue">{tags}</p>
          </div>
        </div>
        <div className="body">
          <div className="image">
            <Image src={image} alt="광고 메인 이미지" />
          </div>
          <div className="text">
            <div>
              <p className="grey sm">{url}</p>
              <p className="bold">{text}</p>
            </div>
            <button>더 알아보기</button>
          </div>
        </div>
        <div className="foot">
          <div className="btn-box active">
            <div>
              <Image src={HOME_ICON} alt="홈 바로가기" />
              <span className="btn-text" onClick={onClickLike}>
                좋아요({likecount})
              </span>
            </div>
          </div>
          <div className="btn-box">
            <div>
              <Image src={YOUTUBE_ICON} alt="동영상 바로가기" />
              <span className="btn-text" onClick={onClickComment}>
                댓글 달기
              </span>
            </div>
          </div>
          <div className="btn-box">
            <div>
              <Image src={PEOPLE_ICON} alt="사용자 바로가기" />
              <span className="btn-text">공유 하기</span>
            </div>
          </div>
        </div>
        {show === true && (
          <CommentBox homeid={homeid} onRefresh={onRefresh} list={comment} />
        )}
      </div>
    </li>
  );
};

const CommentBox = (props) => {
  const [text, setText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const onChangeText = (event) => {
    setText(event.target.value);
  };

  const onClickSave = () => {
    axios
      .post('/api/home/comment', { homeid: props.homeid, text: text })
      .then((res) => {
        console.log(res);
        setText('');
        props.onRefresh && props.onRefresh();
      });
  };

  const onClickRemove = (cmtid) => {
    axios
      .delete('/api/home/comment', { params: { cmtid: cmtid } })
      .then((res) => {
        props.onRefresh && props.onRefresh();
      });
  };

  const onClickEdit = (item) => {
    setSelectedItem(item);
  };

  const onChangeEdit = (event) => {
    console.log(event.target.value);
    const item = { ...selectedItem };
    item.text = event.target.value;
    setSelectedItem(item);
  };

  const onClickUpdate = () => {
    axios
      .put('/api/home/comment', {
        cmtid: selectedItem.cmtid,
        text: selectedItem.text,
      })
      .then((res) => {
        setSelectedItem(null);
        props.onRefresh && props.onRefresh();
      });
  };

  return (
    <div className="comment-box">
      <ul>
        {props.list &&
          props.list.map((item) => {
            return (
              <li key={item.cmtid}>
                {item.text}
                <div className="buttons">
                  <Button
                    type="primary"
                    onClick={() => onClickEdit(item)}
                    text="편집"
                  ></Button>
                  <Button
                    type="secondary"
                    onClick={() => onClickRemove(item.cmtid)}
                    text="삭제"
                  ></Button>
                </div>
              </li>
            );
          })}
      </ul>
      <div className="input-box">
        {selectedItem ? (
          <>
            {/* 편집을 위한 화면 */}
            <textarea onChange={onChangeEdit} value={selectedItem.text} />
            <Button type="secondary" onClick={onClickUpdate} text="저장" />
          </>
        ) : (
          <>
            {/* 삽입을 위한 화면 */}
            <textarea
              placeholder="여기에 내용을 입력하세요"
              onChange={onChangeText}
              value={text}
            />
            <Button type="primary" onClick={onClickSave} text="저장" />
          </>
        )}
      </div>
    </div>
  );
};
