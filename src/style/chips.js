import React from 'react';

import { useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


export const CompletedChip = () => {
    const theme = useTheme();

    return (
        <BaseChip
            label={"Completed"}
            color={theme.palette.success.main} />
    );
}

export const IncompleteChip = () => {
    const theme = useTheme();

    return (
        <BaseChip
            label={"Incomplete"}
            color={theme.palette.error.main} />
    );
}

const BaseChip = props => {
    return (
      <Chip
        size="small"
        label={props.label}
        color="primary"
        style={{ backgroundColor: props.color }} />
    );
  }