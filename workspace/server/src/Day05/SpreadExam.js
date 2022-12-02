const SpreadExam = {
  // 배열 병합
  exam01: () => {
    // ES5 배열 병합 기존 방식
    var arr1 = [1, 2, 3];
    var arr2 = [4, 5, 6];

    var arr3 = arr1.concat(arr2);
    console.log("-------------- arr3");
    console.log(arr3);

    // ES6 spread operator
    var arr4 = [...arr1, ...arr2];
    console.log("-------------- arr4");
    console.log(arr4);

    // push를 이용한 기존 방식
    var arr5 = [];
    arr5.push(arr1[0]);
    arr5.push(arr1[1]);
    arr5.push(arr1[2]);
    arr5.push(arr2[0], arr2[1], arr2[2]); // 한번에 여러개를 push도 가능

    console.log("-------------- arr5");
    console.log(arr5);

    var arr6 = [];
    arr6.push(...arr1, ...arr2);
    console.log("-------------- arr6");
    console.log(arr6);

    // [0, 1, 2, 3, 7, 8]
    // 0 + arr1 + 7 + 8
    var arr7 = [];
    arr7 = [0].concat(arr1);
    arr7.push(7, 8);
    console.log("-------------- arr7");
    console.log(arr7);

    var arr8 = [0, ...arr1, 7, 8];
    console.log("-------------- arr8");
    console.log(arr8);
  },

  // 배열 복사
  exam02: () => {
    // 자바스크립트 배열 복사 => 원본 배열이 주소로 복사되어
    // arr2를 변경해도 arr1도 변경된다.
    var arr1 = ["철수", "영희"];
    var arr2 = arr1;

    arr2.push("바둑이");
    console.log("-----> arr2에만 '바둑이'를 추가했는데...");
    console.log(arr2);
    console.log("-----> arr1도 변경이 되었다");
    console.log(arr1);

    // Javascript  array 값 복사
    var arr3 = ["철수", "영희"];
    var arr4 = arr3.slice();

    arr4.push("바둑이");
    console.log("-----> arr4에만 '바둑이'를 추가했는데...");
    console.log(arr4);
    console.log("-----> arr3는 그대로 유지된다.");
    console.log(arr3);

    // Array 오브젝트의 map을 이용한 값 복사
    var arr5 = ["철수", "영희"];
    var arr6 = arr5.map((item) => {
      return item;
    });

    arr5.push("바둑이");
    console.log("-----> arr5에만 '바둑이'를 추가했는데...");
    console.log(arr4);
    console.log("-----> arr6는 그대로 유지된다.");
    console.log(arr3);

    // ES6 문법인 spread operator 이용한 값 복사
    var arr7 = ["이순신", "김유신"];
    var arr8 = [...arr7];

    arr7.push("바둑이");
    console.log("-----> arr7에만 '바둑이'를 추가했는데...");
    console.log(arr7);
    console.log("-----> arr8는 그대로 유지된다.");
    console.log(arr8);
  },

  // 구조 분해
  exam03: () => {
    // 기존의 변수 할당 방식
    var score1 = { eng: 100, kor: 90, math: 70 };
    // var eng = score1.eng;
    // var kor = score1.kor;
    // var math = score1.math;

    // console.log(eng, kor, math);

    // 구조 분해 할당 방식
    var { eng, kor, math } = score1;
    console.log(eng, kor, math);

    // 일부만 분해해 오고 싶을 때도 가능
    var { eng, kor } = score1;
    console.log(eng, kor);

    // 구조 분해를 이용한 복사
    var score2 = { ...score1 };

    score2.eng = 10;
    console.log(score1);
    console.log(score2);

    var score3 = { ...score1, totla: 80 };
    console.log(score3);
  },
};

module.exports = SpreadExam;
