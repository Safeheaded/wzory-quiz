import React from 'react';
import {
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
import StackGrid from 'react-stack-grid';
import { useWindowSize } from '../../../../effects/use-window-size';

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
    const { width } = useWindowSize();
    const equationsList = equations.map(equation => {
        const explanations = equation.explanations.map((explanation, index) => (
            <ListItem disableGutters={true} key={index}>
                <Typography>
                    <Latex>{explanation}</Latex>
                </Typography>
            </ListItem>
        ));
        return (
            <Card key={equation.id} className={styles.card}>
                dup
                <CardContent>
                    <Typography
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
        );
    });

    let colWidth = '25%';

    if ((width as number) < 1920) {
        colWidth = '25%';
    }
    if ((width as number) < 1280) {
        colWidth = '33.33%';
    }
    if ((width as number) < 960) {
        colWidth = '50%';
    }
    if ((width as number) < 600) {
        colWidth = '100%';
    }
    return (
        <StackGrid
            style={{ width: '100%', overflow: 'hidden' }}
            columnWidth={colWidth}
        >
            {equationsList}
        </StackGrid>
    );
};

export default EquationsList;
