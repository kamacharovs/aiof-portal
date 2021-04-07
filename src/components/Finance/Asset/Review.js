import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import { numberWithCommas } from '../Common';
import { SquarePaper } from '../../../style/mui';
import { HrFlat } from '../../../style/common';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    dialog: {
        padding: '1 rem'
    },
    dialogSquarePaper: {
        margin: '1 rem'
    }
}));

const ReviewAsset = props => {
    const asset = props.asset;

    if (asset) {
        const open = props.open || false;
        const snapshots = asset.snapshots;

        return (
            <ReviewAssetDialog
                open={open}
                handleClose={props.handleClose}
                asset={asset}
                snapshots={snapshots} />
        );
    } else {
        return null;
    }
}

const ReviewAssetDialog = props => {
    const classes = useStyles();

    const { handleClose, open, asset, snapshots } = props;

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"md"}
                aria-labelledby="review-asset-dialog"
                className={classes.dialog}>
                <DialogTitle>Review <strong>{asset.name}</strong></DialogTitle>
                {snapshots.length > 0 ?
                    snapshots.map(s => {
                        return (
                            <SquarePaper
                                key={s.publicKey}
                                variant="outlined"
                                square
                                className={classes.dialogSquarePaper}>
                                <Grid container spacing={0}>
                                    <Grid item xs>
                                        <b>Created on</b><br />
                                        <HrFlat />
                                    </Grid>
                                    <Grid item xs>
                                        <i>{new Date(s.created).toLocaleDateString()}</i><br />
                                        <HrFlat />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={0}>
                                    <Grid item xs>
                                        <b>Name</b><br />
                                        <HrFlat />
                                    </Grid>
                                    <Grid item xs>
                                        {s.name === null ? "No change" : s.name}<br />
                                        <HrFlat />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={0}>
                                    <Grid item xs>
                                        <b>Type</b><br />
                                        <HrFlat />
                                    </Grid>
                                    <Grid item xs>
                                        {s.typeName === null ? "No change" : s.typeName}<br />
                                        <HrFlat />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={0}>
                                    <Grid item xs>
                                        <b>Value</b><br />
                                        <HrFlat />
                                    </Grid>
                                    <Grid item xs>
                                        {s.value === null ? "No change" : "$" + numberWithCommas((s.value || 0).toFixed(2))}<br />
                                        <HrFlat />
                                    </Grid>
                                </Grid>
                            </SquarePaper>
                        );
                    })
                    : <SquarePaper
                        variant="outlined"
                        square
                        className={classes.dialogSquarePaper}>
                        There is no current history for this asset
                    </SquarePaper>}
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ReviewAsset;