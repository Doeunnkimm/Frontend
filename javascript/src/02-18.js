// 템플릿 리터럴(template literal)은 역따옴표(backquote: `)로 묶인 문자열에서
// 템플릿 대입문(${})을 이용해 동적으로 문자열을 끼워 넣을 수 있는 방법을 제공한다.

const d1 = new Date();
let name = "홍길동";
let r1 = `${name} 님에게 ${d1.toDateString()}에 연락했다.`;
console.log(r1);

let product = "아이폰14pro";
let price = 1500000;
let str = `${product}의 가격은 ${price}원 입니다.`;
console.log(str);
