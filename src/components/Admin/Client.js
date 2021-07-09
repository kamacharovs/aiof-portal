import React, { useState } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { TextFieldBase } from '../Common/Inputs';
import { CodePaper } from '../Common/Papers';
import { SquarePaper, BorderlessSquarePaper, TextMain, AltLoader } from "../../style/mui";
import { ADMIN_CLIENT_BY_ID, ADMIN_CLIENT_ENABLE, ADMIN_CLIENT_DISABLE } from "../../constants/actionTypes";

import { clientApiById, clientEnable, clientDisable } from './Common';


const mapStateToProps = state => ({
    ...state.admin,
    client: state.admin.client,
});

const mapDispatchToProps = dispatch => ({
    onClientById: (id) =>
        dispatch({ type: ADMIN_CLIENT_BY_ID, payload: agent.Admin.client(id) }),
    onClientEnable: (id) =>
        dispatch({ type: ADMIN_CLIENT_ENABLE, payload: agent.Admin.clientEnable(id) }),
    onClientDisable: (id) =>
        dispatch({ type: ADMIN_CLIENT_DISABLE, payload: agent.Admin.clientDisable(id) }),
});

const ClientView = props => {
    const api = props.api;

    const [clientId, setClientId] = useState("");

    const onClient = ev => {
        ev.preventDefault();

        if (clientId) { props.onClientById(clientId); }
    }

    const onClientEnable = ev => {
        ev.preventDefault();
        props.onClientEnable(clientId);
    }
    const onClientDisable = ev => {
        ev.preventDefault();
        props.onClientDisable(clientId);
    }

    return (
        <React.Fragment>
            {
                api === clientApiById
                    ? <ByIdView
                        client={props.client}
                        clientId={clientId}
                        setClientId={setClientId}
                        onClient={onClient}
                        inProgress={props.inProgressClientById} />
                    : null
            }
            {
                [clientEnable, clientDisable].includes(api)
                    ? <EnableDisableView
                        client={props.client}
                        clientId={clientId}
                        setClientId={setClientId}
                        onClientEnable={onClientEnable}
                        onClientDisable={onClientDisable}
                        inProgress={props.inProgress} />
                    : null
            }
        </React.Fragment>
    );
}

const ByIdView = props => {
    const clientId = props.clientId;
    const isButtonEnabled = props.clientId ? false : true;

    return (
        <SquarePaper variant="outlined" square>
            <Grid container direction="column">
                <Grid item xs>
                    <Typography variant="h6">
                        Get client information by id
                    </Typography>
                </Grid>

                <Grid item xs>
                    <TextMain>
                        Get a client's information such as id, public key, slug, primary and secondary API keys and more.
                        This is accomplished by passing in the id of the client
                    </TextMain>
                </Grid>
            </Grid>

            <BorderlessSquarePaper variant="outlined" square>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Grid
                            container
                            spacing={2}
                            direction="column">
                            <Grid item xs>
                                <TextFieldBase
                                    id="client-id"
                                    label="Client id"
                                    value={clientId}
                                    onChange={e => props.setClientId(e.target.value)} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs>
                        <form
                            noValidate
                            autoComplete="off"
                            onSubmit={props.onClient}>
                            <Button
                                id="get-client-by-id-button"
                                type="submit"
                                variant="outlined"
                                color="primary"
                                disabled={isButtonEnabled}>
                                Get client
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </BorderlessSquarePaper>

            <ResultsView
                subTitle="Client's information"
                inProgress={props.inProgress}
                data={props.client} />
        </SquarePaper>
    );
}

const EnableDisableView = props => {
    const clientId = props.clientId;
    const isButtonEnabled = props.clientId ? false : true;

    return (
        <SquarePaper variant="outlined" square>
            <Grid container direction="column">
                <Grid item xs>
                    <Typography variant="h6">
                        Enable or disable a client
                    </Typography>
                </Grid>

                <Grid item xs>
                    <TextMain>
                        Enable or disable a client. If they're disabled, then they won't be able to authenticate anymore
                        and their credentials will become invalid
                    </TextMain>
                </Grid>
            </Grid>

            <BorderlessSquarePaper variant="outlined" square>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Grid
                            container
                            spacing={2}
                            direction="column">
                            <Grid item xs>
                                <TextFieldBase
                                    id="client-id"
                                    label="Client id"
                                    value={clientId}
                                    onChange={e => props.setClientId(e.target.value)} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs>
                        <Grid container spacing={1} direction="column">
                            <Grid item xs>
                                <form
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={props.onClientEnable}>
                                    <Button
                                        id="enable-button"
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        disabled={isButtonEnabled}>
                                        Enable client
                                    </Button>
                                </form>
                            </Grid>

                            <Grid item xs>
                                <form
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={props.onClientDisable}>
                                    <Button
                                        id="disable-button"
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        disabled={isButtonEnabled}>
                                        Disable client
                                    </Button>
                                </form>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </BorderlessSquarePaper>

            <ResultsView
                subTitle="Client's information"
                inProgress={props.inProgress}
                data={props.client} />
        </SquarePaper>
    );
}

const ResultsView = props => {
    const subTitle = props.subTitle;
    const inProgress = props.inProgress;
    const data = props.data;

    return (
        <BorderlessSquarePaper variant="outlined" square>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Typography variant="h6">
                        Results
                    </Typography>
                    <TextMain>
                        Your results will appear below once you fill out the information above and click on the desired results you would like to see
                    </TextMain>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <Typography variant="h6">
                        {subTitle}
                    </Typography>
                    {
                        inProgress === false
                            ? <CodePaper
                                data={data} />
                            : <AltLoader
                                inProgress={inProgress}
                                size={"32px"} />
                    }
                </Grid>
            </Grid>
        </BorderlessSquarePaper>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientView);