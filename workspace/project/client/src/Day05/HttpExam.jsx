import axios from "axios";
import React, { useState } from "react";

const HttpExam = (props) => {
  const [data, setData] = useState("서버와 통신을 합시다...");

  const onClickGet = () => {
    const data = {
      params: { title: "프론트엔드", label: "안녕하세요" },
    };
    axios.get("/api/hello", data).then((res) => {
      console.log(res);
      setData(res.data);
    });
  };

  const onClickDelete = () => {
    const data = {
      params: { title: "프론트엔드", label: "안녕하세요" },
    };
    axios.delete("/api/hello", data).then((res) => {
      console.log(res);
      setData(res.data);
    });
  };

  const onClickPost = () => {
    const data = { title: "프론트엔드", label: "안녕하세요" };

    axios.post("/api/hello", data).then((res) => {
      console.log(res);
      setData(res.data);
    });
  };

  const onClickPut = () => {
    const data = { title: "프론트엔드", label: "안녕하세요" };
    axios.put("/api/hello", data).then((res) => {
      console.log(res);
      setData(res.data);
    });
  };
  return (
    <>
      <h1>{data}</h1>

      <button onClick={onClickGet}>GET 통신</button>
      <button onClick={onClickPost}>POST 통신</button>
      <button onClick={onClickPut}>PUT 통신</button>
      <button onClick={onClickDelete}>DELETE 통신</button>
    </>
  );
};

export default HttpExam;
