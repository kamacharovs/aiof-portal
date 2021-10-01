import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import Grid from '@material-ui/core/Grid';

import config from '../../config';
import { APIPaper } from '../Common/Papers';
import { AltLoader } from '../../style/mui';
import { DEVELOPER_AUTH_OPENAPI, DEVELOPER_API_OPENAPI, DEVELOPER_ASSET_OPENAPI,
    DEVELOPER_LIABILITY_OPENAPI } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.developer,
    inProgress: state.developer.inProgress,
});

const mapDispatchToProps = dispatch => ({
    onAuthOpenApi: () =>
        dispatch({ type: DEVELOPER_AUTH_OPENAPI, payload: agent.Auth.openapi() }),
    onApiOpenApi: () =>
        dispatch({ type: DEVELOPER_API_OPENAPI, payload: agent.Api.openapi() }),
    onAssetOpenApi: () =>
        dispatch({ type: DEVELOPER_ASSET_OPENAPI, payload: agent.Asset.openapi() }),
    onLiabilityOpenApi: () =>
        dispatch({ type: DEVELOPER_LIABILITY_OPENAPI, payload: agent.Liability.openapi() }),
});

const ApisView = props => {
    const infos = props.infos ? props.infos.sort() : null;
    const inProgress = props.inProgress;

    useEffect(() => {
        props.onAuthOpenApi();
        props.onApiOpenApi();
        props.onAssetOpenApi();
        props.onLiabilityOpenApi();
    }, []);

    if (infos && !inProgress) {
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    {
                        infos.map(i => {
                            const metadata = getMetadata(i.title);

                            return (
                                <Grid
                                    key={i.title}
                                    item
                                    xs={4}>
                                    <APIPaper
                                        title={i.title}
                                        description={i.description}
                                        version={i.version}
                                        contact={i.contact}
                                        license={i.license}
                                        url={metadata.url}
                                        keyPoints={metadata.keyPoints}
                                        page={metadata.page} />
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Grid item xs>
                        <AltLoader
                            inProgress={inProgress}
                            size={"64px"} />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

function getMetadata(api) {
    var metadata = {
        url: "",
        page: "",
        keyPoints: [],
    };

    if (api.includes("auth")) {
        metadata.url = config.authUrl;
        metadata.page = config.authPage;
        metadata.keyPoints = [
            "Used for authentication. As users or clients",
            "Limitted functionality to unauthenticated users or clients",
        ];
    } else if (api.includes("api")) {
        metadata.url = config.apiUrl;
        metadata.page = config.apiPage;
        metadata.keyPoints = [
            "Used for general information. Such as user profile, user dependents, useful documentation, etc.",
            "Requires authentication",
        ];
    } else if (api.includes("asset")) {
        metadata.url = config.assetUrl;
        metadata.page = config.assetPage;
        metadata.keyPoints = [
            "Used for asset CRUD operations",
            "Requires authentication",
        ];
    } else if (api.includes("liability")) {
        metadata.url = config.liabilityUrl;
        metadata.page = config.liabilityPage;
        metadata.keyPoints = [
            "Used for liability CRUD operations",
            "Requires authentication",
        ]
    }

    return metadata;
}

export default connect(mapStateToProps, mapDispatchToProps)(ApisView);