import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { SquarePaper } from '../../style/mui';

import { ASSETS } from '../../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onAssets: () =>
        dispatch({ type: ASSETS, payload: agent.Asset.all() }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

const SnapshotView = props => {
    if (props.currentUser) {
        const classes = useStyles();

        useEffect(() => {
            if (!props.finance.assets) {
                props.onAssets();
            }
        }, []);

        return (
            <Container maxWidth="xl">
                <Grid container spacing={1} className={classes.root}>

                    <Grid item xs={12}>
                        <SquarePaper variant="outlined" square>
                            More to come...
            </SquarePaper>
                    </Grid>

                </Grid>
            </Container>
        );
    } else {
        return null;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SnapshotView);