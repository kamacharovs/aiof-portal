import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


const mapStateToProps = state => ({
    ...state.profile,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.profile.inProgress,
    profile: state.profile.profile,
    options: state.profile.options,
});

const mapDispatchToProps = dispatch => ({
    //onProfile: () =>
    //    dispatch({ type: PROFILE_GET_USER_PROFILE, payload: agent.User.profile() }),
    //onProfileOptions: () =>
    //    dispatch({ type: PROFILE_GET_OPTIONS, payload: agent.UserProfile.options() }),
    //onProfileUpsert: (payload) =>
    //    dispatch({ type: PROFILE_UPSERT_USER_PROFILE, payload: agent.User.profileUpsert(payload) }),
});

const ProfileMainView = props => {
    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Profile</title>
            </Helmet>

            <Container maxWidth="xl">

            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMainView);