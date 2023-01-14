import axios from 'axios';
import { useState } from 'react';
import IMG_LOGO from '../images/facebook-logo.svg';
import {
  Input,
  Title,
  Image,
  Button,
  Linebar,
  Subtitle,
} from './Component.jsx';

export default function Regist(props) {
  const [userid, setUserid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [gender, setGender] = useState('');

  const onChangeUserid = (event) => {
    setUserid(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangePasswordCheck = (event) => {
    setPasswordCheck(event.target.value);
  };

  const onChangeYear = (event) => {
    setYear(event.target.value);
  };

  const onChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const onChangeDay = (event) => {
    setDay(event.target.value);
  };

  const onClickRegist = () => {
    if (!userid) return alert('사용자아이디는 필수 입력사항 입니다.');
    if (!email) return alert('이메일은 필수 입력사항 입니다.');
    if (!password) return alert('비밀번호 확인은 필수 입력사항 입니다.');
    if (!passwordCheck) return alert('비밀번호는 필수 입력사항 입니다.');
    if (!year) return alert('출생년도 필수 입력사항 입니다.');
    if (!month) return alert('출생월은 필수 입력사항 입니다.');
    if (!day) return alert('출생일은 필수 입력사항 입니다.');
    if (!gender) return alert('성별은 필수 입력사항 입니다.');

    if (password !== passwordCheck) {
      return alert('비밀번호와 비밀번호 확인의 값이 동일해야 합니다.');
    }

    // 이메일 형식 검증(정규식 표현)
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // 검증에 사용할 정규식 변수 regExp에 저장

    if (!email.match(regExp)) {
      return alert('이메일 형식과 맞지 않습니다. 형식을 확인하세요.');
    }

    const params = { userid, password, year, month, day, gender, email };

    axios.post('/api/regist', params).then((res) => {
      const { result } = res.data;
      if (result === 'success') {
        alert('회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.');
        window.location.href = '/';
      } else if (result === 'dup-userid') {
        alert('중복된 아이디입니다. 아이디를 변경하세요.');
      } else {
        alert('회원가입에 실패하였습니다.');
      }
    });
  };

  return (
    <div className="regist-layer">
      {/* 상단 로고 이미지 */}
      <div className="logo">
        <Image src={IMG_LOGO} alt="페이스북 로고" />
      </div>
      {/* 카드형 박스 */}
      <div className="card">
        {/* 박스 헤더 */}
        <div className="header">
          <Title className="title" text="새 계정 만들기" />
          <Subtitle className="subject" text="빠르고 쉽습니다." />
        </div>
        <Linebar />
        {/* 박스 콘텐츠 */}
        <div className="body">
          {/* 휴대폰 및 비밀번호 폼 */}
          <Input
            type="text"
            placeholder="사용자 아이디"
            onChange={onChangeUserid}
          />
          <Input
            type="text"
            placeholder="사용자 이메일"
            onChange={onChangeEmail}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            onChange={onChangePassword}
          />
          <Input
            type="password"
            placeholder="비밀번호 확인"
            onChange={onChangePasswordCheck}
          />

          {/* 생년월일 */}
          <div className="in-age">
            <Subtitle text="생일" />
            <div>
              {/* 년도 */}
              <select
                id="year"
                placeholder="연도"
                name="birthday_year"
                title="연도"
                onChange={onChangeYear}
              >
                <option value="" selected="">
                  연도
                </option>
                <option value="2022">2022</option>
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
                onChange={onChangeMonth}
              >
                <option value="" selected="">
                  월
                </option>
                <option value="1">1월</option>
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
                onChange={onChangeDay}
              >
                <option value="" selected="">
                  일
                </option>
                <option value="1">1</option>
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
            <Subtitle text="성별" />
            <span>
              <span className="in-rdo">
                <label htmlFor="rdo-1">여성</label>
                <input
                  className="gender"
                  id="rdo-1"
                  type="radio"
                  name="sex"
                  value="1"
                  onClick={() => setGender('여성')}
                />
              </span>
              <span className="in-rdo">
                <label htmlFor="rdo-2">남성</label>
                <input
                  className="gender"
                  id="rdo-2"
                  type="radio"
                  name="sex"
                  value="2"
                  onClick={() => setGender('남성')}
                />
              </span>
              {/* 제 3의 성(?) */}
              <span className="in-rdo">
                <label htmlFor="rdo-3">개인 지정</label>
                <input
                  className="gender"
                  id="rdo-3"
                  type="radio"
                  name="sex"
                  value="3"
                  onClick={() => setGender('개인지정')}
                />
              </span>
            </span>
          </div>
          {/* 하단의 가이드 */}
          <div className="guide">
            가입하기 버튼을 클릭하면 Facebook의 약관, 데이터 정책 및 쿠키 정책에
            동의하게 됩니다. Facebook으로부터 SMS 알림을 받을 수 있으며 알림은
            언제든지 옵트 아웃할 수 있습니다.
          </div>
          {/* 가입하기 버튼 */}
          <div className="regist">
            <Button type="secondary" text="가입하기" onClick={onClickRegist} />
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
  );
}
