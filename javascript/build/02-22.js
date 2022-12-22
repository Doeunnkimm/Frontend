"use strict";

var p = new Promise(function (resolve, reject) {
  resolve("first!");
});
p.then(function (msg) {
  console.log(msg);
  return "second!";
}).then(function (msg) {
  console.log(msg);
  return "third!";
}).then(function (msg) {
  console.log(msg);
})["catch"](function (error) {
  console.log("에러 발생 ---> " + error);
});