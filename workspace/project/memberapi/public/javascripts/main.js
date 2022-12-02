const logoutButton = document.querySelector("#logout-btn");
logoutButton.addEventListener("click", logout);

document.getElementById("name").innerHTML =
  localStorage.getItem("name") + " 님";

function logout() {
  // 발급받은 세션을 반납해야 하는 기능
  // 반남하고 다시 로그인 창으로 이동
  window.location.pathname = "/login";
}
