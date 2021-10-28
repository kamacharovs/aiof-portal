import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { isCurrentUserAdmin } from '../Common/Functions';
import { REDIRECT_HOME, REDIRECT_LOGIN } from '../../constants/actionTypes';

import SelectView from './Select';


const mapStateToProps = state => ({
    appName: state.common.appName,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onRedirectHome: () =>
        dispatch({ type: REDIRECT_HOME }),
    onRedirectLogin: () =>
        dispatch({ type: REDIRECT_LOGIN }),
});

const AdminMainView = props => {
    const currentUser = props.currentUser;
    const isAdmin = isCurrentUserAdmin(currentUser);

    if (currentUser && isAdmin) {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{props.appName} | Admin</title>
                </Helmet>

                <Container maxWidth="md">
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <SelectView
                            />
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    } else if (currentUser && !isAdmin) {
        props.onRedirectHome();
        return null;
    } else {
        props.onRedirectLogin();
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminMainView);