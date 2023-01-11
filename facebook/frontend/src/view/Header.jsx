import { Image, Title, Subtitle, Button, Input } from './Component';

import MORE_ICON from '../images/more.png';
import FACEBOOK_ICON from '../images/facebook-icon.png';
import HOME_ICON from '../images/home.png';
import YOUTUBE_ICON from '../images/youtube.png';
import PEOPLE_ICON from '../images/people.png';
import GAME_ICON from '../images/game.png';
import MENU_ICON from '../images/menu.png';
import ALARM_ICON from '../images/alarm.png';

// export default function Header(props) {
//   const onClickMenu = () => {
//     console.log("menu click")
//     if(props.onClick) {
//         console.log("onclick call!!!!!")
//         props.onClick()
//     }
//   }

//   return (
//     <div className="header">
//       <div className="head-logo">
//         <img src={FACEBOOK_ICON} alt="메인 로고 아이콘" />
//         <input placeholder="Facebook 검색" />
//       </div>
//       <div className="head-nav">
//         <nav className="">
//           <span className={`btn-box ${props.name === "home" ? 'active' : ''}`} onClick={() => { window.location.href = "/" }} >
//             <img src={HOME_ICON} />
//             <span className="btn-line"></span>
//           </span>
//           <span className={`btn-box ${props.name === "video" ? 'active' : ''}`} onClick={() => { window.location.href = "/video" }}>
//             <img src={YOUTUBE_ICON} />
//             <span className="btn-line"></span>
//           </span>
//           <span className={`btn-box ${props.name === "people" ? 'active' : ''}`} onClick={() => { window.location.href = "/people" }} >
//             <img src={PEOPLE_ICON} />
//             <span className="btn-line"></span>
//           </span>
//           <span className={`btn-box ${props.name === "game" ? 'active' : ''}`} onClick={() => { window.location.href = "/game" }} >
//             <img src={GAME_ICON} />
//             <span className="btn-line"></span>
//           </span>
//         </nav>
//       </div>
//       <div className='head-side'>
//         <span className='btn-box' onClick={onClickMenu}>
//             <img src={MENU_ICON} />
//         </span>
//         <span className='btn-box'>
//             <img src={ALARM_ICON} />
//         </span>
//         <span className='btn-box'>
//             <img src={MORE_ICON} />
//         </span>
//       </div>
//     </div>
//   )
// }

export default function Header(props) {
  const onClickMenu = () => {
    console.log('menu click');
    if (props.onClick) {
      console.log('onclick call!!!!!');
      props.onClick();
    }
  };

  return (
    <div className="header">
      <div className="head-logo">
        <img src={FACEBOOK_ICON} alt="메인 로고 아이콘" />
        <input placeholder="Facebook 검색" />
      </div>
      <div className="head-nav">
        <nav className="">
          <MenuIcon
            src={HOME_ICON}
            className={props.name === 'home' ? 'active' : ''}
            onClick={() => {
              window.location.href = '/';
            }}
          />
          <MenuIcon
            src={YOUTUBE_ICON}
            className={props.name === 'video' ? 'active' : ''}
            onClick={() => {
              window.location.href = '/video';
            }}
          />
          <MenuIcon
            src={PEOPLE_ICON}
            className={props.name === 'people' ? 'active' : ''}
            onClick={() => {
              window.location.href = '/people';
            }}
          />
          <MenuIcon
            src={GAME_ICON}
            className={props.name === 'game' ? 'active' : ''}
            onClick={() => {
              window.location.href = '/game';
            }}
          />
          <MenuIcon
            src={ALARM_ICON}
            className={props.name === 'board' ? 'active' : ''}
            onClick={() => {
              window.location.href = '/board';
            }}
          />
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

const MenuIcon = (props) => {
  const { className, src, onClick } = props;

  return (
    <span className={`btn-box ${className}`} onClick={onClick}>
      <img src={src} />
      <span className="btn-line"></span>
    </span>
  );
};
