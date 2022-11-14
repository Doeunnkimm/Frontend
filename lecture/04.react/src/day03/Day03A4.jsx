import React from "react";

export default class Day03A4 extends React.Component {
    constructor(props) {
        super(props);

        this.state = { text: this.props.text, check: true };
    }

    onChangeText = (event) => {
        console.log(event.target.value);
        this.setState({text: event.target.value}); 
        console.log(event.target.value);
    }

    onChangeCheck = (event) => {
        // console.log(event.target.value); => 체크박스는 이 값으로 읽지 않는다.
        console.log(event.target.checked); // 체크박스가 눌려있으면 true, 눌려있지 않으면 false
    }

    render() {
        return <div>
            <div>
                <h3>Textbox onChange</h3>
                {/* input 박스에 값을 쓰게 되면 value에 값을 저장하게 된다. */}
                <input type="text" value={this.state.text} onChange={this.onChangeText}></input>
                <p>입력된 값은 {this.state.text}</p>
            </div>

            <div>
                <h3>Checkbox onChange</h3>
                <input type="checkbox" onChange={this.onChangeCheck} ></input>
            </div>
        </div>
    }
}