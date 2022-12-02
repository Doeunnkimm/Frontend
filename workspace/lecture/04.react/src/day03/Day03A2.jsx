import React from "react";

export default class Day03A1 extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = { count: 0 }
    }
    
    onButtonClick = () => {
        console.log(this.state);
        // const { count } = this.state;
        const count = this.state.count;
        // const { max } = this.props;
        const max = Number(this.props.max);

        // props의 max까지만 카운팅 하고 싶다
        if(count >= max) {
            // 10을 넘어가면 0으로 초기화 해준다.
            this.setState({count: 0})
        } else {
            this.setState({count: count+1})
        }
    }

    render() {
        return <div>
            <h3>카운트: {this.state.count}</h3>
            <button type="button" onClick={this.onButtonClick}>클릭하세요</button>
        </div>
    }
}