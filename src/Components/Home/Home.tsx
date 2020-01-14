import React, { Component, Fragment } from 'react';
import SearchForm from './SearchForm/SearchForm';
import { connect } from 'react-redux';
import { RootReducer } from '../../store/types/main';
import { Dispatch } from 'redux';
import { fetchAllSubjects } from '../../store/actions/Subjects';
import { SubjectWithId } from '../../store/types/Subjects';
import {
    Card,
    CardContent,
    Typography,
    Theme,
    ListItem,
    List
} from '@material-ui/core';
import {
    makeStyles,
    createStyles,
    styled,
    withStyles,
    WithStyles
} from '@material-ui/styles';
import { Link } from 'react-router-dom';
import styles from './Home.module.sass';

interface State {}

interface Props extends WithStyles<typeof materialStyles> {
    fetchAllSubjects: typeof fetchAllSubjects;
    subjects: SubjectWithId[];
}

const materialStyles = createStyles({
    card: {
        width: '100%'
    },
    listItem: {
        padding: 0,
        width: '100%',
        marginTop: '10px'
    },
    list: {
        width: '100%'
    }
});

class Home extends Component<Props, State> {
    componentDidMount() {
        this.props.fetchAllSubjects();
    }
    render() {
        const cardsList = this.props.subjects.map(subject => (
            <ListItem
                button
                key={subject.id}
                component={Link}
                to={`/${subject.name.toLowerCase()}`}
                className={this.props.classes.listItem}
            >
                <Card className={this.props.classes.card}>
                    <CardContent>
                        <Typography variant="h5">{subject.name}</Typography>
                    </CardContent>
                </Card>
            </ListItem>
        ));
        return (
            <Fragment>
                <SearchForm />
                <List className={this.props.classes.list}>{cardsList}</List>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => ({
    subjects: state.subjectsReducer.subjects
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllSubjects: () => dispatch(fetchAllSubjects())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(materialStyles)(Home));
