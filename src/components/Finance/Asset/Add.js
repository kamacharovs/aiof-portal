import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { SquarePaper, AlternateButton, VerticalTextField, VerticalSelect, SecondaryDarkh3 } from '../../../style/mui';
import { ASSET_TYPES, ASSET_ADD } from '../../../constants/actionTypes';
import { isNumber } from '../Common';


const mapStateToProps = state => ({
    ...state.finance,
    inProgressAssetTypes: state.finance.inProgressAssetTypes,
    inProgressAddAsset: state.finance.inProgressAddAsset,
    assetTypes: state.finance.assetTypes,
});

const mapDispatchToProps = dispatch => ({
    onTypes: () =>
        dispatch({ type: ASSET_TYPES, payload: agent.Asset.types() }),
    onAdd: (payload) =>
        dispatch({ type: ASSET_ADD, payload: agent.Asset.add(payload) }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    select: {
        minWidth: 'flex',
    }
}));

const AddAsset = props => {
    const classes = useStyles();
    const types = props.assetTypes || [];

    const [name, setName] = useState("");
    const [typeName, setTypeName] = useState("");
    const [value, setValue] = useState("");

    const isAddEnabled = name !== ""
        && typeName !== ""
        && isNumber(value);
    const inProgressAddAsset = props.inProgressAddAsset;

    const handleSetGeneric = (e, setGeneric) => {
        setGeneric(e.target.value);
    }

    const onAdd = (ev) => {
        ev.preventDefault();

        let payload = {
            name: name,
            typeName: typeName,
            value: Number(value) || 0
        }

        props.onAdd(payload);
    }

    useEffect(() => {
        if (!props.assetTypes) {
            props.onTypes();
        }
    }, []);

    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square>
                <SecondaryDarkh3>Add</SecondaryDarkh3>

                <form noValidate autoComplete="off" onSubmit={onAdd}>
                    <Grid container spacing={3}>
                        <Grid item sm>
                            <VerticalTextField
                                header={"What is the name of your asset?"}
                                required
                                textField={
                                    <TextField
                                        required
                                        placeholder="Cash"
                                        value={name}
                                        onChange={e => handleSetGeneric(e, setName)}
                                    />
                                } />
                        </Grid>

                        <Grid item sm>
                            <FormControl className={classes.select}>
                                <VerticalSelect
                                    header={"What is the type of your asset?"}
                                    required
                                    select={
                                        <Select
                                            required
                                            value={typeName}
                                            onChange={e => setTypeName(e.target.value)}
                                        >
                                            {
                                                types.map(t => {
                                                    return (
                                                        <MenuItem key={t.publicKey} value={t.name}>{t.name}</MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item sm>
                            <VerticalTextField
                                header={"What is the value of your asset?"}
                                textField={
                                    <TextField
                                        value={value}
                                        onChange={e => handleSetGeneric(e, setValue)}
                                        placeholder={"25000"}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                    />
                                } />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                            <Grid item sm>
                                <AlternateButton type="submit" variant="contained" disabled={!isAddEnabled && !inProgressAddAsset} >
                                    Add
                                </AlternateButton>
                            </Grid>
                        </Grid>
                </form>
            </SquarePaper>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAsset);