import { Image, Title, Subtitle, Button, Input } from './Component';
import Header from './Header.jsx';

import EDU_ICON from '../images/edu_icon.png';
import MORE_ICON from '../images/more.png';
import MAIN_IMAGE_1 from '../images/game-1.jpg';
import MAIN_IMAGE_2 from '../images/game-2.jpg';
import MAIN_IMAGE_3 from '../images/game-3.jpg';
import HOME_ICON from '../images/home.png';
import YOUTUBE_ICON from '../images/youtube.png';
import PEOPLE_ICON from '../images/people.png';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function Home(props) {
  const [array, setArray] = useState([]);

  useEffect(() => {
    axios.get('/api/home').then((res) => {
      console.log(res.data);
      setArray(res.data.result);
    });
  }, []);

  const onRefreshHome = () => {
    console.log('onrefresh call');
    // 리프레시 되면 다시한번 데이터를 가져오자
    axios.get('/api/home').then((res) => {
      console.log(res.data);
      setArray(res.data.result);
    });
  };

  return (
    <>
      <Header name="home" />

      <section className="home-layer">
        <ul className="list">
          {/* null 값으로 들어오는 경우를 대비해서 */}
          {array &&
            array.map((item, index) => {
              // console.log(item);
              // console.log(index);
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
  console.log(props);
  const { homeid, likecount, title, subtitle, tags, url, text, image } =
    props.value;
  const onClickLike = () => {
    console.log(props.value);
    axios
      .put('/api/home/like', { homeid: homeid, likecount: likecount })
      .then((res) => {
        props.onRefresh(); // props의 자식으로 가지고 있는 화면들을 리프레시
      });
  };
  const onClickComment = () => {};
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
      </div>
    </li>
  );
};
