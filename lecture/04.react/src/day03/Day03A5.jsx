import React from "react";

export default class Day03A5 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {radio: 0}
    }

    onChangeRadio = (type) => {
        console.log(type);
    }

    render() {
        return <div>
            <h3>Radiobox onChange</h3>
            <input type="radio" name="os" onChange={(event) => this.onChangeRadio('win')} />윈도우
            <input type="radio" name="os" onChange={(event) => this.onChangeRadio('mac')} />맥
            <input type="radio" name="os" onChange={(event) => this.onChangeRadio('unix')} />유닉스
        </div>
    }
}