import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


export const TextFieldInputAdornment = props => {
    const label = props.label;
    const value = props.value;
    const onChange = props.onChange;

    return <TextFieldBaseInputAdornment
                label={label}
                value={value}
                onChange={onChange} />
}

export const TextFieldMoneyInputAdornment = props => {
    const label = props.label;
    const value = props.value;
    const onChange = props.onChange;

    return <TextFieldBaseInputAdornment
                label={label}
                value={value}
                onChange={onChange}
                adornmentValue={"$"} />
}

export const TextFieldPercInputAdornment = props => {
    const label = props.label;
    const value = props.value;
    const onChange = props.onChange;

    return <TextFieldBaseInputAdornment
                label={label}
                value={value}
                onChange={onChange}
                adornmentValue={"%"} />
}

const TextFieldBaseInputAdornment = props => {
    const label = props.label;
    const value = props.value;
    const onChange = props.onChange;
    const adornmentPosition = props.adornmentPosition || "start";
    const adornmentValue = props.adornmentValue || "";

    return (
        <TextField label={label}
            value={value}
            onChange={onChange}
            InputProps={{
                startAdornment: <InputAdornment position={adornmentPosition}>{adornmentValue}</InputAdornment>
            }} />
    );
}