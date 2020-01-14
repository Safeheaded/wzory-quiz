import React, { Component, Fragment } from 'react';
import styles from './App.module.sass';
import { Container, AppBar, Toolbar, List, ListItem } from '@material-ui/core';
import Routes from './Components/Routes/Routes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootReducer } from './store/types/main';
import { Dispatch } from 'redux';
import { logout } from './store/actions/Authentication';

interface Props {
    isLoggedIn: boolean;
    logout: typeof logout;
}

interface State {}

class App extends Component<Props, State> {
    render() {
        const guardedContent = (
            <List className={styles.AdminMenu}>
                <ListItem button component={Link} to="/admin/subjects">
                    Przedmioty
                </ListItem>
                <ListItem button component={Link} to="/admin/topics">
                    Tematy
                </ListItem>
                <ListItem button component={Link} to="/admin/equations">
                    Równania
                </ListItem>
                <ListItem button onClick={() => this.props.logout()}>
                    Wyloguj
                </ListItem>
            </List>
        );

        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar className={styles.Menu}>
                        {this.props.isLoggedIn ? guardedContent : null}
                    </Toolbar>
                </AppBar>
                <Container className={styles.Container}>
                    <Routes />
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => ({
    isLoggedIn: state.authReducer.isLoggedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
