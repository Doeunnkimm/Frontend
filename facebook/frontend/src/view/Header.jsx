import { Image, Title, Subtitle, Button, Input } from "./Component";

import MORE_ICON from "../images/more.png";
import FACEBOOK_ICON from "../images/facebook-icon.png";
import HOME_ICON from "../images/home.png";
import YOUTUBE_ICON from "../images/youtube.png";
import PEOPLE_ICON from "../images/people.png";
import GAME_ICON from "../images/game.png";
import MENU_ICON from "../images/menu.png";
import ALARM_ICON from "../images/alarm.png";

export default function Header(props) {
  const onClickMenu = () => {
    console.log("menu click");
    if (props.onClick) {
      console.log("onclick call!!!!!");
      props.onClick();
    }
  };

  const onClickLogout = () => {
    window.location.href = "/";
    alert("로그아웃 되었습니다.");
  };

  return (
    <div className="header">
      <div className="head-logo">
        <img src={FACEBOOK_ICON} alt="메인 로고 아이콘" />
        <input placeholder="Facebook 검색" />
      </div>
      <div className="head-nav">
        <nav className="">
          <MenuIcon src={HOME_ICON} name={"home"} tagname={props.name} />
          <MenuIcon src={YOUTUBE_ICON} name={"video"} tagname={props.name} />
          <MenuIcon src={PEOPLE_ICON} name={"people"} tagname={props.name} />
          <MenuIcon src={GAME_ICON} name={"game"} tagname={props.name} />
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
          <img src={MORE_ICON} onClick={onClickLogout} />
        </span>
      </div>
    </div>
  );
}

// const MenuIcon = (props) => {
//   const {className, src, onClick} = props

//   return <span className={`btn-box ${className}`} onClick={onClick} >
//     <img src={src} />
//     <span className="btn-line"></span>
//   </span>
// }

const MenuIcon = (props) => {
  const { src, name, tagname } = props;

  return (
    <>
      <span
        className={`btn-box ${tagname === name ? "active" : ""}`}
        onClick={() => (window.location.href = `/${name}`)}
      >
        <img src={src} />
        <span className="btn-line"></span>
      </span>
    </>
  );
};
