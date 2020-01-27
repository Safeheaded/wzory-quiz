import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    MenuItemProps,
    SelectProps
} from '@material-ui/core';
import { SubjectWithId } from '../../../store/types/Subjects';

interface Props extends SelectProps {
    lastItem?: React.ComponentElement<MenuItemProps, any>;
    values: SubjectWithId[];
    label: string;
}

const FormSelect: React.SFC<Props> = (props: Props) => {
    const { lastItem, values, label, ...defaultProps } = props;

    const items = values.map((subject: SubjectWithId) => (
        <MenuItem key={subject.id} value={subject.id}>
            {subject.name}
        </MenuItem>
    ));

    return (
        <FormControl fullWidth={props.fullWidth} disabled={props.disabled}>
            <InputLabel id={props.labelId}>{label}</InputLabel>
            <Select {...defaultProps}>
                {items}
                {lastItem}
            </Select>
        </FormControl>
    );
};

export default FormSelect;
