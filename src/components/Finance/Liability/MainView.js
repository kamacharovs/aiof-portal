import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../../agent';

import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { AddEditDeleteTimeline } from '../../Common/Timelines';
import { LiabilityTextPaper } from '../../Common/Papers';
import { success, error } from '../../Common/AiofToast';
import { LIABILITIES, REDIRECT_LOGIN } from '../../../constants/actionTypes';
import { elevatedPaperTheme, AlternateCircularProgress } from '../../../style/mui';

import LiabilityOverview from './Overview';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgressLiabilities: state.finance.inProgressLiabilities,
    liabilities: state.finance.liabilities,
});

const mapDispatchToProps = dispatch => ({
    onAll: () =>
        dispatch({ type: LIABILITIES, payload: agent.Liability.all() }),
    onRedirectLogin: () =>
        dispatch({ type: REDIRECT_LOGIN }),
});

const LiabilityMainView = props => {
    if (props.currentUser) {

        useEffect(() => {
            if (!props.liabilities) {
                props.onAll();
            }
        }, []);

        var liabilities = props.liabilities || [];
        var inPrgoress = props.inProgressLiabilities;

        return (
            <React.Fragment>
                <Helmet>
                    <title>{props.appName} | Finance | Liabilities</title>
                </Helmet>

                <ThemeProvider theme={elevatedPaperTheme}>
                    <Container maxWidth="xl">
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Grid container>
                                    <Grid item xs>
                                        <LiabilityOverview />
                                    </Grid>
                                </Grid>

                                <Grid container>
                                    <Grid item xs>
                                        <AddEditDeleteTimeline
                                            entity={"liability"} />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={8}>
                                <Grid container spacing={1}>

                                <InProgressBar
                                    inPrgoress={inPrgoress} />

                                    {
                                        liabilities && inPrgoress === false
                                        ? liabilities.map(l => {
                                            return (
                                                <Grid item xs={6} key={l.publicKey}>
                                                    <LiabilityTextPaper liability={l} />
                                                </Grid>
                                            );
                                         })
                                        : null
                                    }
                                </Grid>

                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <Paper>
                                            Stats
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </ThemeProvider>
            </React.Fragment>
        );
    }
    else {
        props.onRedirectLogin();
        return null;
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(LiabilityMainView);