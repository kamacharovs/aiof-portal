import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { SquarePaper } from '../../style/mui';
import { H1Alt6, H5Alt6, PAlt7, AltLink } from '../../style/common';
import { MonthlyIncomeSpendingChartPaper } from '../Common/Papers';


const mapStateToProps = state => ({
    ...state.finance,
    profile: state.finance.profile,
});

const mapDispatchToProps = dispatch => ({
});

const StatisticsView = props => {
    const currentUser = props.currentUser;
    const assets = props.assets;
    const liabilities = props.liabilities;

    if (props.currentUser
        && assets
        && liabilities) {
        const profileGrossSalary = props.profile ? props.profile.grossSalary || 0 : 0;
        const liabilitiesMonthlySpending = liabilities.map(l => l.monthlyPayment)
            .reduce((sum, current) => sum + current, 0);

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

                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <MonthlyIncomeSpendingChart
                                        currentUser={currentUser}
                                        grossSalary={profileGrossSalary}
                                        monthlySpending={liabilitiesMonthlySpending} />
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

const MonthlyIncomeSpendingChart = props => {
    if (props.currentUser
        && props.grossSalary
        && props.monthlySpending) {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs>
                        <H5Alt6>Your monthly income vs. monthly spending</H5Alt6>
                        <PAlt7>
                            This chart shows your total monthly income versus your total monthly spending.
                            <br /><br />
                            Be sure to update your <AltLink to={"/profile"}>profile</AltLink> gross salary
                            and your <AltLink to={"/finance"}>liabilities</AltLink> in order to effectively leverage this chart.
                        </PAlt7>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={4}>
                        <MonthlyIncomeSpendingChartPaper
                            grossSalary={props.grossSalary}
                            monthlySpending={props.monthlySpending} />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsView);