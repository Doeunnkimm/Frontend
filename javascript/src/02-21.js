// 프로미스
// 이전까지는 비동기 처리를 수행할 때 비동기 처리가 완료되면 콜백 함수가 호출되도록 작성하는 것이 일반적인 형태였음.
// 이 방법은 비동기로 처리할 작업이 순차적으로 반복되면 콜백 함수들이 중첩되어
// 예외 처리가 힘들어지고 복잡도가 증가하는 문제점이 있다.

// ES6에서는 프로미스(promise) 객체를 지원해 비동기 처리를 좀 더 깔끔하게 수행할 수 있다.

// 프로미스의 기본 사용법
// const p = new Promise((resolve, reject) => {
// 비동기 작업 수행
// 이 내부에서 resolve(result) 함수를 호출하면 then에 등록해둔 함수가 호출됨
// reject(error)를 호출하거나 Error가 발생하면 catch에 등록해둔 함수가 호출됨
// });

// p.then((result) => {})
// .catch((error) => {})

// Promise 객체가 생성됨과 동시에 함수를 실행
// 시작 함수에는 비동기로 처리할 작업을 정의
// 작업이 완료되면 처리 결과에 따라 작업이 성공이라면 인자로 전달받는 resolve 함수를 호출하여 then()에 등록한 함수가 실행
// 시작 함수 내부에서 reject 함수가 호출되면 catch에 등록해둔 함수가 실행

// resolve()나 reject()를 호출할 때 비동기 작업의 처리 결과나 에러 정보를 인자로 전달할 수 있다.
// 이 값은 then, catch에 등록한 함수의 인자로 전달받는다.

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    var num = Math.random();
    if (num >= 0.8) {
      reject("생성된 숫자가 0.8 이상임 - " + num);
    }
    resolve(num);
  }, 2000);
});

p.then((result) => {
  console.log("처리 결과: ", result);
}).catch((error) => {
  console.log("에러: ", error);
});

console.log("## Promise 객체 생성!");
