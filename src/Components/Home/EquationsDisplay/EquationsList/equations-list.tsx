import React from 'react';
import {
    Grid,
    Typography,
    Divider,
    Card,
    makeStyles,
    createStyles,
    CardContent,
    List,
    ListItem,
    ListSubheader
} from '@material-ui/core';
import { ExtendedEquationWithId } from '../../../../store/types/Equations';
import Latex from 'react-latex';

type Props = { equations: ExtendedEquationWithId[] };

const useStyles = makeStyles(() =>
    createStyles({
        card: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            boxShadow: 'none'
        },
        equation: {
            marginTop: 15
        },
        equationName: {
            fontSize: '2rem'
        },
        listSubheader: {
            fontSize: '.9rem'
        }
    })
);

const EquationsList = (props: Props) => {
    const styles = useStyles();
    const { equations } = props;
    const equationsList = equations.map(equation => {
        const explanations = equation.explanations.map((explanation, index) => (
            <ListItem disableGutters={true} key={index}>
                <Typography>
                    <Latex>{explanation}</Latex>
                </Typography>
            </ListItem>
        ));
        return (
            <Grid
                zeroMinWidth
                key={equation.id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
            >
                <Card className={styles.card}>
                    <CardContent>
                        <Typography
                            noWrap
                            variant="h5"
                            component="h1"
                            gutterBottom
                            className={styles.equationName}
                        >
                            {equation.name}
                        </Typography>
                        <Divider />
                        <Typography
                            className={styles.equation}
                            variant="h5"
                            gutterBottom
                        >
                            <Latex>{`$${equation.equation}$`}</Latex>
                        </Typography>
                        <List disablePadding={true}>
                            {explanations.length !== 0 ? (
                                <ListSubheader
                                    className={styles.listSubheader}
                                    disableGutters={true}
                                >
                                    Objaśnienia:
                                </ListSubheader>
                            ) : null}
                            {explanations}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        );
    });

    return (
        <Grid spacing={3} container>
            {equationsList}
        </Grid>
    );
};

export default EquationsList;
