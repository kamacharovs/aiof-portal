import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { HOUSE_MORTGAGE_CALCULATOR } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.house,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.house.inProgress,
});

const mapDispatchToProps = dispatch => ({
    onMortgageCalculator: (payload) =>
        dispatch({ type: HOUSE_MORTGAGE_CALCULATOR, payload: agent.House.mortgage(payload) }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

const MortgageCalculator = props => {
    const classes = useStyles();

    const [loanAmount, setLoanAmount] = useState(300000);

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Mortgage calculator</title>
            </Helmet>

            <Container maxWidth="xl">

            </Container>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MortgageCalculator);