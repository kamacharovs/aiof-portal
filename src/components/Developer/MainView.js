import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import OverviewView from './Overview';
import ApisView from './Apis';


const mapStateToProps = state => ({
    appName: state.common.appName,
});

const DeveloperMainView = props => {
    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Developer</title>
            </Helmet>

            <Container maxWidth="md">
                <Grid container spacing={3}>
                    <Grid item xs>
                        <OverviewView />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs>
                        <ApisView />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, null)(DeveloperMainView);