const regist = function() {
    const firstname = document.querySelector("#firstname");
    const lastname = document.querySelector("#lastname");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const year = document.querySelector("#year");
    const month = document.querySelector("#month");
    const day = document.querySelector("#day");
    const gender = document.querySelectorAll(".gender");

    let type = "";
    for(const radio of gender) {
        if(radio.checked) { 
            console.log(radio) 
            type = radio.labels[0].textContent;
        }
    }

    // 유효성 검사 혹은 필수 입력 사항 세크 혹은 validation 체크
    if(!lastname.value) return alert("성을 입력하세요.");
    if(!firstname.value) return alert("이름을 입력하세요.");
    if(!email.value) return alert("이메일을 입력하세요.");
    if(!password.value) return alert("비밀번호를 입력하세요.");
    if(!type) return alert("성별을 선택하세요.");

    const json = {
        // 노드에서 데이터를 가져오려면 .value를 해주어야 함(input 타입 한정)
        // 또는 태그를 가져온다면 내부 입력 문자열을 가져오게 됨
        name: lastname.value + firstname.value,
        email: email.value,
        password: password.value,
        year: year.value,
        month: month.value,
        day: day.value
    }

    request.regist(json);
}