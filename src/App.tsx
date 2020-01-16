import React, { Component, Fragment } from 'react';
import styles from './App.module.sass';
import {
    Container,
    AppBar,
    Toolbar,
    List,
    ListItem,
    Typography,
    Link as MaterialLink
} from '@material-ui/core';
import Routes from './Components/Routes/Routes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootReducer } from './store/types/main';
import { Dispatch } from 'redux';
import { logout } from './store/actions/Authentication';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

interface Props extends WithStyles<typeof classes> {
    isLoggedIn: boolean;
    logout: typeof logout;
}

interface State {}

const classes = createStyles({
    version: {
        fontWeight: 'bold',
        letterSpacing: '5px',
        alignSelf: 'flex-end',
        marginLeft: '10px'
    },
    mainText: {
        color: 'white'
    }
});

class App extends Component<Props, State> {
    render() {
        const guardedContent = (
            <AppBar position="static">
                <Toolbar className={styles.Menu}>
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
                </Toolbar>
            </AppBar>
        );

        const unguardedContent = (
            <Toolbar>
                <MaterialLink
                    className={this.props.classes.mainText}
                    underline="none"
                    component={Link}
                    to="/"
                >
                    <Typography variant="h3">wzoryQuiz</Typography>
                </MaterialLink>
                <Typography
                    variant="subtitle2"
                    className={this.props.classes.version}
                >
                    alpha
                </Typography>
            </Toolbar>
        );

        return (
            <Fragment>
                {this.props.isLoggedIn ? guardedContent : unguardedContent}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(classes)(App));
