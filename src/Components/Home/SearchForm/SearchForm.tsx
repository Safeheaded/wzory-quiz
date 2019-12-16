import React, { FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TextField, Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styles from './SearchForm.module.sass';

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
        <form onSubmit={e => submitHandler(e)} className={styles.Form}>
            <TextField name="search-text" variant="outlined" label="Wyszukaj" />
            <IconButton type="submit" aria-label="search">
                <SearchIcon />
            </IconButton>
        </form>
    );
};

export default withRouter(SearchForm);
