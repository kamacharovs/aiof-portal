import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { AssetPaper, LiabilityPaper } from '../Common/Papers';
import { SquarePaper, ColorAlt, ColorAlt2, ColorAlt5 } from '../../style/mui';
import { H1Alt6 } from '../../style/common';
import { ASSETS } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgressAssets: state.inProgressAssets,
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
            if (!props.finance) {
                props.onAssets();
            }
        }, []);

        const assets = props.assets ? props.assets : [];
        const assetsSum = assets.map(a => a.value)
            .reduce((sum, current) => sum + current, 0);
            
        const liabilities = props.liabilities ? props.liabilities : [];
        const liabilitiesSum = liabilities.map(a => a.value)
            .reduce((sum, current) => sum + current, 0);

        return (
            <Container maxWidth="md">
                <Grid container spacing={1} className={classes.root}>
                    <Grid item xs>
                        <SquarePaper variant="outlined" square>
                            <Grid item xs>
                                <H1Alt6>Overview</H1Alt6>
                            </Grid>

                            <Grid item xs>
                                <AssetPaper
                                    inProgress={props.inProgressAssets}
                                    title={"Assets"}
                                    totalAssetValue={assetsSum} />
                            </Grid>
                            <Grid item xs>
                                <LiabilityPaper
                                    inProgress={true}
                                    title={"Liabilities"}
                                    totalLiabilityValue={liabilitiesSum} />
                            </Grid>
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