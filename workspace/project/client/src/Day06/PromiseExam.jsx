const PromiseExam = {
  callback: () => {
    console.log("callback start!!!!!");

    let count = 0;

    // callback 함수 시작 후 1초 뒤에 시작하는 함수
    setTimeout(() => {
      count = count + 1;
      console.log("1초 후에 시작하는 함수 !!!! ---> count = " + count);

      // 첫번째 setTimeout() 함수 실행 후 1초 뒤에 시작
      setTimeout(() => {
        count = count + 1;
        console.log("1초 후에 시작하는 함수 !!!! ---> count = " + count);
        // 두번째 setTimeout() 함수 실행 후 1초 뒤에 시작
        setTimeout(() => {
          count = count + 1;
          console.log("1초 후에 시작하는 함수 !!!! ---> count = " + count);
        }, 1000);
      }, 1000);
    }, 1000);

    console.log("callback end!!!!");
  },

  callbackFunc: () => {
    console.log("callback start!!!");

    let count = 0;

    const myCounter = (callback) => {
      setTimeout(() => {
        count = count + 1;
        console.log("1초후에 시작하는 함수 !! ---> count = " + count);
        callback();
      }, 1000);
    };

    myCounter(() => {
      myCounter(() => {
        myCounter(() => {
          console.log("callback final!!!");
        });
      });
    });
    console.log("callback end");
  },

  promise: () => {
    const myPromise = new Promise((resolve) => {
      setTimeout(() => {
        let sum = 10;
        resolve(sum);
      }, 1000);
    });

    console.log("promise start!!");
    myPromise.then((result) => {
      console.log("----> 1초후에 시작하는 함수");
      console.log(result);
    });
  },

  promiseCatch: () => {
    const myPromise = (a, b) =>
      new Promise((resolve, reject) => {
        setInterval(() => {
          if (b === 0) {
            reject("0으로 나눌 수 없습니다.");
          } else {
            resolve(a / b);
          }
        }, 1000);
      });

    myPromise(10, 2)
      .then((result) => {
        console.log(result);
        console.log("promise end!!!");
      })
      .catch((error) => {
        console.warn(error);
        console.log("promise catch");
      });
  },

  promiseThen: () => {
    const myPromise = (count) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(count + 1);
        }, 1000);
      });

    myPromise(0)
      .then((count) => {
        console.log("1초후에 실행되는 함수 ---> count = " + count);
        return myPromise(count);
      })
      .then((count) => {
        console.log("1초후에 실행되는 함수 ---> count = " + count);
        return myPromise(count);
      })
      .then((count) => {
        console.log("1초후에 실행되는 함수 ---> count = " + count);
        return myPromise(count);
      });
  },

  promiseAsync: async () => {
    const myPromise = (count) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(count + 1);
        }, 1000);
      });

    let res = 0;

    // res = await myPromise(res);
    // console.log("1초뒤에 결과를 받는다 ---> count =  " + res);
    // res = await myPromise(res);
    // console.log("1초뒤에 결과를 받는다 ---> count =  " + res);
    // res = await myPromise(res);
    // console.log("1초뒤에 결과를 받는다 ---> count =  " + res);
    // res = await myPromise(res);
    // console.log("1초뒤에 결과를 받는다 ---> count =  " + res);
    // res = await myPromise(res);
    // console.log("1초뒤에 결과를 받는다 ---> count =  " + res);

    for (let i = 0; i < 10; i++) {
      res = await myPromise(res);
      console.log("1초뒤에 결과를 받는다 ---> count =  " + res);
    }
  },
};

module.exports = PromiseExam;
