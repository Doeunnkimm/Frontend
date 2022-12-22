"use strict";

// 템플릿 리터럴(template literal)은 역따옴표(backquote: `)로 묶인 문자열에서
// 템플릿 대입문(${})을 이용해 동적으로 문자열을 끼워 넣을 수 있는 방법을 제공한다.

var d1 = new Date();
var name = "홍길동";
var r1 = "".concat(name, " \uB2D8\uC5D0\uAC8C ").concat(d1.toDateString(), "\uC5D0 \uC5F0\uB77D\uD588\uB2E4.");
console.log(r1);
var product = "아이폰14pro";
var price = 1500000;
var str = "".concat(product, "\uC758 \uAC00\uACA9\uC740 ").concat(price, "\uC6D0 \uC785\uB2C8\uB2E4.");
console.log(str);