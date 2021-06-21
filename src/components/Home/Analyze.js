import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { SquarePaper, PAlt7, InPaper, commonStyles } from '../../style/mui';
import { numberWithCommas, formatDate } from '../Finance/Common';
import { ANALYTICS_ANALYZE } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgressAnalyticsAnalyze: state.finance.inProgressAnalyticsAnalyze,
    analyze: state.finance.analyze,
});

const mapDispatchToProps = dispatch => ({
    onAnalyze: (assets, liabilities, annualIncome) =>
        dispatch({ type: ANALYTICS_ANALYZE, payload: agent.Analytics.analyze({ assets, liabilities, annualIncome }) }),
});

const AnalyzeView = props => {
    const classes = commonStyles();
    const currentUser = props.currentUser;
    const assets = props.assets;
    const liabilities = props.liabilities;
    const analyze = props.analyze;

    useEffect(() => {
        if (props.assets
            && props.liabilities
            && props.grossSalary) {
            props.onAnalyze(
                props.assets,
                props.liabilities,
                props.grossSalary)
        }
    }, [props.assets, props.liabilities, props.grossSalary]);

    if (currentUser
        && assets
        && liabilities
        && analyze) {
        const analytics = analyze.analytics;

        return (
            <React.Fragment>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <SquarePaper variant="outlined" square>
                            <Grid container spacing={1}>
                                <Grid item xs>
                                    <Typography variant="h1">Analytics</Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={1}>
                                <Grid item xs>
                                    <Typography variant="body1">
                                        Look at your analytics about you current <b>Assets</b> and <b>Liabilities</b>.
                                        This includes some common financial benefits such as debt to income ratio.
                                    </Typography>
                                </Grid>
                            </Grid>

                            {analyze ?
                                <React.Fragment>
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <InPaper
                                                title={"Assets total"}
                                                body={<div className={classes.green}>${numberWithCommas(analyze.assetsTotal)}</div>} />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <InPaper
                                                title={"Liabilities total"}
                                                body={<div className={classes.red}>${numberWithCommas(analyze.liabilitiesTotal)}</div>} />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <InPaper
                                                title={"Assets to liabilities difference"}
                                                body={analytics.diff > 0
                                                    ? <div className={classes.green}>${numberWithCommas(analytics.diff)}</div>
                                                    : <div className={classes.red}>${numberWithCommas(analytics.diff)}</div>} />
                                        </Grid>


                                    </Grid>

                                    <Grid container spacing={1}>
                                        {analytics.cashToCcRatio === null && analytics.ccToCashRatio === null
                                            ? null
                                            : <Grid item xs={4}>
                                                <InPaper
                                                    title={
                                                        analytics.cashToCcRatio !== null
                                                            ? "Cash to credit card ratio"
                                                            : "Credit card to cash ratio"
                                                    }
                                                    body={
                                                        analytics.cashToCcRatio !== null
                                                            ? analytics.cashToCcRatio + "%"
                                                            : analytics.ccToCashRatio + "%"
                                                    } />
                                            </Grid>
                                        }

                                        {analytics.debtToIncomeRatio === null || Number(analytics.debtToIncomeRatio) === 0
                                            ? null
                                            : <Grid item xs={4}>
                                                <InPaper
                                                    title={"Debt to income ratio"}
                                                    body={numberWithCommas(analytics.debtToIncomeRatio) + "%"} />
                                            </Grid>
                                        }
                                    </Grid>
                                </React.Fragment>
                                : <PAlt7>
                                    Please add more information in order to run Analytics. Such as at least one Asset and Liability
                                </PAlt7>}
                        </SquarePaper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeView);