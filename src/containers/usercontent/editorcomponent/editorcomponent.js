import React, { Component } from 'react'

 class EditorComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log(JSON.stringify(this.props));
    }

    componentWillReceiveProps(nextProps){
        console.log(JSON.stringify(nextProps));
    }
    render() {
        return (
        <div>
            abcd
        </div>
        )
    }
}

export default EditorComponent;