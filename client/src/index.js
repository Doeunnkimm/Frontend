import React from "react";
import ReactDOM from "react-dom/client";
import Day02A1 from "./Day02/Day02A1";
import ConsoleExam from "./Day05/ConsoleExam";
// import App from "./App";
// import Request from "./Request.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Request /> */}
    <Day02A1 />
  </React.StrictMode>
);

// ConsoleExam.time();
// ConsoleExam.table();
// ConsoleExam.log();
// ConsoleExam.dir();
ConsoleExam.rest();
