import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { LIABILITY_ADD, LIABILITY_TYPES } from '../../constants/actionTypes';

import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
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


const AddLiability = (props) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [typeName, setTypeName] = useState('');
    const [value, setValue] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [years, setYears] = useState('');
    const liabilityTypes = props.liabilityTypes || [];

    const isReadyToAdd = name && typeName && value ? value > 0 : false;

    const handleTypeNameChange = (event) => {
        setTypeName(event.target.value);
    };

    const submitAddLiability = ev => {
        ev.preventDefault();

        let addLiabilityPayload = {
            name: name,
            typeName: typeName,
            value: Number(value),
            monthlyPayment: Number(monthlyPayment) || null,
            years: Number(years) || null
        };

        props.onAddLiability(addLiabilityPayload)
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

            <Container maxWidth="xl" className={classes.container}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={submitAddLiability}>
                    <Grid
                        container
                        spacing={1}
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs>
                            <p>
                                A liability is something a person or company owes, usually a sum of money. Liabilities are settled over time through the transfer of economic benefits including money, goods, or services
                            </p>
                        </Grid>

                        <Grid item xs>
                            <div className={classes.margin}>
                                <TextField 
                                    required
                                    label="Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)} />
                            </div>
                        </Grid>

                        <Grid item xs>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="type-name-label">Type</InputLabel>
                                <Select
                                    required
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

                        <Grid item xs>
                            <div className={classes.margin}>
                                <TextField 
                                    required
                                    label="Value"
                                    value={value}
                                    onChange={e => setValue(e.target.value)} />
                            </div>
                        </Grid>

                        <Grid item xs>
                            <div className={classes.margin}>
                                <TextField 
                                    label="(O) Monthly payment"
                                    value={monthlyPayment}
                                    onChange={e => setMonthlyPayment(e.target.value)} />
                            </div>
                        </Grid>

                        <Grid item xs>
                            <div className={classes.margin}>
                                <TextField 
                                    label="(O) Years"
                                    value={years}
                                    onChange={e => setYears(e.target.value)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddLiability);