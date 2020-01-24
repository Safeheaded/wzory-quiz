import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    MenuItemProps
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { onChangeType } from '../../../types/admin';
import { SubjectWithId } from '../../../store/types/Subjects';

interface Props {
    name: string;
    defaultValue?: string;
    lastItem?: React.ComponentElement<MenuItemProps, any>;
    id: string;
    label: string;
    onValueChange: Function;
    disabled?: boolean;
    values: SubjectWithId[];
    value: string;
}

const FormSelect: React.SFC<Props> = (props: Props) => {
    const LastItem = props.lastItem ? props.lastItem : null;
    const labelId = `${props.id}-label`;

    const items = props.values.map((subject: SubjectWithId) => (
        <MenuItem key={subject.id} value={subject.id}>
            {subject.name}
        </MenuItem>
    ));

    return (
        <FormControl fullWidth disabled={props.disabled}>
            <InputLabel id={labelId}>{props.label}</InputLabel>
            <Select
                value={props.value}
                onChange={(e: onChangeType) => props.onValueChange(e)}
                name={props.name}
                labelId={labelId}
                id={props.id}
            >
                {items}
                {LastItem}
            </Select>
        </FormControl>
    );
};

export default FormSelect;
