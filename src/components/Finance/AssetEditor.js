import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { ASSET_ADD, ASSET_TYPES } from '../../constants/actionTypes';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    assetTypes: state.finance.assetTypes,
});

const mapDispatchToProps = dispatch => ({
    onAddAsset: asset =>
        dispatch({ type: ASSET_ADD, payload: agent.Asset.add(asset) }),
    onGetAssetTypes: () =>
        dispatch({ type: ASSET_TYPES, payload: agent.Asset.types() }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingBottom: '1rem',
    },
    margin: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 182,
    }
}));


const AddAsset = (props) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [typeName, setTypeName] = useState('');
    const [value, setValue] = useState('');
    const assetTypes = props.assetTypes || [];

    const isReadyToAdd = name && typeName && value ? value > 0 : false;

    const handleTypeNameChange = (event) => {
        setTypeName(event.target.value);
    };

    const submitAddAsset = ev => {
        ev.preventDefault();

        let addAssetPayload = {
            name: name,
            typeName: typeName,
            value: Number(value),
            userId: props.currentUser.id
        };

        props.onAddAsset(addAssetPayload)
        props.onAdd(true);
    }

    useEffect(() => {
        if (!props.assetTypes) {
            props.onGetAssetTypes();
        }
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Asset</title>
            </Helmet>

            <Container maxWidth="xl" className={classes.container}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={submitAddAsset}>
                    <Grid
                        container
                        spacing={1}
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                            <Grid item xs>
                                <p>
                                    A financial asset is a liquid asset that gets its value from a contractual right or ownership claim. Cash, stocks, bonds, mutual funds, and bank deposits are all are examples of financial assets
                                </p>
                            </Grid>

                            <Grid item xs>
                                <div className={classes.margin}>
                                    <TextField label="Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)} />
                                </div>
                            </Grid>

                            <Grid item xs>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="type-name-label">Type</InputLabel>
                                    <Select
                                        labelId="type-name-label"
                                        id="type-name-select"
                                        value={typeName}
                                        onChange={handleTypeNameChange}
                                    >
                                        {
                                            assetTypes.map(assetType => {
                                                return (
                                                    <MenuItem key={assetType.name} value={assetType.name}>{assetType.name}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs>
                                <div className={classes.margin}>
                                    <TextField label="Value"
                                        value={value}
                                        onChange={e => setValue(e.target.value)} />
                                </div>
                            </Grid>

                            <Grid item xs>
                                <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={!isReadyToAdd} >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAsset);