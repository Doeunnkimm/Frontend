import { useEffect, useState } from "react";
import CLOSE_ICON from "./images/people.png";
import FACE_ICON from "./images/facebook-icon.png";
import ALARM_ICON from "./images/alarm.png";

export default function Menu(props) {
  const [visible, setVisible] = useState(props.show);

  useEffect(() => {
    if (props.show) {
      setVisible(props.show);
    }
  }, [props.show]);

  const onClickHide = () => {
    setVisible(false);
    props.onClick && props.onClick();
  };

  return (
    <>
      <section className="menu-layer">
        <div className={`menu ${visible ? "visible" : "invisible"}`}>
          <div className="box">
            <div className="head">
              <span className="icon" onClick={onClickHide}>
                <img src={CLOSE_ICON} alt="닫기" />
              </span>
            </div>
            <div className="body">
              <div className="myinfo">
                <div className="title">
                  <img src={FACE_ICON} alt="페이스북 아이콘" />
                  <div className="name">홍길동</div>
                </div>
                <div className="line"></div>
                <div className="subtitle">프로필 모두 보기</div>
              </div>
              <div className="list">
                <ul>
                  <li>
                    <span className="icon">
                      <img src={ALARM_ICON} alt="알람" />
                    </span>
                    <span className="label">설정 및 개인 정보</span>
                  </li>
                  <li>
                    <span className="icon">
                      <img src={ALARM_ICON} alt="알람" />
                    </span>
                    <span className="label">도움말 및 지원</span>
                  </li>
                  <li>
                    <span className="icon">
                      <img src={ALARM_ICON} alt="알람" />
                    </span>
                    <span className="label">디스플레이 및 접근성</span>
                  </li>
                  <li>
                    <span className="icon">
                      <img src={ALARM_ICON} alt="알람" />
                    </span>
                    <span className="label">의견 보내기</span>
                  </li>
                  <li>
                    <span className="icon">
                      <img src={ALARM_ICON} alt="알람" />
                    </span>
                    <span className="label">로그아웃</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
