import React, { useState } from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { TextFieldGrid, TextFieldGridMoney, TextFieldGridPercent } from '../../Common/Inputs';
import { LIABILITY_UPDATE } from '../../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
});

const mapDispatchToProps = dispatch => ({
    onUpdate: (id, payload) =>
        dispatch({ type: LIABILITY_UPDATE, payload: agent.Liability.update(id, payload) }),
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 8000,
    bgcolor: '#fff',
    boxShadow: 24,
    p: 4,
};

const EditLiabilityView = props => {
    const liability = props.liability;
    const open = props.open;
    const handleClose = props.handleClose;

    if (liability) {
        const [name, setName] = useState(liability.name);
        const [value, setValue] = useState(liability.value);
        const [monthlyPayment, setMonthlyPayment] = useState(liability.monthlyPayment);
        const [originalTerm, setOriginalTerm] = useState(liability.originalTerm);
        const [remainingTerm, setRemainingTerm] = useState(liability.remainingTerm);
        const [interest, setInterest] = useState(liability.interest);
        const [additionalPayments, setAdditionalPayments] = useState(liability.additionalPayments || "");

        const isNameUpdated = name != liability.name;
        const isValueUpdated = value != liability.value
        const isMonthlyPaymentUpdated = monthlyPayment != liability.monthlyPayment;
        const isOriginalTermUpdated = originalTerm != liability.originalTerm;
        const isRemainingTermUpdated = remainingTerm != liability.remainingTerm;
        const isInterestUpdated = interest != liability.interest;
        const isAdditionalPaymentsUpdated = additionalPayments != liability.additionalPayments && additionalPayments !== "";

        const isUpdateEnabled = isNameUpdated
            || isValueUpdated
            || isMonthlyPaymentUpdated
            || isOriginalTermUpdated
            || isRemainingTermUpdated
            || isInterestUpdated
            || isAdditionalPaymentsUpdated;

        const onUpdate = (ev) => {
            ev.preventDefault();

            var payload = {
                name: isNameUpdated ? name : null,
                value: isValueUpdated ? Number(value) : null,
                monthlyPayment: isMonthlyPaymentUpdated ? Number(monthlyPayment) : null,
                originalTerm: isOriginalTermUpdated ? Number(originalTerm) : null,
                remainingTerm: isRemainingTermUpdated ? Number(remainingTerm) : null,
                interest: isInterestUpdated ? Number(interest) : null,
                additionalPayments: isAdditionalPaymentsUpdated ? Number(additionalPayments) : null,
            }

            props.onUpdate(liability.id, payload);
            props.handleClose();
        }


        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-liability"
                aria-describedby="edit-liability">
                <Box sx={style}>
                    <form noValidate autoComplete="off" onSubmit={onUpdate}>
                        <Grid container>
                            <Grid item xs>
                                <Typography variant="h1">
                                    {liability.name.toUpperCase()}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs>
                                <Typography variant="text">
                                    <i>{liability.typeName.toUpperCase()}</i>
                                </Typography>
                            </Grid>
                        </Grid>

                        <hr />

                        <Grid container spacing={3}>
                            <TextFieldGrid
                                id={"name"}
                                label={"Name"}
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        </Grid>
                        <br />

                        <Grid container spacing={3}>
                            <TextFieldGridMoney
                                id={"value"}
                                label={"Value"}
                                value={value}
                                onChange={e => setValue(e.target.value)} />

                            <TextFieldGridMoney
                                id={"monthly-payment"}
                                label={"Monthly payment"}
                                value={monthlyPayment}
                                onChange={e => setMonthlyPayment(e.target.value)} />
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
                                helperText={"This value is in months"} />

                            <TextFieldGrid
                                id={"remaining-term"}
                                label={"Remaining term"}
                                value={remainingTerm}
                                onChange={e => setRemainingTerm(e.target.value)}
                                helperText={"This value is in months"} />
                        </Grid>
                        <br />

                        <Grid container spacing={3}>
                            <TextFieldGridPercent
                                id={"interest"}
                                label={"Interest"}
                                value={interest}
                                onChange={e => setInterest(e.target.value)} />
                        </Grid>
                        <br />

                        <hr />

                        <Button
                            id="update-button"
                            type="submit"
                            variant="text"
                            disabled={!isUpdateEnabled} >
                            Update
                        </Button>

                    </form>
                </Box>
            </Modal >
        );
    } else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLiabilityView);