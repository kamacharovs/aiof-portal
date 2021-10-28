import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../../agent';

import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { AddEditDeleteTimeline } from '../../Common/Timelines';
import { success, error } from '../../Common/AiofToast';
import { REDIRECT_LOGIN } from '../../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onRedirectLogin: () =>
        dispatch({ type: REDIRECT_LOGIN }),
});

const LiabilityMainView = props => {
    if (props.currentUser) {
        return (
            <React.Fragment>
                <AddEditDeleteTimeline
                    entity={"liability"} />
            </React.Fragment>
        );
    }
    else {
        props.onRedirectLogin();
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiabilityMainView);