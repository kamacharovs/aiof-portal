import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { SquarePaper } from '../../style/mui';
import {
    REDIRECT_LOGIN, PROFILE_GET_USER_PROFILE, PROFILE_UPSERT_USER_PROFILE, PROFILE_GET_OPTIONS,
    USER_DEPENDENTS, USER_DEPENDENT_DELETE
} from '../../constants/actionTypes';
import Dependents from './Dependents';


const mapStateToProps = state => ({
    ...state.profile,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.profile.inProgress,
    profile: state.profile.profile,
    options: state.profile.options,
    inProgressDependents: state.profile.inProgressDependents,
    dependents: state.profile.dependents,
    inProgressDependentDelete: state.profile.inProgressDependentDelete,
    dependentDeleted: state.profile.dependentDeleted,
});

const mapDispatchToProps = dispatch => ({
    onRedirectLogin: () =>
        dispatch({ type: REDIRECT_LOGIN }),
    onProfile: () =>
        dispatch({ type: PROFILE_GET_USER_PROFILE, payload: agent.User.profile() }),
    onProfileOptions: () =>
        dispatch({ type: PROFILE_GET_OPTIONS, payload: agent.UserProfile.options() }),
    onProfileUpsert: (payload) =>
        dispatch({ type: PROFILE_UPSERT_USER_PROFILE, payload: agent.User.profileUpsert(payload) }),
    onDependents: () =>
        dispatch({ type: USER_DEPENDENTS, payload: agent.User.dependents() }),
    onDependentDelete: (id) =>
        dispatch({ type: USER_DEPENDENT_DELETE, payload: agent.User.dependentDelete(id) }),
});

const ProfileMainView = props => {
    if (props.currentUser) {
        const [tab, setTab] = useState(0);

        const handleTabChange = (e, newTab) => {
            setTab(newTab);
        };

        useEffect(() => {
            props.onProfile();
            props.onProfileOptions();
            props.onDependents();
        }, []);

        useEffect(() => {
            if (props.dependents && props.dependentDeleted === true) {
                props.onDependents();
            }
        }, [props.dependentDeleted]);

        const handleOnDelete = (id) => {
            props.onDependentDelete(id);
        }

        return (
            <React.Fragment>
                <Helmet>
                    <title>{props.appName} | Profile</title>
                </Helmet>

                <Container maxWidth="xl">
                    <SquarePaper variant="outlined" square>
                    <Grid container spacing={3}>
                        <Grid item sm={2}>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={tab}
                                onChange={handleTabChange}
                                aria-label="Vertical tabs example"
                                //className={classes.tabs}
                            >
                                <Tab label="Profile" />
                                <Tab label="Dependents" />
                            </Tabs>
                        </Grid>
                        <Grid item sm>
                            {tab === 1 && (
                                <Dependents
                                    dependents={props.dependents}
                                    handleOnDelete={handleOnDelete}
                                    inProgressDependents={props.inProgressDependents}
                                    inProgressDependentDelete={props.inProgressDependentDelete} />
                            )}
                        </Grid>
                    </Grid>
                    </SquarePaper>

                    <Dependents
                        dependents={props.dependents}
                        handleOnDelete={handleOnDelete}
                        inProgressDependents={props.inProgressDependents}
                        inProgressDependentDelete={props.inProgressDependentDelete} />
                </Container>
            </React.Fragment>
        );
    } else {
        props.onRedirectLogin();
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMainView);