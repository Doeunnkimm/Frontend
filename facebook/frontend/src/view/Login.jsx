import { useState } from 'react';
import IMG_LOGO from '../images/facebook-logo.svg';
import { Input, Title, Image, Button, Linebar } from './Component.jsx';
import axios from 'axios';

export default function Login(props) {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUserid = (e) => {
    // console.log(e.target.value)
    setUserid(e.target.value);
  };

  const onChangePassword = (e) => {
    // console.log(e.target.value)
    setPassword(e.target.value);
  };

  const onClickLogin = () => {
    if (!userid) {
      alert('사용자 계정(이메일)은 반드시 입력해야 합니다.');
      return;
    }

    if (!password) {
      alert('사용자 비밀번호는 반드시 입력해야 합니다.');
      return;
    }

    axios
      .post('/api/login', { userid: userid, password: password })
      .then((res) => {
        const { result } = res.data;
        if (result === 'success') {
          // alert("로그인 성공");
          window.location.href = '/home';
        } else {
          alert('로그인 실패');
        }
      });
  };

  return (
    <div className="login-layer">
      <div className="logo-box">
        <Image src={IMG_LOGO} alt="" />
        <Title text="Facebook에서 전세계에 있는 친구, 가족, 지인들과 함께 이야기를 나눠보세요." />
      </div>
      <div className="login-box">
        <div>
          <Input
            title={true}
            type="text"
            placeholder="이메일 또는 전화번호"
            onChange={onChangeUserid}
          />
          <Input
            title={true}
            type="password"
            placeholder="비밀번호"
            onChange={onChangePassword}
          />

          <Button
            type={'primary'}
            className="login-button"
            onClick={onClickLogin}
            text={'로그인'}
          />
          <a onClick={() => (window.location.href = '/identify')}>
            비밀번호를 잊으셨나요?
          </a>
          <Linebar />
          <div className="regist">
            <Button
              type={'secondary'}
              onClick={() => (window.location.href = '/regist')}
              text="새 계정 만들기"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
