// 함수형 컴포넌트에서 state를 사용하려면 useState를 import 해야한다.
import { useState } from "react";

export default function Day05A2(props) {
    
    const name = "홍길동";

    const [ count, setCount ] = useState(0);

    const onClickButton = () => {
        setCount(count + 1);
    }

    return(
        <div>
            <h3>제 이름은 {name}</h3>
            <p>count = {count}</p>
            {/* this.onclick 함수 대신 onClick 함수를 사용한다. */}
            <button type="button" onClick={onClickButton}>버튼을 클릭하세요</button>
        </div>
    )
}