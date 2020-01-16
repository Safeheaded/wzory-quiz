import React from 'react';
import { ItemOfList } from '../../../types/General';
import {
    ListItem,
    Card,
    CardContent,
    Typography,
    List
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/styles';

interface Props {
    items: ItemOfList[];
}

const useStyles = makeStyles(() =>
    createStyles({
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
    })
);

const ListDisplay: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    const cardsList = props.items.map((item: ItemOfList) => {
        const url = (item.explanation || item.name) as string;
        return (
            <ListItem
                key={item.id}
                component={Link}
                to={`/${url.toLowerCase()}`}
                className={styles.listItem}
            >
                <Card className={styles.card}>
                    <CardContent>
                        <Typography variant="h5">{item.name}</Typography>
                    </CardContent>
                </Card>
            </ListItem>
        );
    });
    return <List className={styles.list}>{cardsList}</List>;
};

export default ListDisplay;
