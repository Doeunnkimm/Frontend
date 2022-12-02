import userEvent from "@testing-library/user-event";
import axios from "axios";
import { React, useEffect, useState } from "react";

const Request = (props) => {
  const [data, setData] = useState("서버와 통신을 하자...");

  // 초기에 Request 컴포넌트가 호출이 되면서
  // DOM을 렌더링하고 바로 useEffect를 호출한다.
  // 빈 배열을 입력하면 화면이 렌더링된 최초에 한번만 호출이 된다.
  useEffect(() => {
    // useEffect가 호출되고 나서 1초 뒤에 이 함수를 수행한다.
    setTimeout(() => {
      // proxy에서 설정한 8080 포트로 연결하여 값을 가져온다.
      axios.get("/api/hello").then((res) => {
        console.log(res);
        setData(res.data);
      });
    }, 1000);
  }, []);
  return <h1>{data}</h1>;
};

export default Request;
