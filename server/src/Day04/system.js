const os = require("os");
const path = require("path");

const System = {
  info: () => {
    console.log("os version ===>" + os.version);
    console.log("os.srch() ===> ", +os.arch());
    console.log("os.freemem() ===> ", +os.freemem());
    console.log("os.homedir() ===> ", +os.homedir());
    console.log("os.hostname() ===> ", +os.hostname());
    console.log("os.totalmem() ===> ", +os.totalmem());
    console.log("os.uptime() ===> ", +os.uptime());
    console.log("os.networkInterfaces() ===> ", +os.networkInterfaces());
  },
  path: () => {
    // 경로 합치기
    console.log(
      "path.join() ===> " + path.join("C://", "programs", "test.txt")
    );

    // 파일이 들어있는 폴더만 출력
    console.log("path.dirname() ===> " + path.dirname("C:/programs/test.txt"));

    // 파일만 출력(폴더 출력X)
    console.log(
      "path.basename() ===> " + path.basename("C:/programs/test.txt")
    );

    // 파일의 확장자명만 출력
    console.log("path.extname() ===> " + path.extname("C:/programs/test.txt"));
  },
};

module.exports = System;
