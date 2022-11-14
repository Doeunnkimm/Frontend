const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginButton = document.querySelector("#login-btn");
const signupButton = document.querySelector("#signup-go-btn");

loginButton.addEventListener("click", login);
signupButton.addEventListener("click", signupGo);

function login() {
  if (!id.value) return alert("아이디를 입력해주세요!");
  if (!password.value) return alert("비밀번호를 입력해주세요!");

  const request = {
    name: id.value,
    password: password.value,
  };

  localStorage.setItem("name", JSON.stringify(request.name));

  fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/main";
      } else {
        alert(res.message);
      }
    })
    .catch((error) => {
      console.error(new Error("로그인 중 에러 발생!"));
    });
}

function signupGo() {
  window.location.pathname = "/signup";
}
