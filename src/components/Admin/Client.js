import React, { useState } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { TextFieldBase } from '../Common/Inputs';
import { CodePaper } from '../Common/Papers';
import { SquarePaper, BorderlessSquarePaper, TextMain, AltLoader } from "../../style/mui";
import { ADMIN_CLIENT_BY_ID } from "../../constants/actionTypes";

import { clientApiById } from './Common';


const mapStateToProps = state => ({
    ...state.admin,
    client: state.admin.client,
});

const mapDispatchToProps = dispatch => ({
    onClientById: (id) =>
        dispatch({ type: ADMIN_CLIENT_BY_ID, payload: agent.Admin.client(id) }),
});

const ClientView = props => {
    const api = props.api;

    const [clientId, setClientId] = useState("");

    const onClient = ev => {
        ev.preventDefault();

        if (clientId) { props.onClientById(clientId); }
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
        </React.Fragment>
    );
}

const ByIdView = props => {
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
                                    value={props.clientId}
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
                                color="primary">
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