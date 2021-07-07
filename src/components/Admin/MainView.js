import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import { SquarePaper } from '../../style/mui';
import { isCurrentUserAdmin } from '../Common/Functions';
import { REDIRECT_HOME, REDIRECT_LOGIN } from '../../constants/actionTypes';

import SelectView from './Select';
import UserView from './User';


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

    const [show, setShow] = useState("");
    const [showUser, setShowUser] = useState(false);
    const [showClient, setShowClient] = useState(false);

    const handleSetShow = (value) => {
        setShow(value);

        if (value === "User") {
            setShowUser(true);
            setShowClient(false);
        } else if (value === "Client") {
            setShowUser(false);
            setShowClient(true);
        }
    }

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

                    <Grid container spacing={3}>
                        <Grid item xs>
                            {showUser ? <UserView /> : null}
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs>

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