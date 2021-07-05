import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { APIPaper } from '../Common/Papers';
import { DEVELOPER_AUTH_OPENAPI, DEVELOPER_ASSET_OPENAPI } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.developer,
    inProgress: state.developer.inProgress,
});

const mapDispatchToProps = dispatch => ({
    onAuthOpenApi: () =>
        dispatch({ type: DEVELOPER_AUTH_OPENAPI, payload: agent.Auth.openapi() }),
    onAssetOpenApi: () =>
        dispatch({ type: DEVELOPER_ASSET_OPENAPI, payload: agent.Asset.openapi() })
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

const ApisView = props => {

    useEffect(() => {
        props.onAuthOpenApi();
        props.onAssetOpenApi();
    }, []);

    return (
        <React.Fragment>
            <Container maxWidth="md">
            <Grid container spacing={3}>
                <Grid item xs>
                    
        <APIPaper
            title="aiof-auth"
            description="description"
            version="v1.0"
            license="MIT"
            >

        </APIPaper>
                </Grid>

                <Grid item xs>
                    
        <APIPaper
            title="aiof-asset"
            description="description"
            version="v1.0"
            license="MIT"
            >

        </APIPaper>
                </Grid>
            </Grid>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ApisView);