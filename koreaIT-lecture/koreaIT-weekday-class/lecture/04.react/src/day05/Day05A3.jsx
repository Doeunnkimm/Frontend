import React from "react";
import { useState, useEffect } from "react";

export default function Day05A3(props) {
    const [count, setCount] = useState(Number(props.value));
    const [name, setName] = useState("홍길동");

    // count 값이 변경될 때마다 아래 콜백함수를 호출
    useEffect(() => {
        console.log(count);
        if ( count === 5 ) {
            setName("김유신");
        } else if ( count === 10 ) {
            setName("강감찬");
        }
    },[count]);

    const onClickButton = () => {
        setCount(count + 1);
    }

    return(
        <div>
            <h3>제 이름은 {name}입니다.</h3>
            <p>count = {count}</p>
            <button type="button" onClick={onClickButton}>버튼을 클릭하세요</button>
        </div>
    )
}