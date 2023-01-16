import { Image, Title, Subtitle, Button, Input } from './Component';
import IMG_LOGO from '../images/facebook-logo.svg';
import { useState } from 'react';
import axios from 'axios';

export default function DeleteUser(props) {
  const [userid, setUserid] = useState('');
  const [email, setEmail] = useState('');

  const onChangeUserid = (event) => {
    console.log(event.target.value);
    setUserid(event.target.value);
  };

  const onChangeEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const onClickCancel = () => {
    window.location.href = '/';
  };

  const onClickOk = () => {
    // validation 체크
    if (!userid) return alert('계정 아이디를 입력하세요');

    let check = email.indexOf('@');
    if (check < 0) return alert('이메일 형식에는 @ 이 들어가야 합니다.');

    check = email.indexOf('.');
    if (check < 0) return alert('이메일 형식에는 . 이 들어가야 합니다.');

    axios
      .delete('/api/user', { params: { email: email, userid: userid } })
      .then((res) => {
        const { result } = res.data;

        if (result === 'success') {
          alert('회원탈퇴가 정상적으로 처리되었습니다.');
          window.location.href = '/';
        } else {
          alert('회원탈퇴가 처리되지 못했습니다. 잠시후 다시 이용해주세요');
        }
      });
  };

  return (
    <div className="identify-layer delete-user-layer">
      <div className="logo-box">
        <Image src={IMG_LOGO} alt="로고" />
      </div>
      <div className="card-box">
        <div className="head">
          <Title text="회원탈퇴" />
        </div>
        <div className="body">
          <Subtitle text="계정을 삭제하려면 확인을 위해 계정 아이디와 이메일 주소를 입력하세요." />
          <Input
            type="text"
            name="userid"
            placeholder="계정 아이디"
            onChange={onChangeUserid}
          />
          <Input
            type="text"
            name="email"
            placeholder="이메일 주소"
            onChange={onChangeEmail}
          />
        </div>
        <div className="foot">
          <Button type="secondary" text="취소" onClick={onClickCancel} />
          <Button type="primary" text="탈퇴" onClick={onClickOk} />
        </div>
      </div>
    </div>
  );
}
