import { Image, Title, Subtitle, Button, Input } from "./Component";
import IMG_LOGO from "../images/facebook-logo.svg";
import { useState } from "react";
import axios from "axios";

export default function Identify(props) {
  const [email, setEmail] = useState("");

  const onChangeEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
    console.log("값을 저장해 두자...");
  };

  const onClickCnacel = () => {
    console.log("로그인 화면으로 이동하자...");
    window.location.href = "/";
  };

  const onClickSearch = () => {
    if (!email) return alert("이메일은 반드시 입력해야 합니다.");

    let check = email.indexOf("@");
    if (check < 0) return alert("이메일 형식에는 @ 문자가 들어가야 합니다.");

    check = email.indexOf(".");
    if (check < 0) return alert("이메일 형식에는 . 문자가 들어가야 합니다.");

    console.log("서버에서 이메일로 계정을 검색하자...");
    axios.get("/api/identify", { params: { email } }).then((res) => {
      console.log(res.data);

      const { result, text } = res.data;
      if (result === "fail" && text) {
        alert(text);
      } else {
        alert("계정은 " + result + " 입니다.");
      }
    });
  };
  return (
    <div className="identify-layer">
      <div class="logo-box">
        <Image src={IMG_LOGO} alt="로고" />
      </div>
      <div class="card-box">
        <div class="head">
          <Title text="내 계정 찾기" />
        </div>
        <div class="body">
          <Subtitle text="계정을 검색하려면 이메일 주소 또는 휴대폰 번호를 입력하세요." />
          <Input
            type="text"
            placeholder="이메일 입력하세요"
            onChange={onChangeEmail}
          />
        </div>
        <div class="foot">
          <Button type="secondary" text="취소" onClick={onClickCnacel} />
          <Button type="primary" text="검색" onClick={onClickSearch} />
        </div>
      </div>
    </div>
  );
}
