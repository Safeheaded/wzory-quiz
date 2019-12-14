import React, { Component } from 'react';

class Test extends Component {
    constructor(props: any) {
        super(props);
        console.log('Test instantiaded');
    }

    render() {
        return <p>Test</p>;
    }
}

export default Test;
