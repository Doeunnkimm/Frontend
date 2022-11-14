import MORE_ICON from "./images/more.png";
import HOME_ICON from "./images/home.png";
import YOUTUBE_ICON from "./images/youtube.png";
import PEOPLE_ICON from "./images/people.png";
import FACEBOOK_ICON from "./images/facebook-icon.png";
import GAME_ICON from "./images/game.png";
import MENU_ICON from "./images/menu.png";
import ALARM_ICON from "./images/alarm.png";
import { useEffect, useState } from "react";

export default function Header(props) {
  // const [active, setActive] = useState(props.name)

  const onClickMenu = () => {
    console.log("menu click");
    if (props.onClick) {
      console.log("onclick call!!!!!");
      props.onClick();
    }
  };

  // console.log("props.name = ", props.name)
  // console.log("active = ", active)

  const getClass = (name) => {
    // console.log("===========")
    // console.log("props.name = ", props.name, "param name = ", name)
    const str = "btn-box" + (props.name === name ? " active " : "");
    // console.log(str)
    return str;
  };

  // console.log("props.name = ", props.name)
  // console.log(getClass(props.name))

  return (
    <div className="header">
      <div className="head-logo">
        <img src={FACEBOOK_ICON} />
        <input type="text" placeholder="Facebook 검색" />
      </div>
      <div className="head-nav">
        <nav>
          <span
            className={getClass("home")}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <img src={HOME_ICON} />
            <span className="btn-line"></span>
          </span>
          <span
            className={getClass("video")}
            onClick={() => {
              window.location.href = "/video";
            }}
          >
            <img src={YOUTUBE_ICON} />
            <span className="btn-line"></span>
          </span>
          <span
            className={getClass("people")}
            onClick={() => {
              window.location.href = "/people";
            }}
          >
            <img src={PEOPLE_ICON} />
            <span className="btn-line"></span>
          </span>
          <span
            className={getClass("game")}
            onClick={() => {
              window.location.href = "/game";
            }}
          >
            <img src={GAME_ICON} />
            <span className="btn-line"></span>
          </span>
        </nav>
      </div>
      <div className="head-side">
        <span className="btn-box" onClick={onClickMenu}>
          <img src={MENU_ICON} />
        </span>
        <span className="btn-box">
          <img src={ALARM_ICON} />
        </span>
        <span className="btn-box">
          <img src={MORE_ICON} />
        </span>
      </div>
    </div>
  );
}
