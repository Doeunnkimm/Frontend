import EDU_ICON from './images/edu_icon.png';
import MORE_ICON from './images/more.png';
import VIDEO_SAMPLE from './images/video_sample.mp4';
import HOME_ICON from './images/home.png';
import YOUTUBE_ICON from './images/youtube.png';
import PEOPLE_ICON from './images/people.png';

import Header from './Header';

export default function Video(props) {
  return (
    <>
      <Header name='video' />
      <section className='home-layer video-layer'>
        <ul className='list'>
          <li>
            <div className='card'>
              <div className='head'>
                <div>
                  <img className='logo' src={EDU_ICON} alt='광고 아이콘' />
                  <span className='title'>에듀윌</span>
                  <span className='time'>8월 19일 오후 5:00</span>
                  <img className='more' src={MORE_ICON} alt='더보기 메뉴' />
                </div>
                <div className='text'>
                  <p>
                    초시생 필수템, 만화입문서 무료배포! #합격자수1위 #에듀윌
                    #공인중개사
                  </p>
                </div>
              </div>
              <div className='body'>
                <div className='image'>
                  <video src={VIDEO_SAMPLE} controls autoplay />
                </div>
              </div>
              <div className='foot'>
                <div className='left'>
                  <div className='btn-box active'>
                    <img src={HOME_ICON} alt='홈 바로가기' />
                    <span className='btn-text'>좋아요</span>
                  </div>
                  <div className='btn-box'>
                    <img src={YOUTUBE_ICON} alt='동영상 바로가기' />
                    <span className='btn-text'>댓글 달기</span>
                  </div>
                  <div className='btn-box'>
                    <img src={PEOPLE_ICON} alt='사용자 바로가기' />
                    <span className='btn-text'>공유 하기</span>
                  </div>
                </div>
                <div className='right'>
                  <span className='text'>댓글 17개,</span>
                  <span className='text'>조회 32만회</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
}
