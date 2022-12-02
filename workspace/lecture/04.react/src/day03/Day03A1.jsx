import React from "react";

export default class Day03A1 extends React.Component {
    // constructor는 컴포넌트가 최초 만들어질 때 딱 한 번 호출됨
    // constructor를 만든 이유는 this.state를 초기화 하기 위해
    constructor(props) {
        // 부모를 호출해달라는 의미
        super(props); // 반드시 작성해주어야 함
        console.log("construcor() ---------------------->");
        console.log(props);

        this.state = { count: Number(props.start) };
    }

    // 컴포넌트가 생성되고 render가 호출되고 난 후에 호출된다
    // HTML(DOM)이 만들어지고 나서 호출된다.
    componentDidMount() {
        console.log("componentDidMount()------------------>");

        // setInterval(function, time) 함수는 두번째 파라미터 시간 마다(ms)
        // 매번 주기적으로 첫번째 함수를 호출하는 타이머 함수이다.
        setInterval(() => {
            // 화면을 닫을 때까지 1초마다 한번씩 여기를 자동으로 호출해준다.
            console.log("timer----------------->");
            // setState는 state의 상태 변화
            this.setState({ count:  this.state.count + 1})
        }, 1000);
    }


    render() {
        return <div>카운트: {this.state.count}</div>
    }
}