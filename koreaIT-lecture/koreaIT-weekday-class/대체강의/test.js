/* 
자판기라는 함수를 정의

자판기 함수는 처음에 실행되었을 때
"자판기가 가동되었습니다"라는 콘솔이 로그

파라미터(인자, 매개변수)로는 coin과 메뉴이름

반환값은
잔돈이 0원이면 음료수 이름을 반환
잔돈이 있으면 음료수 이름과 잔돈을 반환

만약, 선택한 음료수의 값이 coin보다 클 경우
console.log 금액이 부족합니다.

메뉴가 없다면 console.log 없는 메뉴입니다.

메뉴

솔의눈 300원
비타500 500원
콜라 1000원

조건 else if (X)
*/

function 자판기(coin, product) {
  let menu = {
    솔의눈: 300,
    비타5000: 500,
    콜라: 1000,
  };

  let productPrice = menu[product];

  if (!productPrice) return console.log("제품이 없습니다.");
  if (coin < productPrice) return console.log("금액이 부족합니다.");

  let change = coin - productPrice;
  if (change === 0) return console.log(product);
  return console.log(
    `주문하신 ${product} 이/가 나왔습니다. 잔돈은 ${change}입니다.`
  );
}

/*
원시타입, 창조타입

원시타입(string, boolean, number)
참조타입(object)

let arr = {

    0:1
    1:2
    2:3
    3:4
}

JSON
(Javascript Object Notation)

1. 데이터를 저장하거나 전송에 많이 쓰이는 데이터의 한 유형
2. 자바스크립트에서는 객체를 만들 때 사용하는 표현식

ex)
/api/posts === 게시글을 조회하는 데이터를 받아왔음
[
    {
        id: 1
        title: "오늘은 좋은 하루입니다."
        User: {
            name: "김성용",
            profile_img: "scr 경로"
        },
        Content: "내용",
        CreatedAt: "2022.12.08"
        Hits: 298,
        Comment: [ ... ],
    },
    {
        id: 1
        title: "오늘은 좋은 하루입니다."
        User: {
            name: "김성용",
            profile_img: "scr 경로"
        },
        Content: "내용",
        CreatedAt: "2022.12.08"
        Hits: 298,
        Comment: [ ... ],
    },
]
*/
