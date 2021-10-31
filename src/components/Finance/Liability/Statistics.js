import React from 'react';
import { connect } from 'react-redux';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

import { TextGrid, MoneyGrid } from '../../Common/Papers';


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const LiabilityStatisticsView = props => {
    var liabilities = props.liabilities;
    var inProgress = props.inProgress;

    if (liabilities && !inProgress) {
        var totalValue = liabilities.map(l => l.value)
            .reduce((sum, current) => sum + current, 0);
        var totalMonthlyPayments = liabilities.map(l => l.monthlyPayment)
            .reduce((sum, current) => sum + current, 0);
        var totalmonthlyPaymentEstimates = liabilities.map(l => l.monthlyPaymentEstimate)
            .reduce((sum, current) => sum + current, 0);
        var totalAdditionalPayments = liabilities.map(l => l.additionalPayments)
            .reduce((sum, current) => sum + current, 0) || 0;

        return (
            <React.Fragment>
                <Paper>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Typography variant="h1">
                                Statistics
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <MoneyGrid name={"Total"} value={totalValue} isRed={true} />
                        <MoneyGrid name={"Total monthly payments"} value={totalMonthlyPayments} isRed={true} />
                    </Grid>
                    <br />
                    <Grid container spacing={1}>
                        <TextGrid name={"Total number of liabilities"} value={liabilities.length} />
                        <MoneyGrid name={"Total monthly payment estimates"} value={totalmonthlyPaymentEstimates} />
                    </Grid>
                    <br />
                    <Grid container spacing={1}>
                        <MoneyGrid name={"Total additional payments"} value={totalAdditionalPayments} />
                    </Grid>

                    <hr />

                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Typography variant="text">
                                <IconButton
                                    aria-label="show-add"
                                    onClick={e => props.setShowAdd(!props.showAdd)} >
                                    <Tooltip title="Would you like to add a liability?">
                                        <AddIcon color="primary" />
                                    </Tooltip>
                                </IconButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(LiabilityStatisticsView);