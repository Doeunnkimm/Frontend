import React from "react";
import ReactDOM from "react-dom/client";
import Day02A1 from "./Day02/Day02A1";
import ConsoleExam from "./Day05/ConsoleExam";
// import App from "./App";
// import Request from "./Request.jsx";
import HttpExam from "./Day05/HttpExam";
import PromiseExam from "./Day06/PromiseExam";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Request /> */}
    {/* <Day02A1 /> */}
    <HttpExam />
  </React.StrictMode>
);

// ConsoleExam.time();
// ConsoleExam.table();
// ConsoleExam.log();
// ConsoleExam.dir();
// ConsoleExam.rest();
// PromiseExam.callback();
// PromiseExam.callbackFunc();
// PromiseExam.promise();
// PromiseExam.promiseCatch();
// PromiseExam.promiseThen();
PromiseExam.promiseAsync();
