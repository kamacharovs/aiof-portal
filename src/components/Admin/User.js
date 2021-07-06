import React, { useState } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { TextFieldBase } from '../Common/Inputs';
import { CodePaper } from '../Common/Papers';
import { SquarePaper, BorderlessSquarePaper, TextMain, AltLoader } from "../../style/mui";
import { ADMIN_CLEAR, ADMIN_USER, ADMIN_USER_REFRESH_TOKENS } from "../../constants/actionTypes";


const mapStateToProps = state => ({
    ...state.admin,
    user: state.admin.user,
    refreshTokens: state.admin.refreshTokens,
});

const mapDispatchToProps = dispatch => ({
    onClear: () =>
        dispatch({ type: ADMIN_CLEAR }),
    onUser: (id) =>
        dispatch({ type: ADMIN_USER, payload: agent.Admin.user(id) }),
    onUserRefreshTokens: (id) =>
        dispatch({ type: ADMIN_USER_REFRESH_TOKENS, payload: agent.Admin.userRefreshTokens(id) }),
});

const UserView = props => {
    const [userId, setUserId] = useState("");

    const userButtonEnabled = userId ? true : false;

    const onClear = ev => {
        ev.preventDefault();

        setUserId("");
        props.onClear();
    }

    const onUser = ev => {
        ev.preventDefault();

        props.onUser(userId);
    }

    const onUserRefreshTokens = ev => {
        ev.preventDefault();

        props.onUserRefreshTokens(userId);
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
                            Get user information by their id
                        </Typography>
                    </Grid>

                    <Grid item xs>
                        <TextMain>
                            This is used to get user information, such as their first name, last name, email, role, refresh tokens, etc.
                            An example of what is returned can be found in the reference page on the left
                        </TextMain>
                    </Grid>
                </Grid>

                <BorderlessSquarePaper variant="outlined" square>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextFieldBase
                                id="user-id"
                                label="User id"
                                value={userId}
                                onChange={e => setUserId(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs>
                            <Grid container spacing={1} direction="column">
                                <Grid item xs>
                                    <form
                                        noValidate
                                        autoComplete="off"
                                        onSubmit={onClear}>
                                        <Button
                                            id="clear-button"
                                            type="submit"
                                            color="primary">
                                            Clear
                                        </Button>
                                    </form>
                                </Grid>

                                <Grid item xs>
                                    <form
                                        noValidate
                                        autoComplete="off"
                                        onSubmit={onUser}>
                                        <Button
                                            id="user-button"
                                            disabled={!userButtonEnabled}
                                            type="submit"
                                            color="primary">
                                            Get user
                                        </Button>
                                    </form>
                                </Grid>

                                <Grid item xs>
                                    <form
                                        noValidate
                                        autoComplete="off"
                                        onSubmit={onUserRefreshTokens}>
                                        <Button
                                            id="user-refresh-tokens-button"
                                            disabled={!userButtonEnabled}
                                            type="submit"
                                            color="primary">
                                            Get user's refresh tokens
                                        </Button>
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </BorderlessSquarePaper>

                <BorderlessSquarePaper variant="outlined" square>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography variant="h6">
                                Results
                            </Typography>
                            <TextMain>
                                Your results will appear below once you fill out the information above and click
                                on the desired results you would like to see
                            </TextMain>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography variant="h6">
                                User's information
                            </Typography>
                            {
                                props.inProgressUser === false
                                    ? <CodePaper
                                        data={props.user} />
                                    : <AltLoader
                                        inProgress={props.inProgressUser}
                                        size={"32px"} />
                            }
                        </Grid>

                        <Grid item xs>
                            <Typography variant="h6">
                                User's refresh tokens
                            </Typography>
                            {
                                props.inProgressUserRefreshTokens === false
                                    ? <CodePaper
                                        data={props.refreshTokens} />
                                    : <AltLoader
                                        inProgress={props.inProgressUserRefreshTokens}
                                        size={"32px"} />
                            }
                        </Grid>
                    </Grid>
                </BorderlessSquarePaper>
            </SquarePaper>
        </React.Fragment >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserView);