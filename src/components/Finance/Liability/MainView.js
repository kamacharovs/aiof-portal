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
import { elevatedPaperTheme, theme } from '../../../style/mui';

import LiabilityOverview from './Overview';
import CurrentLiabilitiesView from './Current';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgressLiabilities: state.finance.inProgressLiabilities,
    liabilities: state.finance.liabilities,
    liabilityDeleted: state.finance.liabilityDeleted,
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

        useEffect(() => {
            if (props.liabilityDeleted === true) {
                props.onAll();
                error(`Successfully deleted liability`);
            }
        }, [props.liabilityDeleted]);

        var liabilities = props.liabilities || [];
        var inProgress = props.inProgressLiabilities;

        return (
            <React.Fragment>
                <Helmet>
                    <title>{props.appName} | Finance | Liabilities</title>
                </Helmet>

                <ThemeProvider theme={theme}>
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
                                    <CurrentLiabilitiesView
                                        inProgress={inProgress}
                                        liabilities={liabilities} />
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

export default connect(mapStateToProps, mapDispatchToProps)(LiabilityMainView);