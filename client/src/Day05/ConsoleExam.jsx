const ConsoleExam = {
  time: () => {
    console.log("\n\n\n ================> time");

    console.log("측정시작");

    // 뒤에 이름 맞춰주어야 함!
    console.time("timecheck");
    for (let i = 0; i < 100; i++) {
      console.log("timecheck ---" + i);
    }
    console.timeEnd("timecheck");

    console.log("측정종료");
  },

  table: () => {
    console.log("\n\n\n ================> table");

    const jsonarray = [
      { name: "홍길동", birth: 1997, gender: "남" },
      { name: "김유신", birth: 1998, gender: "남" },
      { name: "유관순", birth: 1999, gender: "여" },
      { name: "김철수", birth: 1992, gender: "남" },
      { name: "김영희", birth: 1993, gender: "여" },
    ];

    console.table(jsonarray);
  },

  log: () => {
    console.log("\n\n\n ================> log");

    console.log("console.log를 사용한 array 객체 출력");

    console.log(["apple", "bananan", "orange"]);
    console.log("\n");

    console.log("console.log를 사용해 json 객체를 출력");
    console.log({ name: "홍길동", title: "test-file", age: 10 });

    console.log("console.log를 사용해 여러 개의 인자를 출력");
    console.log("test", [1, 2, 3], { title: "test" }, [
      { name: "홍길동" },
      { name: "김유신" },
    ]);
  },

  dir: () => {
    console.log("\n\n\n ================> dir");

    console.dir("console.dir를 사용한 array 객체 출력");

    console.dir(["apple", "bananan", "orange"]);
    console.log("\n");

    console.dir("console.dir를 사용해 json 객체를 출력");
    console.dir({ name: "홍길동", title: "test-file", age: 10 });

    console.dir("console.dir를 사용해 여러 개의 인자를 출력");
    console.dir("test", [1, 2, 3], { title: "test" }, [
      { name: "홍길동" },
      { name: "김유신" },
    ]);

    console.dir(
      "depth는 객체 안의 객체를 몇단계까지 보여줄지를 결정, 기본값: 2"
    );
    const obj = {
      outside: {
        inside: {
          key: "value",
          test: { name: "test" },
        },
      },
    };

    console.dir(obj);
    console.dir(obj, { colors: false, depth: 3 });
    console.dir(obj, { colors: true, depth: 1 });
  },

  rest: () => {
    console.log("\n\n\n ================> rest");

    console.log("기본");
    console.info("정보");
    console.debug("디버그");
    console.warn("경고");
    console.error("에러");

    console.trace("에러위치추적");
  },
};

module.exports = ConsoleExam;
