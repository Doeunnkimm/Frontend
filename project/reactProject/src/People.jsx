import REACT_NATIVE from './images/react_native.jpg';
import PEOPLE_ICON from './images/people.png';
import MENU_ICON from './images/menu.png';
import HOME_ICON from './images/home.png';
import Header from './Header';

import {useState} from 'react';

export default function People(props) {
  const [active, setActive] = useState(1);

  return (
    <>
      <Header name="people" />
      <section className="home-layer people-layer">
        <div className="bg-image"></div>
        <div className="t-layer">
          <div className="t-img">
            <img src={REACT_NATIVE} alt="이미지" />
            <div className="label">React Native blog 페이지의 그룹</div>
          </div>
          <div className="t-title">
            <div className="tr">
              <h1>React Native Community</h1>
              <span>공개그룹, 멤버 5.4천명</span>
            </div>
            <div className="tl">
              <button className="g-btn">
                <img src={PEOPLE_ICON} alt="사람" />
                <span>그룹가입</span>
              </button>
              <img src={MENU_ICON} alt="메뉴" />
            </div>
          </div>
          <div className="t-navi">
            <div className="tr">
              <LabelBox
                id={3}
                active={active}
                title="추천"
                onClick={() => setActive(3)}
              />
              <LabelBox
                id={2}
                active={active}
                title="토론"
                onClick={() => setActive(2)}
              />
              <LabelBox
                id={1}
                active={active}
                title="정보"
                onClick={() => setActive(1)}
              />
              <LabelBox
                id={4}
                active={active}
                title="주제"
                onClick={() => setActive(4)}
              />
              <LabelBox
                id={5}
                active={active}
                title="사람"
                onClick={() => setActive(5)}
              />
              <LabelBox
                id={6}
                active={active}
                title="이벤트"
                onClick={() => setActive(6)}
              />
              <LabelBox
                id={7}
                active={active}
                title="미디어"
                onClick={() => setActive(7)}
              />
              <LabelBox
                id={8}
                active={active}
                title="파일"
                onClick={() => setActive(8)}
              />
            </div>
            <div className="tl">
              <img src={HOME_ICON} alt="홈" />
              <img src={MENU_ICON} alt="메뉴" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const LabelBox = (props) => {
  const active = 1;

  const onClickButton = () => {
    props.onClick();
  };
  return (
    <span
      className={' box ' + (props.active === props.id ? ' active ' : '')}
      onClick={onClickButton}
    >
      <span className="title">{props.title}</span>
      <span className="line"></span>
    </span>
  );
};
