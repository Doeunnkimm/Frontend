import IMG_LOGO from './images/facebook-logo.svg';

export default function Home(props) {
  return (
    <div>
      <div className="regist-layer">
        {/* 상단 로고 이미지 */}
        <div className="logo">
          <img src={IMG_LOGO} alt="페이스북 로고" />
        </div>
        {/* 카드형 박스 */}
        <div className="card">
          {/* 박스 헤더 */}
          <div className="header">
            <div className="title">새 계정 만들기</div>
            <div className="subject">빠르고 쉽습니다.</div>
          </div>
          {/* 박스 콘텐츠 */}
          <div className="body">
            {/* 성명 입력 폼 */}
            <div className="in-name">
              <div>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder="성(姓)"
                />
              </div>
              <div>
                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  placeholder="이름(성은 제외)"
                />
              </div>
            </div>
            {/* 휴대폰 및 비밀번호 폼 */}
            <div className="in-info">
              <div>
                <input
                  id="email"
                  type="text"
                  name="reg_email"
                  placeholder="휴대폰 번호 또는 이메일"
                />
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  name="reg_pass"
                  placeholder="새 비밀번호"
                />
              </div>
            </div>
            {/* 생년월일 */}
            <div className="in-age">
              <div className="text">생일</div>
              <div>
                {/* 년도 */}
                <select
                  id="year"
                  placeholder="연도"
                  name="birthday_year"
                  title="연도"
                >
                  <option value="2022" selected="1">
                    2022
                  </option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2010">....</option>
                  <option value="1905">1900</option>
                </select>
                {/* 월 */}
                <select
                  id="month"
                  placeholder="월"
                  name="birthday_month"
                  title="월"
                >
                  <option value="1" selected="1">
                    1월
                  </option>
                  <option value="2">2월</option>
                  <option value="3">3월</option>
                  <option value="12">12월</option>
                </select>
                {/* 일 */}
                <select
                  id="day"
                  placeholder="일"
                  name="birthday_day"
                  title="일"
                >
                  <option value="1" selected="1">
                    1
                  </option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="31">31</option>
                </select>
              </div>
            </div>
            {/* 성별 */}
            <div className="in-type">
              <div className="text">성별</div>
              <span>
                <span className="in-rdo">
                  <label for="rdo-1">여성</label>
                  <input
                    className="gender"
                    id="rdo-1"
                    type="radio"
                    name="sex"
                    value="1"
                  />
                </span>
                <span className="in-rdo">
                  <label for="rdo-2">남성</label>
                  <input
                    className="gender"
                    id="rdo-2"
                    type="radio"
                    name="sex"
                    value="2"
                  />
                </span>
                {/* 제 3의 성(?) */}
                <span className="in-rdo">
                  <label for="rdo-3">개인 지정</label>
                  <input
                    className="gender"
                    id="rdo-3"
                    type="radio"
                    name="sex"
                    value="3"
                  />
                </span>
              </span>
            </div>
            {/* 하단의 가이드 */}
            <div className="guide">
              가입하기 버튼을 클릭하면 Facebook의 약관, 데이터 정책 및 쿠키
              정책에 동의하게 됩니다. Facebook으로부터 SMS 알림을 받을 수 있으며
              알림은 언제든지 옵트 아웃할 수 있습니다.
            </div>
            {/* 가입하기 버튼 */}
            <div className="regist">
              <button type="submit" name="websubmit" onclick="regist()">
                가입하기
              </button>
            </div>
            {/* 로그인 페이지 이동 */}
            <div className="login">
              <span onClick={() => (window.location.href = '/login')}>
                이미 계정이 있으신가요?
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
