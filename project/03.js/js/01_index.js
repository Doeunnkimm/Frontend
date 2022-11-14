window.onload = function() {
    // 화면의 element들이 모두 로딩된 후 호출된다.
    // 일반적으로 document 안의 element 조작을 위해서는
    // 이것이 호출 된 후에 작업을 진행한다.
}

const login = function() {
    const id = document.getElementById('email');
    const pwd = document.getElementById('pass');

    console.log(id.value, pwd.value);

    if(!id.value || !pwd.value) {
        alert("아이디 또는 비밀번호를 입력하세요.")
    } else {
        const item = request.login(id.value, pwd.value);
        if(item) {
            console.log("로그인 성공")
            alert(item.name + "님 환영합니다.")
            window.location.href = "./02_facebook_main.html";
        } else {
            alert("아이디 또는 비밀번호를 찾을 수 없습니다.")
        }
    }
}