import { useEffect, useState } from 'react'

import MORE_ICON from '../images/more.png'
import FACEBOOK_ICON from '../images/facebook-icon.png'
import HOME_ICON from '../images/home.png'
import YOUTUBE_ICON from '../images/youtube.png'
import PEOPLE_ICON from '../images/people.png'
import GAME_ICON from '../images/game.png'
import MENU_ICON from '../images/menu.png'
import ALARM_ICON from '../images/alarm.png'

export default function Header(props) {
  const [active, setActive] = useState('home')

  useEffect(() => {
    console.log(window.location.pathname)
    const { pathname } = window.location

    if(pathname === "/video") {
      setActive('video')
    } else if(pathname === "/people") {
      setActive('people')
    } else if(pathname === "/game") {
      setActive('game')
    } else {
      setActive('home')
    }
  }, [])

  const onClickHome = () => {
    window.location.href = "/"
  }

  const onClickVideo = () => {
    window.location.href = "/video"
  }

  const onClickPeople = () => {
    window.location.href = "/people"
  }

  const onClickGame = () => {
    window.location.href = "/game"
  }

  const onClick = () => {
    props.onClick && props.onClick()
  }

  return (
    <div className="header">
      <div className="head-logo">
        <img src={FACEBOOK_ICON} alt="메인 로고 아이콘" />
        <input placeholder="Facebook 검색" />
      </div>
      <div className="head-nav">
        <nav className="">
          <span className={`btn-box ${active === "home" ? 'active' : ''}`} onClick={onClickHome} >
            <img src={HOME_ICON} alt="홈 바로가기" />
            <span className="btn-line"></span>
          </span>
          <span className={`btn-box ${active === "video" ? 'active' : ''}`} onClick={onClickVideo}>
            <img src={YOUTUBE_ICON} alt="동영상 바로가기"/>
            <span className="btn-line"></span>
          </span>
          <span className={`btn-box ${active === "people" ? 'active' : ''}`} onClick={onClickPeople} >
            <img src={PEOPLE_ICON} alt="사용자 바로가기" />
            <span className="btn-line"></span>
          </span>
          <span className={`btn-box ${active === "game" ? 'active' : ''}`} onClick={onClickGame} >
            <img src={GAME_ICON} alt="게임 바로가기" />
            <span className="btn-line"></span>
          </span>
        </nav>
      </div>
      <div className="head-side">
        <span className="btn-box" onClick={onClick}>
          <img src={MENU_ICON} alt="메뉴 바로가기" />
        </span>
        <span className="btn-box">
          <img src={ALARM_ICON} alt="알림 바로가기" />
        </span>
        <span className="btn-box">
          <img src={MORE_ICON} alt="더보기 바로가기" />
        </span>
      </div>
    </div>
  )
}
  