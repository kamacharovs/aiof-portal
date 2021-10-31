import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

import { TextFieldGrid, TextFieldGridMoney, TextFieldGridPercent } from '../../Common/Inputs';
import { LIABILITY_TYPES, LIABILITY_ADD } from '../../../constants/actionTypes';
import { isNumber } from '../Common';


const mapStateToProps = state => ({
    ...state.finance,
    inProgressLiabilityTypes: state.finance.inProgressLiabilityTypes,
    inProgressAddLiability: state.finance.inProgressAddLiability,
    liabilityTypes: state.finance.liabilityTypes,
});

const mapDispatchToProps = dispatch => ({
    onTypes: () =>
        dispatch({ type: LIABILITY_TYPES, payload: agent.Liability.types() }),
    onAdd: (payload) =>
        dispatch({ type: LIABILITY_ADD, payload: agent.Liability.add(payload) }),
    onAddVehicle: (payload) =>
        dispatch({ type: LIABILITY_ADD, payload: agent.Liability.addVehicle(payload) }),
    onAddLoan: (payload) =>
        dispatch({ type: LIABILITY_ADD, payload: agent.Liability.addLoan(payload) }),
});

const AddLiabilityView = props => {
    const types = props.liabilityTypes || [];

    const [name, setName] = useState("");
    const [typeNameIndex, setTypeNameIndex] = useState(0);
    const [typeName, setTypeName] = useState("");
    const [value, setValue] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState("");
    const [originalTerm, setOriginalTerm] = useState("");
    const [remainingTerm, setRemainingTerm] = useState("");
    const [interest, setInterest] = useState("");
    const [additionalPayments, setAdditionalPayments] = useState("");

    const [downPayment, setDownPayment] = useState("");
    const [loanType, setLoanType] = useState("");

    const isAddEnabled = name !== ""
        && isNumber(value)
        && isNumber(monthlyPayment)
        && isNumber(originalTerm)
        && isNumber(remainingTerm)
        && isNumber(interest);

    const vehicleTypeName = "vehicle";
    const loanTypeName = "loan";

    const onAdd = (ev) => {
        ev.preventDefault();

        var payload = {
            name: name,
            value: Number(value),
            monthlyPayment: Number(monthlyPayment),
            originalTerm: Number(originalTerm),
            remainingTerm: Number(remainingTerm),
            interest: Number(interest),
            additionalPayments: additionalPayments ? Number(additionalPayments) : null,
        }

        if (typeName === vehicleTypeName) {
            payload.downPayment = Number(downPayment);

            props.onAddVehicle(payload);
        }
        else if (typeName === loanTypeName) {
            payload.loanType = loanType;

            props.onAddLoan(payload);
        }
        else {
            props.onAdd(payload);
        }
    }

    const clearFields = () => {
        setName("");
        setValue("");
        setMonthlyPayment("");
        setOriginalTerm("");
        setRemainingTerm("");
        setInterest("");
        setAdditionalPayments("");
        setDownPayment("");
        setLoanType("");
    }

    const handleType = (event) => {
        clearFields()

        const index = event.target.value;
        const type = types[index];

        setTypeNameIndex(index);
        setTypeName(type.name);

        setOriginalTerm(type.defaultOriginalTerm || "");
        setRemainingTerm(type.defaultRemainingTerm || "");
        setInterest(type.defaultInterest || "");
    }

    useEffect(() => {
        if (!props.liabilityTypes) {
            props.onTypes();
        }
    }, []);

    return (
        <React.Fragment>
            <Paper>
                <form noValidate autoComplete="off" onSubmit={onAdd}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography variant="h1">
                                Add
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <TextFieldGrid
                            id={"name"}
                            label={"Name"}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required={true} />

                        <Grid item xs>
                            <FormControl>
                                <InputLabel id="type-name">Type</InputLabel>
                                <Select
                                    required
                                    labelId="type-name"
                                    id="type-name"
                                    value={typeNameIndex}
                                    onChange={handleType}
                                    required={true} >
                                    {
                                        types.map((t, i) => {
                                            return (
                                                <MenuItem
                                                    key={i}
                                                    value={i}>
                                                    {t.name}
                                                </MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <br />

                    <Grid container spacing={3}>
                        <TextFieldGridMoney
                            id={"value"}
                            label={"Value"}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            required={true} />

                        <TextFieldGridMoney
                            id={"monthly-payment"}
                            label={"Monthly payment"}
                            value={monthlyPayment}
                            onChange={e => setMonthlyPayment(e.target.value)}
                            required={true} />
                    </Grid>

                    <br />

                    <Grid container spacing={3}>
                        <TextFieldGridMoney
                            id={"additional-payments"}
                            label={"Additional payments"}
                            value={additionalPayments}
                            onChange={e => setAdditionalPayments(e.target.value)} />
                    </Grid>

                    <br />

                    <Grid container spacing={3}>
                        <TextFieldGrid
                            id={"original-term"}
                            label={"Original term"}
                            value={originalTerm}
                            onChange={e => setOriginalTerm(e.target.value)}
                            helperText={"This value is in months"}
                            required={true} />

                        <TextFieldGrid
                            id={"remaining-term"}
                            label={"Remaining term"}
                            value={remainingTerm}
                            onChange={e => setRemainingTerm(e.target.value)}
                            helperText={"This value is in months"}
                            required={true} />
                    </Grid>

                    <br />

                    <Grid container spacing={3}>
                        <TextFieldGridPercent
                            id={"interest"}
                            label={"Interest"}
                            value={interest}
                            onChange={e => setInterest(e.target.value)}
                            required={true} />

                        {
                            typeName === vehicleTypeName
                                ? <TextFieldGridMoney
                                    id={"down-payment"}
                                    label={"Down payment"}
                                    value={downPayment}
                                    onChange={e => setDownPayment(e.target.value)}
                                    required={true} />
                                : null
                        }

                        {
                            typeName === loanTypeName
                                ? <TextFieldGrid
                                    id={"loan-type"}
                                    label={"Loan type"}
                                    value={loanType}
                                    onChange={e => setLoanType(e.target.value)}
                                    helperText={"For example, personal"}
                                    required={true} />
                                : null
                        }
                    </Grid>

                    <br />

                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography variant="text">
                                <IconButton
                                    aria-label="add-liability"
                                    type="submit"
                                    disabled={!isAddEnabled} >
                                    <Tooltip title="Add liability">
                                        <AddIcon color="primary" />
                                    </Tooltip>
                                </IconButton>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLiabilityView);