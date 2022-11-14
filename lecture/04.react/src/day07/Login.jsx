import { useState, useRef } from "react";

export default function Login(props) {

    const [ userid, setUserId ] = useState();
    const [ password, setPassword ] = useState();
    const pass = useRef();

    const onChangeInput = (event) => {
        console.log(event.target.value);
        setUserId(event.target.value);
    }

    const onChangePassword = (event) => {
        console.log(event.target.value);
        setPassword(event.target.value);
    }

    const onLogin = () => {

        if(!userid) {
            alert("사용자 아이디를 입력하세요!")
            // alert 뜨고 login input에 포커스가 가도록
            const login = document.querySelector("#login")
            login.focus()
            return
        }

        if(!password) {
            alert("비밀번호를 입력하세요!")
            pass.current.focus()
            return
        }

        // 로그인이 되었습니다.
        alert(userid + "(" + password + ")" + "로 로그인 되었습니다.");
    }

    const onKeyUp = (event) => {
        console.log(event.keyCode);

        if(!userid) return; // userid가 입력되지 않았으면 밑으로 넘어가지 않겠다

        if(event.keyCode === 13) {
            pass.current.focus();
        }
    }

    return(
        <div className="login-box">
            <input id="login" className="input-email" type="text" onChange={onChangeInput} placeholder="이메일 또는 비밀번호를 입력하세요" onKeyUp={onKeyUp} />
            <input id="pass" ref={pass} className="input-password" type="password" onChange={onChangePassword} placeholder="비밀번호를 입력하세요"/>

            <button className="login-button" name="login" onClick={onLogin}>로그인</button>

            <span>비밀번호를 잊으셨나요?</span>
            <div className="div-line"></div>
            <span>새 계정 만들기</span>
        </div>
  )
}
