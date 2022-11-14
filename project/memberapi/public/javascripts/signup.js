const id = document.querySelector("#id");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const signupButton = document.querySelector("#button");

signupButton.addEventListener("click", signup);

function signup() {
  console.log("가입하기 버튼이 클릭 되었습니다.");

  if (!id.value) return alert("아이디를 입력해주세요!");
  if (confirmPassword.value != password.value)
    return alert("비밀번호가 일치하지 않아요!");

  const request = {
    name: id.value,
    password: password.value,
  };

  fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        if (!alert("회원가입이 완료되었습니다!"))
          window.location.href = "/login";
      } else {
        alert(res.message);
      }
    })
    .catch((error) => {
      console.error(new Error("회원가입 중 에러 발생"));
    });
}
