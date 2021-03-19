import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { SquarePaper } from '../../style/mui';
import { REDIRECT_LOGIN, PROFILE_GET_USER_PROFILE, PROFILE_UPSERT_USER_PROFILE, PROFILE_GET_OPTIONS, USER_DEPENDENTS } from '../../constants/actionTypes';
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
});

const ProfileMainView = props => {
    if (props.currentUser) {

        useEffect(() => {
            props.onProfile();
            props.onProfileOptions();
            props.onDependents();
        }, []);

        return (
            <React.Fragment>
                <Helmet>
                    <title>{props.appName} | Profile</title>
                </Helmet>

                <Container maxWidth="xl">
                    <SquarePaper variant="outlined" square>

                    </SquarePaper>

                    <Dependents
                        dependents={props.dependents}
                        inProgressDependents={props.inProgressDependents} />
                </Container>
            </React.Fragment>
        );
    } else {
        props.onRedirectLogin();
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMainView);