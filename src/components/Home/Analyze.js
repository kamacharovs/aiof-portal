import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { SquarePaper, TextMain, InPaper, commonStyles } from '../../style/mui';
import { numberWithCommas } from '../Finance/Common';
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
    }, []);

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

                            <Grid container>
                                <Grid item xs>
                                    <TextMain>
                                        Look at your analytics about your current <b>Assets</b> and <b>Liabilities</b>
                                    </TextMain>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs>
                                    <TextMain>
                                        This includes some common financial benefits such as debt to income ratio, credit card debt to income ratio, and more.
                                    </TextMain>
                                </Grid>
                            </Grid>

                            {analyze ?
                                <React.Fragment>
                                    <Grid container spacing={1}>
                                        <Grid item xs>
                                            <InPaper
                                                title={"Assets mean"}
                                                body={<div className={classes.green}>${numberWithCommas(analyze.assetsMean)}</div>} />
                                        </Grid>

                                        <Grid item xs>
                                            <InPaper
                                                title={"Liabilities mean"}
                                                body={<div className={classes.red}>${numberWithCommas(analyze.liabilitiesMean)}</div>} />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1}>
                                        <Grid item xs>
                                            <InPaper
                                                title={"Assets to liabilities difference"}
                                                body={analytics.diff > 0
                                                    ? <div className={classes.green}>${numberWithCommas(analytics.diff)}</div>
                                                    : <div className={classes.red}>${numberWithCommas(analytics.diff)}</div>} />
                                        </Grid>

                                        {analytics.debtToIncomeRatio === null || Number(analytics.debtToIncomeRatio) === 0
                                            ? null
                                            : <Grid item xs>
                                                <RatioAnalyze
                                                    title={"Debt to income ratio"}
                                                    ratio={analytics.debtToIncomeRatio} />
                                            </Grid>
                                        }

                                        {analytics.cashToCcRatio === null && analytics.ccToCashRatio === null
                                            ? null
                                            : <Grid item xs>
                                                <RatioAnalyze
                                                    title={
                                                        analytics.cashToCcRatio !== null
                                                            ? "Cash to credit card ratio"
                                                            : "Credit card to cash ratio"
                                                    }
                                                    ratio={
                                                        analytics.cashToCcRatio !== null
                                                            ? analytics.cashToCcRatio
                                                            : analytics.ccToCashRatio
                                                    } />
                                            </Grid>
                                        }
                                    </Grid>
                                </React.Fragment>
                                : <TextMain>
                                    Please add more information in order to run Analytics. Such as at least one Asset and Liability
                                </TextMain>}
                        </SquarePaper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

const RatioAnalyze = props => {
    const ratio = props.ratio;

    if (ratio) {
        const classes = commonStyles();
        const low = ratio >= 0 && ratio <= 35;
        const middle = ratio > 35 && ratio <= 49;
        const high = ratio > 49;

        const title = props.title;
        const value = numberWithCommas(ratio) + "%";
        var color = classes.green;

        if (low) {
            color = classes.green;
        } else if (middle) {
            color = classes.warning;
        } else if (high) {
            color = classes.red;
        }

        return (
            <InPaper
                title={title}
                body={<div className={color}>{value}</div>} />
        );
    } else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeView);