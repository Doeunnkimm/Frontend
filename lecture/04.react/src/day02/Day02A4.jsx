import React from "react";

export default class Day02A4 extends React.Component {

    render() {
        // 지금 this.props에는 title, name, age가 들어가 있음
        console.log(this.props);
        // 외부에서 입력한 것을 this.props를 통해 접근할 수가 있다
        return <h1>{this.props.title}이름은 {this.props.name}입니다.</h1>
    }
}