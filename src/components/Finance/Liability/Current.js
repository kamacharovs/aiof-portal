import React, { useState } from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { LIABILITY_DELETE } from '../../../constants/actionTypes';
import { commonStyles, AlternateCircularProgress } from '../../../style/mui';

import { numberWithCommas } from '../Common';
import { compareId } from '../../Common/Functions';
import EditLiabilityView from './Edit';


const mapStateToProps = state => ({
    ...state.finance,
    inProgressLiabilities: state.finance.inProgressLiabilities,
    inProgressDeleteLiability: state.finance.inProgressDeleteLiability,
});

const mapDispatchToProps = dispatch => ({
    onDelete: (id) =>
        dispatch({ type: LIABILITY_DELETE, payload: agent.Liability.delete(id) }),
});

const CurrentLiabilitiesView = props => {
    var liabilities = props.liabilities || [];
    var inPrgoress = props.inProgressLiabilities;
    var inProgressDelete = props.inProgressDeleteLiability;

    const handleOnDelete = (id) => {
        props.onDelete(id);
    }

    return (
        <React.Fragment>
            <InProgressBar
                inPrgoress={inPrgoress || inProgressDelete} />

            {
                liabilities && inPrgoress === false
                    ? liabilities.sort(compareId).map(l => {
                        return (
                            <Grid item xs={6} key={l.publicKey}>
                                <LiabilityTextPaper
                                    liability={l}
                                    onDelete={handleOnDelete} />
                            </Grid>
                        );
                    })
                    : null
            }
        </React.Fragment>
    );
}


export const LiabilityTextPaper = props => {
    const liability = props.liability;

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpen = () => setOpenEdit(true);
    const handleClose = () => setOpenEdit(false);

    if (liability) {
        return (
            <React.Fragment>
                <Paper>
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

                    <Grid container>
                        <MoneyGrid name={"Value"} value={liability.value} isRed={true} />
                    </Grid>
                    <br />
                    <Grid container>
                        <MoneyGrid name={"Monthly payment"} value={liability.monthlyPayment} />
                        <MoneyGrid name={"Monthly payment estimate"} value={liability.monthlyPaymentEstimate} />
                    </Grid>
                    <br />
                    <Grid container>
                        <TextGrid name={"Original term"} value={`${liability.originalTerm} months`} />
                        <TextGrid name={"Remaining term"} value={`${liability.remainingTerm} months`} />
                    </Grid>
                    <br />
                    <Grid container>
                        <TextGrid name={"Interest"} value={`${liability.interest}%`} />
                        {
                            liability.additionalPayments
                                ? <MoneyGrid name={"Additional payments"} value={liability.additionalPayments} />
                                : <TextGrid name={"Additional payments"} value={"None"} />
                        }
                    </Grid>
                    <br />
                    <Grid container>
                        <TextGrid name={"Created"} value={new Date(liability.created).toLocaleDateString()} />
                    </Grid>

                    <hr />

                    <Grid container>
                        <Grid item xs>
                            <Typography variant="text">
                                <Tooltip title="Edit">
                                    <IconButton
                                        aria-label="edit-liability"
                                        onClick={e => handleOpen()} >
                                        <EditIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </Typography>

                            <EditLiabilityView
                                liability={liability}
                                open={openEdit}
                                handleClose={handleClose} />

                            <Typography variant="text">
                                <Tooltip title="Delete">
                                    <IconButton
                                        aria-label="delete-liability"
                                        onClick={e => props.onDelete(liability.id)} >
                                        <DeleteIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export const MoneyGrid = props => {
    return <TextGrid
        name={props.name}
        value={props.value}
        isMoney={true}
        isRed={props.isRed} />
}
export const TextGrid = props => {
    const classes = commonStyles();
    const name = props.name;
    const value = props.value;
    const isMoney = props.isMoney || false;
    const isRed = props.isRed || false;

    return (
        <Grid item xs>
            <Grid container direction="column">
                <Grid item xs>
                    <Typography variant="caption">
                        {name}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="text">
                        <b>
                            {
                                isMoney
                                    ? isRed
                                        ? <div className={classes.red}>
                                            ${numberWithCommas(Math.round(value * 100) / 100)}
                                        </div>
                                        : <div>
                                            ${numberWithCommas(Math.round(value * 100) / 100)}
                                        </div>
                                    : value
                            }
                        </b>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

const InProgressBar = props => {
    if (props.inPrgoress) {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Grid item xs align="center">
                    <br />
                    <AlternateCircularProgress />
                </Grid>
            </Grid>
        );
    }
    else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLiabilitiesView);