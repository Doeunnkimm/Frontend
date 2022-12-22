"use strict";

function addContact1(_ref) {
  var name = _ref.name,
    phone = _ref.phone,
    _ref$email = _ref.email,
    email = _ref$email === void 0 ? "이메일 없음" : _ref$email,
    _ref$age = _ref.age,
    age = _ref$age === void 0 ? 0 : _ref$age;
  // <- 가장 바람직.
  // 기본 파라미터 형태로 기본값을 부여,
  // 함수를 호출할 때 전달한 객체를 구조분해 할당으로 받아냄
  console.log(name, phone, email, age);
}
addContact1({
  name: "이몽룡",
  phone: "010-3434-8989"
});
function addContact2(contact) {
  if (!contact.email) contact.email = "이메일 없음";
  if (!contact.age) contact.age = 0;
  var name = contact.name,
    phone = contact.phone,
    email = contact.email,
    age = contact.age;
  console.log(name, phone, email, age);
}
addContact2({
  name: "이몽룡",
  phone: "010-3434-8989"
});
function addContact3(name, phone) {
  var email = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "이메일 없음";
  var age = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  console.log(name, phone, email, age);
}
addContact3("이몽룡", "010-3434-8989"); // <- 가독성 문제 존재. 무엇을 뜻하는지 알기 어려울 수 있음