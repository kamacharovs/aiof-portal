import React, { useState } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { TextFieldBase } from '../Common/Inputs';
import { SquarePaper, BorderlessSquarePaper, TextMain } from "../../style/mui";
import { ADMIN_USER, ADMIN_USER_REFRESH_TOKENS } from "../../constants/actionTypes";


const mapStateToProps = state => ({
    ...state.admin,
    user: state.admin.user,
});

const mapDispatchToProps = dispatch => ({
    onUser: (id) =>
        dispatch({ type: ADMIN_USER, payload: agent.Admin.user(id) }),
    onUserRefreshTokens: (id) =>
        dispatch({ type: ADMIN_USER_REFRESH_TOKENS, payload: agent.Admin.userRefreshTokens(id) }),
});

const UserView = props => {
    const [userId, setUserId] = useState("");

    const userButtonEnabled = userId ? true : false;

    const onUser = ev => {
        ev.preventDefault();

        props.onUser(userId);
    }

    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square>
                <Grid container direction="column">
                    <Grid item xs>
                        <Typography variant="h1">
                            User
                        </Typography>
                    </Grid>

                    <Grid item xs>
                        <TextMain>
                            Manage users
                        </TextMain>
                    </Grid>
                </Grid>
            </SquarePaper>

            <SquarePaper variant="outlined" square>
                <Grid container direction="column">
                    <Grid item xs>
                        <Typography variant="h6">
                            Find user by their id
                        </Typography>
                    </Grid>

                    <Grid item xs>
                        <TextMain>
                            This is used to get user information, such as their first name, last name, email, role, refresh tokens, etc.
                            An example of what is returned can be found in the reference page on the left
                        </TextMain>
                    </Grid>

                    <Grid item xs>
                        <TextMain>
                            Example <br/>
                        </TextMain>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                <BorderlessSquarePaper variant="outlined" square>
                        <form
                            noValidate
                            autoComplete="off"
                            onSubmit={onUser}>
                            <Grid item xs>
                                <TextFieldBase
                                    id="user-id"
                                    label="User id"
                                    value={userId}
                                    onChange={e => setUserId(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs>
                                <Button
                                    id="user-button"
                                    disabled={!userButtonEnabled}
                                    type="submit"
                                    variant="contained"
                                    color="primary" >
                                    Get
                                </Button>
                            </Grid>

                            <Grid item xs>
                                {
                                    props.inProgressUser === false
                                    ? <React.Fragment>
                                        {JSON.stringify(props.user, null, 2)}
                                    </React.Fragment>
                                    : null
                                }
                            </Grid>
                        </form>
                    </BorderlessSquarePaper>
                </Grid>
            </SquarePaper>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserView);