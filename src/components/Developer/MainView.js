import React from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ApisView from './Apis';




const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const DeveloperMainView = props => {
    return (
        <React.Fragment>
            <Container maxWidth="md">
                <Grid container>
                    <ApisView />
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperMainView);