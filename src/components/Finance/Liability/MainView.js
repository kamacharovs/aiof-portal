import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../../agent';

import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { AddEditDeleteTimeline } from '../../Common/Timelines';
import { success, error } from '../../Common/AiofToast';
import { LIABILITIES, REDIRECT_LOGIN } from '../../../constants/actionTypes';
import { theme } from '../../../style/mui';

import LiabilityOverview from './Overview';
import CurrentLiabilitiesView from './Current';
import AddLiabilityView from './Add';
import LiabilityStatisticsView from './Statistics';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgressLiabilities: state.finance.inProgressLiabilities,
    liabilities: state.finance.liabilities,
    liabilityAdded: state.finance.liabilityAdded,
    liabilityAddedCode: state.finance.liabilityAddedCode,
    liabilityDeleted: state.finance.liabilityDeleted,
});

const mapDispatchToProps = dispatch => ({
    onAll: () =>
        dispatch({ type: LIABILITIES, payload: agent.Liability.all() }),
    onRedirectLogin: () =>
        dispatch({ type: REDIRECT_LOGIN }),
});

const LiabilityMainView = props => {
    const [showAdd, setShowAdd] = useState(false);

    if (props.currentUser) {

        useEffect(() => {
            if (!props.liabilities) {
                props.onAll();
            }
        }, []);

        useEffect(() => {
            if (props.liabilityAdded) {
                props.onAll();
                success(`Successfully added liability`);
                setShowAdd(false);
            }
        }, [props.liabilityAdded]);

        useEffect(() => {
            if (props.liabilityDeleted === true) {
                props.onAll();
                error(`Deleted liability`);
                setShowAdd(false);
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
                                <Grid container>
                                    <Grid item xs>
                                        <LiabilityStatisticsView
                                            inProgress={inProgress}
                                            liabilities={liabilities}
                                            showAdd={showAdd}
                                            setShowAdd={setShowAdd} />
                                    </Grid>
                                </Grid>

                                <Grid container>
                                    <Grid item xs>
                                        {
                                            showAdd
                                            ? <AddLiabilityView />
                                            : null
                                        }
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1}>
                                    <CurrentLiabilitiesView
                                        inProgress={inProgress}
                                        liabilities={liabilities} />
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