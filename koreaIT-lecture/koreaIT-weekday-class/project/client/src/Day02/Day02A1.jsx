import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

const Day02A1 = (props) => {
  const [data, setData] = useState("서버와 통신을 하자...");

  const onClickGet = () => {
    axios.get("/api/hello").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  const onClickPost = () => {
    axios.post("/api/hello").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  const onClickPut = () => {
    axios.put("/api/hello").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  const onClickDelete = () => {
    axios.delete("/api/hello").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  return (
    <div>
      <h1>{data}</h1>
      <button onClick={onClickGet}>GET 요청</button>
      <button onClick={onClickPost}>POST 요청</button>
      <button onClick={onClickPut}>PUT 요청</button>
      <button onClick={onClickDelete}>DELETE 요청</button>
    </div>
  );
};

export default Day02A1;
