import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { SquarePaper, DefaultGreenColor } from '../../../style/mui';
import { numberWithCommas } from '../Common';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    green: {
        color: DefaultGreenColor,
        margin: '0rem',
        padding: '0rem'
    },
    dialog: {
        padding: '1 rem'
    },
    table: {
        borderRadius: 0
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
                <SquarePaper
                    variant="outlined"
                    square
                    className={classes.paper}>
                    <Grid container spacing={0}>
                        <Grid item xs>
                            <h4><strong>Snapshots</strong></h4>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid item xs>
                            <TableContainer className={classes.table}>
                                <Table aria-label="snapshots table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Created on</strong></TableCell>
                                            <TableCell align="right"><strong>Name</strong></TableCell>
                                            <TableCell align="right"><strong>Type</strong></TableCell>
                                            <TableCell align="right"><strong>Value</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {snapshots.map(s => (
                                            <TableRow key={s.publicKey}>
                                                <TableCell component="th" scope="row">
                                                    {new Date(s.created).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell align="right">{s.name === null ? "No change" : s.name}</TableCell>
                                                <TableCell align="right">{s.typeName === null ? "No change" : s.typeName}</TableCell>
                                                <TableCell align="right">{s.value === null ? "No change" : <div className={classes.green}>${numberWithCommas((s.value || 0).toFixed(2))}</div>}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </SquarePaper>
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