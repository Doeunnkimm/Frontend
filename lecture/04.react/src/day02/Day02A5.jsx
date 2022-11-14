import React from "react";

export default class Day02A5 extends React.Component {
    constructor(props) {
        super(props)  // 무조건 호출해줘야 함
        console.log("constructor() ============================>");
        this.state = { count: 0 };
    }

    componentDidMount() {
        console.log("componentDidMount() ============================>");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount() ============================>");
    }

    render() {
        console.log("render() ============================>");
        return <ul>
            <li>props.title = {this.props.title}</li>
            <li>props.name = {this.props.name}</li>
            <li>props.value = {this.props.value}</li>
            <li>props.count = {this.state.count}</li>
        </ul>
    }
}