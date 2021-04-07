import React, { useState } from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { SquarePaper, AlternateButton, VerticalTextField, VerticalSelect, DefaultAlternateColor } from '../../../style/mui';
import { ASSET_TYPES, ASSET_UPDATE } from '../../../constants/actionTypes';
import { numberWithCommas } from '../Common';
import { HrFlat } from '../../../style/common';


const mapStateToProps = state => ({
    ...state.finance,
    inProgressAssets: state.finance.inProgressAssets,
    inProgressUpdateAsset: state.finance.inProgressUpdateAsset,
    assetTypes: state.finance.assetTypes,
});

const mapDispatchToProps = dispatch => ({
    onUpdate: (id, payload) =>
        dispatch({ type: ASSET_UPDATE, payload: agent.Asset.update(id, payload) }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    dialog: {
        padding: '1 rem'
    },
    dialogSquarePaper: {
        margin: '1 rem'
    }
}));

const EditAsset = props => {
    const asset = props.asset;

    if (asset) {
        const classes = useStyles();
        const types = props.assetTypes;
        const inProgressUpdateAsset = props.inProgressUpdateAsset;

        const id = asset.id;
        const currentName = asset.name;
        const currentTypeName = asset.typeName;
        const currentValue = asset.value;

        const [newName, setNewName] = useState("");
        const [newTypeName, setNewTypeName] = useState("");
        const [newValue, setNewValue] = useState("");

        const isUpdateEnabled = (newName !== ""
            && newName !== currentName)
            || (newTypeName !== ""
            && newTypeName !== currentTypeName)
            || (newValue !== ""
            && newValue !== currentValue);

        const handleSetGeneric = (e, setGeneric) => {
            setGeneric(e.target.value);
        }

        const onUpdate = (ev) => {
            ev.preventDefault();
    
            let payload = {
                name: newName,
                typeName: newTypeName,
                value: Number(newValue) || 0
            }
    
            props.onUpdate(id, payload);
        }

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <div style={{ color: DefaultAlternateColor }}>
                        <h3><strong>Edit</strong></h3>
                    </div>

                    <form noValidate autoComplete="off" onSubmit={onUpdate}>
                        <Grid container spacing={3}>
                            <Grid item sm>
                                <VerticalTextField
                                    header={"What is the name of your asset?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            value={newName}
                                            placeholder={currentName}
                                            onChange={e => handleSetGeneric(e, setNewName)}
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
                                                value={newTypeName}
                                                placeholder={currentTypeName}
                                                onChange={e => setNewTypeName(e.target.value)}
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
                                            value={newValue}
                                            onChange={e => handleSetGeneric(e, setNewValue)}
                                            placeholder={currentValue}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <AlternateButton type="submit" variant="contained" disabled={!isUpdateEnabled && !inProgressUpdateAsset} >
                                    Update
                                </AlternateButton>
                            </Grid>
                        </Grid>
                    </form>
                </SquarePaper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAsset);