const { months } = require("moment");
const moment = require("moment");

const Moment = {
  today: () => {
    console.log("today ===> ");
    console.log(moment());
  },
  date: () => {
    console.log("date ===> ");
    console.log(moment("2022-01-27"));
    console.log(moment("2022/01/27", "YYYY/MM/DD")); // 구분자를 알려주어 형식 맞춰줄 수 있음
  },
  format: () => {
    console.log("format ===> ");
    const date = moment(); // 오늘 날짜의 시간으로 만들 moment
    console.log("년-월-일" + date.format("YYYY-MM-DD"));
    console.log("시:분:초" + date.format("HH:mm:ss"));
    console.log("요일 ---> " + date.format("dddd"));
    console.log("년-월-일 요일 --->" + date.format("YYYY-MM-DD dddd"));
    console.log(
      "년-월-일 요일 시:분:초 --->" + date.format("YYYY-MM-DD dddd HH:mm:ss")
    );
    console.log(
      "년-월-일 요일 시:분:초.밀리초 --->" +
        date.format("YYYY-MM-DD dddd HH:mm:ss.SSS")
    );
  },
  add: () => {
    console.log("add or subtract ===> ");

    // 날짜 더하기(일 + 1)
    console.log(moment("2022-01-27").add(1, "days"));

    // 포멧을 같이 이용
    console.log(
      "년 빼기 ===> " +
        moment("2022-10-10 10:10:10")
          .subtract(1, "years")
          .format("YYYY/MM/DD HH:mm:ss")
    );
    console.log(
      "월 빼기 ===> " +
        moment("2022-10-10 10:10:10")
          .subtract(1, "months")
          .format("YYYY/MM/DD HH:mm:ss")
    );
    console.log(
      "일 빼기 ===> " +
        moment("2022-10-10 10:10:10")
          .subtract(1, "days")
          .format("YYYY/MM/DD HH:mm:ss")
    );
    console.log(
      "시 빼기 ===> " +
        moment("2022-10-10 10:10:10")
          .subtract(1, "hours")
          .format("YYYY/MM/DD HH:mm:ss")
    );
    console.log(
      "분 더하기 ===> " +
        moment("2022-10-10 10:10:10")
          .subtract(1, "minutes")
          .format("YYYY/MM/DD HH:mm:ss")
    );
    console.log(
      "초 더하기 ===> " +
        moment("2022-10-10 10:10:10")
          .subtract(1, "seconds")
          .format("YYYY/MM/DD HH:mm:ss")
    );

    console.log(
      "년 더하기 ===> " +
        moment("2022-10-10 10:10:10")
          .subtract(1, "years")
          .format("YYYY/MM/DD HH:mm:ss")
    );
    console.log(
      "월 빼기 ===> " +
        moment("2022-10-10 10:10:10")
          .subtract(1, "months")
          .format("YYYY/MM/DD HH:mm:ss")
    );
    console.log(
      "일 빼기 ===> " +
        moment("2022-10-10 10:10:10")
          .subtract(1, "days")
          .format("YYYY/MM/DD HH:mm:ss")
    );
    console.log(
      "시 빼기 ===> " +
        moment("2022-10-10 10:10:10")
          .subtract(1, "hours")
          .format("YYYY/MM/DD HH:mm:ss")
    );
    console.log(
      "분 빼기 ===> " +
        moment("2022-10-10 10:10:10")
          .subtract(1, "minutes")
          .format("YYYY/MM/DD HH:mm:ss")
    );
    console.log(
      "초 빼기 ===> " +
        moment("2022-10-10 10:10:10")
          .add(1, "seconds")
          .format("YYYY/MM/DD HH:mm:ss")
    );
  },
  diff: () => {
    console.log("diff ==========> ");

    console.log(
      "년 차이 ===> " + moment("2022-10-10").diff("2023-11-11", "years")
    );
    console.log(
      "년 차이 ===> " + moment("2022-10-10").diff("2020-09-09", "years")
    );
    console.log(
      "월 차이 ===> " + moment("2022-10-10").diff("2023-09-09", "months")
    );
  },
};

module.exports = Moment;
