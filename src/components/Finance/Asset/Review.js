import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';


import { SquarePaper } from '../../../style/mui';


const mapStateToProps = state => ({
    ...state.finance,
});

const mapDispatchToProps = dispatch => ({
});

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
                                        {new Date(s.created).toLocaleDateString()}
                                    </Grid>
                                </Grid>
                            </SquarePaper>
                        );
                    })
                    : "There is no current history for this asset"}
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAsset);