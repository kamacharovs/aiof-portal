import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { DefaultAlternateColor } from '../../../style/mui';
import { REDIRECT_LOGIN, ASSETS } from '../../../constants/actionTypes';

import AssetOverview from './Overview';
import CurrentAssets from './Current';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgressAssets: state.finance.inProgressAssets,
    assets: state.finance.assets,
    assetAdded: state.finance.assetAdded,
    assetAddedCode: state.finance.assetAddedCode,
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

        useEffect(() => {
            if (!props.assets) {
                props.onAll();
            }
        }, []);

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

                <Container maxWidth="xl">
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

                </Container>
            </React.Fragment>
        );
    } else {
        props.onRedirectLogin();
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetMainView);