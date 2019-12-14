import React, { Component, Fragment, FormEvent } from 'react';
import SearchForm from './SearchForm/SearchForm';

interface State {}

interface Props {}

class Home extends Component<Props, State> {
    render() {
        return (
            <Fragment>
                <SearchForm />
            </Fragment>
        );
    }
}

export default Home;
