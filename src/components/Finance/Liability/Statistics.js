import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { TextGrid } from '../../Common/Papers';


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const LiabilityStatisticsView = props => {
    var liabilities = props.liabilities;
    var inProgress = props.inProgress;

    if (liabilities && !inProgress) {
        return (
            <React.Fragment>
                <Paper>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Typography variant="h1">
                                Statistics
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <TextGrid name={"Total"} value={liabilities.length} />
                    </Grid>
                </Paper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiabilityStatisticsView);