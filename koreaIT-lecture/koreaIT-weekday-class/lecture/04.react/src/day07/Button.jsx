import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
// 스타일을 작성
    border-radius: 5px;
    border: 1px solid lightgray;
    padding: 6px 12px;
    background-color: white;
`

export default function Button(props) {
    return <StyledButton>버튼입니다.</StyledButton>
}