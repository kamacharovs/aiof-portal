import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { APIPaper } from '../Common/Papers';


const mapStateToProps = state => ({
    ...state.developer,
});

const mapDispatchToProps = dispatch => ({
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

const ApisView = props => {
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