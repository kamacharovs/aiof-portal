import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { round, federalTax, stateTax } from '../Common/Functions';
import { theme, commonStyles, SquarePaper, AltTextButton } from '../../style/mui';
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
        const classes = commonStyles()
        const grossSalary = props.profile ? props.profile.grossSalary || 0 : 0;
        const state = props.profile ? props.profile.physicalAddress ? props.profile.physicalAddress.state : null : null;
        const monthlySpending = liabilities.map(l => l.monthlyPayment)
            .reduce((sum, current) => sum + current, 0);

        const federaltax = federalTax();
        const statetax = stateTax(state);
        var totalTax = federaltax + statetax;

        const grossMonthlyIncome = round(grossSalary / 12);
        const netMonthlyIncome = round(grossMonthlyIncome * (1 - totalTax));
        const [monthlyIncome, setMonthlyIncome] = useState(grossMonthlyIncome);

        const handleSetNetMonthlyIncome = () => {
            setMonthlyIncome(netMonthlyIncome);
        }
        const handleSetGrossMonthlyIncome = () => {
            setMonthlyIncome(grossMonthlyIncome);
        }

        return (
            <React.Fragment>
                <ThemeProvider theme={theme}>
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

                                <Grid container spacing={3} className={classes.altText}>
                                    <Grid item xs>
                                        You can see your statistics as either <strong>net (after taxes)</strong> or <strong>gross (before taxes)</strong>.
                                        It defaults to <strong>gross</strong>. This data is based on your state and general federal income tax information.
                                        If you have not updated your profile's physical address, state included, then the default state tax will be applied.
                                        <br /><br />
                                        {
                                            state
                                                ? <React.Fragment>
                                                    <ul>
                                                        <li>State: <strong>{state}</strong></li>
                                                        <li>Fedetal tax: <strong>{federaltax * 100}%</strong></li>
                                                        <li>State tax: <strong>{statetax * 100}%</strong></li>
                                                    </ul>
                                                </React.Fragment>
                                                : <React.Fragment>
                                                    <ul>
                                                        <li>Fedetal tax: <strong>{federaltax * 100}%</strong></li>
                                                        <li>State tax (default): <strong>{statetax * 100}%</strong></li>
                                                    </ul>
                                                </React.Fragment>
                                        }
                                        {
                                            <React.Fragment>
                                                <Grid container spacing={2}>
                                                    <Grid item xs>
                                                        <Grid container>
                                                            <Grid item xs>
                                                                <strong>Values as</strong>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container>
                                                            <Grid item xs>
                                                                <AltTextButton
                                                                    text={"Net"}
                                                                    onClick={handleSetNetMonthlyIncome} />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs>
                                                                <AltTextButton
                                                                    text={"Gross"}
                                                                    onClick={handleSetGrossMonthlyIncome} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </React.Fragment>
                                        }
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs>
                                        <MonthlyIncomeSpendingChart
                                            currentUser={currentUser}
                                            monthlyIncome={monthlyIncome}
                                            monthlySpending={monthlySpending} />
                                    </Grid>
                                </Grid>
                            </SquarePaper>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

const MonthlyIncomeSpendingChart = props => {
    if (props.currentUser) {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs>
                        <H5Alt6>Your monthly income vs. monthly spending</H5Alt6>
                        <PAlt7>
                            This chart shows your total monthly income versus your total monthly spending
                            <br /><br />
                            Be sure to update your <AltLink to={"/profile"}>profile</AltLink> gross salary
                            and your <AltLink to={"/finance"}>liabilities</AltLink> in order to effectively leverage this chart
                        </PAlt7>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={4}>
                        <MonthlyIncomeSpendingChartPaper
                            monthlyIncome={props.monthlyIncome}
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