import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, List as MaterialList, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { ItemOfList } from '../../../types/General';

type Props = {
    items: ItemOfList[];
    url: string;
    actionPath: string;
};

const UniversalList = (props: Props) => {
    const listItems = props.items.map(item => (
        <ListItem
            component={Link}
            button
            to={`${props.url}/${item.id}`}
            key={item.id}
        >
            {item.explanation ? item.explanation : item.name}
        </ListItem>
    ));

    return (
        <Fragment>
            <MaterialList>{listItems}</MaterialList>
            <Link to={`${props.url}${props.actionPath}`}>
                <Fab>
                    <AddIcon />
                </Fab>
            </Link>
        </Fragment>
    );
};

export default UniversalList;
