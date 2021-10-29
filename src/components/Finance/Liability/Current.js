import React from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import Grid from '@mui/material/Grid';

import { LiabilityTextPaper } from '../../Common/Papers';
import { LIABILITY_DELETE } from '../../../constants/actionTypes';
import { AlternateCircularProgress } from '../../../style/mui';


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
                    ? liabilities.map(l => {
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

const InProgressBar = props => {
    if (props.inPrgoress) {
        return (
            <Grid container spacing={0} direction="column" justifyContent="center" alignItems="center">
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