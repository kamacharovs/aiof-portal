import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { LIABILITY_ADD, LIABILITY_TYPES } from '../../constants/actionTypes';

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
    liabilityTypes: state.finance.liabilityTypes,
});

const mapDispatchToProps = dispatch => ({
    onAddLiability: liability =>
        dispatch({ type: LIABILITY_ADD, payload: agent.Liability.add(liability) }),
    onGetLiabilityTypes: () =>
        dispatch({ type: LIABILITY_TYPES, payload: agent.Liability.types() }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));


const AddLiability = (props) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [typeName, setTypeName] = useState('');
    const [value, setValue] = useState('');
    const liabilityTypes = props.liabilityTypes || [];

    const handleTypeNameChange = (event) => {
        setTypeName(event.target.value);
    };

    const submitAddLiability = ev => {
        ev.preventDefault();

        let addLiabilityPayload = {
            name: name,
            typeName: typeName,
            value: Number(value),
            userId: props.currentUser.id
        };

        agent.Liability.add(addLiabilityPayload)

        props.onAdd(true);
    }

    useEffect(() => {
        if (!props.liabilityTypes) {
            props.onGetLiabilityTypes();
        }
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Liability</title>
            </Helmet>

            <Container maxWidth="xl">
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={submitAddLiability}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <p>
                                    A liability is something a person or company owes, usually a sum of money. Liabilities are settled over time through the transfer of economic benefits including money, goods, or services
                                </p>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="type-name-label">Type</InputLabel>
                                    <Select
                                        labelId="type-name-label"
                                        id="type-name-select"
                                        value={typeName}
                                        onChange={handleTypeNameChange}
                                    >
                                        {
                                            liabilityTypes.map(liabilityType => {
                                                return (
                                                    <MenuItem key={liabilityType.name} value={liabilityType.name}>{liabilityType.name}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Value"
                                        value={value}
                                        onChange={e => setValue(e.target.value)} />
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" className={classes.button} >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLiability);