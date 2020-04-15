import React, { Fragment } from 'react';
import externalStyles from './App.module.sass';
import {
    Container,
    AppBar,
    Toolbar,
    List,
    ListItem,
    Typography,
    Link as MaterialLink,
    makeStyles,
    createStyles
} from '@material-ui/core';
import Routes from './Components/Routes/Routes';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/actions/Authentication';
import { RootReducer } from './store/types/main';

type Props = {};

const useStyles = makeStyles(
    createStyles({
        version: {
            fontWeight: 'bold',
            letterSpacing: '5px',
            alignSelf: 'flex-end',
            marginLeft: '10px'
        },
        mainText: {
            color: 'white',
            fontSize: '49px'
        }
    })
);

const App = (props: Props) => {
    const isLoggedIn = useSelector<RootReducer, boolean>(
        state => state.authReducer.isLoggedIn
    );
    const dispatch = useDispatch();
    const styles = useStyles();

    const guardedContent = (
        <AppBar position="static">
            <Toolbar className={externalStyles.Menu}>
                <List className={externalStyles.AdminMenu}>
                    <ListItem button component={Link} to="/admin/subjects">
                        Przedmioty
                    </ListItem>
                    <ListItem button component={Link} to="/admin/topics">
                        Tematy
                    </ListItem>
                    <ListItem button component={Link} to="/admin/equations">
                        Równania
                    </ListItem>
                    <ListItem button onClick={() => dispatch(logout())}>
                        Wyloguj
                    </ListItem>
                </List>
            </Toolbar>
        </AppBar>
    );

    const unguardedContent = (
        <Toolbar>
            <MaterialLink underline="none" component={Link} to="/">
                <Typography className={styles.mainText} variant="h1">
                    wzoryQuiz
                </Typography>
            </MaterialLink>
            <Typography variant="subtitle2" className={styles.version}>
                alpha
            </Typography>
        </Toolbar>
    );

    return (
        <Fragment>
            {isLoggedIn ? guardedContent : unguardedContent}
            <Container className={externalStyles.Container}>
                <Routes />
            </Container>
        </Fragment>
    );
};

export default App;
