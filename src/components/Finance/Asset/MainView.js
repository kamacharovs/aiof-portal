import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../../agent';

import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { REDIRECT_LOGIN, ASSETS } from '../../../constants/actionTypes';
import { StandardErrorMessage } from '../../../constants/messages';

import AssetOverview from './Overview';
import CurrentAssets from './Current';
import AddAsset from './Add';
import { success, error } from '../../Common/AiofToast';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgressAssets: state.finance.inProgressAssets,
    assets: state.finance.assets,
    assetAdded: state.finance.assetAdded,
    assetAddedCode: state.finance.assetAddedCode,
    assetUpdated: state.finance.assetUpdated,
    assetUpdatedCode: state.finance.assetUpdatedCode,
    assetDeleted: state.finance.assetDeleted,
});

const mapDispatchToProps = dispatch => ({
    onAll: () =>
        dispatch({ type: ASSETS, payload: agent.Asset.all() }),
    onRedirectLogin: () =>
        dispatch({ type: REDIRECT_LOGIN }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

const AssetMainView = props => {
    if (props.currentUser) {
        const classes = useStyles();
        const currentAssetsRef = useRef();
        const addAssetRef = useRef();

        useEffect(() => {
            if (!props.assets) {
                props.onAll();
            }
        }, []);

        useEffect(() => {
            if (props.assets) {
                props.onAll();

                const assetAdded = props.assetAdded;
                const code = props.assetAddedCode;
                if (assetAdded && code === 200) {
                    success(`Successfully added '${assetAdded.typeName}' asset '${assetAdded.name}'`);
                } else if (assetAdded === null && code === 400) {
                    error(StandardErrorMessage);
                }
            }
        }, [props.assetAdded]);

        useEffect(() => {
            if (props.assets) {
                props.onAll();

                const assetUpdated = props.assetUpdated;
                const code = props.assetUpdatedCode;
                if (assetUpdated && code === 200) {
                    success(`Successfully updated '${assetUpdated.typeName}' asset '${assetUpdated.name}'`);
                } else if (assetUpdated === null && code === 400) {
                    error(StandardErrorMessage);
                }
            }
        }, [props.assetUpdated]);

        useEffect(() => {
            if (props.assets && props.assetDeleted === true) {
                props.onAll();
            }
        }, [props.assetDeleted]);

        return (
            <React.Fragment>
                <Helmet>
                    <title>{props.appName} | Finance | Assets</title>
                </Helmet>

                <Container maxWidth="md">
                    <Grid container spacing={1} className={classes.root}>
                        <Grid item xs>
                            <AssetOverview />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} className={classes.root}>
                        <Grid item xs>
                            <div ref={currentAssetsRef}>
                                    <CurrentAssets
                                        assets={props.assets} />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} className={classes.root}>
                        <Grid item xs>
                            <div ref={addAssetRef}>
                                <AddAsset />
                            </div>
                        </Grid>
                    </Grid>

                </Container>
            </React.Fragment>
        );
    } else {
        props.onRedirectLogin();
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetMainView);