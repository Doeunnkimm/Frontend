// ES6에서는 객체의 속성 표기법이 개선됨.
// 객체의 속성을 작성할 때 속성과 변수명이 동일하다면 변수명을 생략할 수 있음.

var name = "홍길동";
var age = 20;
var email = "gdhong@test.com";

// var obj = { name: name, age: age, email: email };
var obj = { name, age, email };
console.log(obj);
