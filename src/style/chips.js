import React from 'react';

import { useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


export const CompletedChip = props => {
    const theme = useTheme();

    return (
        <BaseChip
            inProgress={props.inProgress}
            label={"Completed"}
            color={theme.palette.success.main} />
    );
}

export const IncompleteChip = props => {
    const theme = useTheme();

    return (
        <BaseChip
            inProgress={props.inProgress}
            label={"Incomplete"}
            color={theme.palette.error.main} />
    );
}

const BaseChip = props => {
    const theme = useTheme();
    const size = props.size ? props.size : "small";
    const inProgress = props.inProgress ? props.inProgress : false;

    return (
        inProgress
            ? <Chip
                size={size}
                label="Loading..."
                color="primary"
                style={{ backgroundColor: theme.palette.primary.main }} />
            : <Chip
                size={size}
                label={props.label}
                color="primary"
                style={{ backgroundColor: props.color }} />
    );
}