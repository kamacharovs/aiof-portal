import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { SquarePaper } from '../../style/mui';
import { H1Alt6, PAlt7 } from '../../style/common';
import { AssetsAndLiabilitiesTotalChartPaper } from '../Common/Papers';


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const StatisticsView = props => {
    if (props.currentUser
        && props.assets && props.assets.length > 0
        && props.liabilities && props.liabilities.length > 0) {
        return (
            <React.Fragment>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <SquarePaper variant="outlined" square>

                            <Grid container>
                                <Grid item xs>
                                    <H1Alt6>Statistics</H1Alt6>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <PAlt7>
                                        Look at your financial statistics below
                                    </PAlt7>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={4}>
                                    <AssetsAndLiabilitiesTotalChartPaper
                                        assets={props.assets}
                                        liabilities={props.liabilities} />
                                </Grid>
                            </Grid>

                        </SquarePaper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsView);