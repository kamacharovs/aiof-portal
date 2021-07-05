import React from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import OverviewView from './Overview';
import ApisView from './Apis';


const DeveloperMainView = props => {
    return (
        <React.Fragment>
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

export default DeveloperMainView;