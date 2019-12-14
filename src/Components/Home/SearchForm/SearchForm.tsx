import React, { FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

interface Props extends RouteComponentProps {}

const SearchForm: React.SFC<Props> = (props: Props) => {
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const text = data.get('search-text');
        if (text === 'Jowisz jest gruby') {
            props.history.push('/admin');
        }
    };

    return (
        <form onSubmit={e => submitHandler(e)}>
            <TextField name="search-text" variant="outlined" label="Wyszukaj" />
            <Button type="submit">
                <SearchIcon />
            </Button>
        </form>
    );
};

export default withRouter(SearchForm);
