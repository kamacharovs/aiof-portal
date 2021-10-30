import React from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';


export const TextFieldBase = props => {
    const id = props.id;
    const label = props.label;
    const error = props.error || false;
    const value = props.value;
    const onChange = props.onChange;
    const required = props.required || false;
    const helperText = props.helperText;

    return (
        <TextField
            id={id}
            label={label}
            error={error}
            value={value}
            onChange={onChange}
            required={required}
            helperText={helperText} />
    );
}

export const TextFieldInputAdornment = props => {
    return <TextFieldBaseInputAdornment
        id={props.id}
        label={props.label}
        error={props.error}
        value={props.value}
        onChange={props.onChange}
        helperText={props.helperText}
        adornmentValue={props.adornmentValue} />
}

export const TextFieldGrid = props => {
    return (
        <Grid item xs>
            <TextFieldBase
                id={props.id}
                label={props.label}
                error={props.error}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                helperText={props.helperText}>
            </TextFieldBase>
        </Grid>
    )
}
export const TextFieldGridMoney = props => {
    return (
        <Grid item xs>
            <TextFieldMoneyInputAdornment
                id={props.id}
                label={props.label}
                error={props.error}
                value={props.value}
                onChange={props.onChange}
                helperText={props.helperText} />
        </Grid>
    );
}
export const TextFieldGridPercent = props => {
    return (
        <Grid item xs>
            <TextFieldPercInputAdornment
                id={props.id}
                label={props.label}
                error={props.error}
                value={props.value}
                onChange={props.onChange}
                helperText={props.helperText} />
        </Grid>
    );
}

export const TextFieldMoneyInputAdornment = props => {
    return <TextFieldBaseInputAdornment
        id={props.id}
        label={props.label}
        error={props.error}
        value={props.value}
        onChange={props.onChange}
        helperText={props.helperText}
        adornmentValue={"$"} />
}

export const TextFieldPercInputAdornment = props => {
    return <TextFieldBaseInputAdornment
        id={props.id}
        label={props.label}
        error={props.error}
        value={props.value}
        onChange={props.onChange}
        helperText={props.helperText}
        adornmentValue={"%"} />
}

const TextFieldBaseInputAdornment = props => {
    const id = props.id;
    const label = props.label;
    const error = props.error || false;
    const value = props.value;
    const onChange = props.onChange;
    const helperText = props.helperText;
    const adornmentPosition = props.adornmentPosition || "start";
    const adornmentValue = props.adornmentValue || "";

    return (
        <TextField
            id={id}
            label={label}
            error={error}
            value={value}
            onChange={onChange}
            helperText={helperText}
            InputProps={{
                startAdornment: <InputAdornment position={adornmentPosition}>{adornmentValue}</InputAdornment>
            }} />
    );
}
