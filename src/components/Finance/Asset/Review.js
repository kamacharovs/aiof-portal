import React from 'react';

import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { SquarePaper } from '../../../style/mui';
import { numberWithCommas } from '../Common';

import EditAsset from './Edit';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    green: {
        color: theme.palette.success.main,
        margin: '0rem',
        padding: '0rem'
    },
    red: {
        color: theme.palette.error.main,
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
    const noChangeText = "No change";

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
                                            <TableCell align="right"><strong>Value change</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {snapshots.map(s => (
                                            <TableRow key={s.publicKey}>
                                                <TableCell component="th" scope="row">
                                                    {new Date(s.created).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell align="right">{s.name === null ? noChangeText : s.name}</TableCell>
                                                <TableCell align="right">{s.typeName === null ? noChangeText : s.typeName}</TableCell>
                                                <TableCell align="right">{s.value === null ? noChangeText : <div className={classes.green}>${numberWithCommas((s.value || 0).toFixed(2))}</div>}</TableCell>
                                                <TableCell align="right">{s.valueChange === null || s.valueChange === 0 ? noChangeText 
                                                : s.valueChange >= 0
                                                    ? <div className={classes.green}>${numberWithCommas((s.valueChange || 0).toFixed(2))}</div>
                                                    : <div className={classes.red}>${numberWithCommas((s.valueChange || 0).toFixed(2))}</div>
                                                }
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid item xs>
                            <br/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid item xs>
                            <h4><strong>Edit</strong></h4>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid item xs>
                            <EditAsset
                                asset={asset} />
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