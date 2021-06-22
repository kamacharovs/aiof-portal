import React, { useState } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { round, federalTax, stateTax } from '../Common/Functions';
import { commonStyles, SquarePaper, AltTextButton, H5Alt6, TextMain, AltLink  } from '../../style/mui';
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
                <Grid container spacing={1}>
                    <Grid item xs>
                        <SquarePaper variant="outlined" square>
                            <Grid container>
                                <Grid item xs>
                                    <Typography variant="h1">Statistics</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <TextMain>
                                        Look at your financial statistics below
                                    </TextMain>
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
                        <TextMain>
                            This chart shows your total monthly income versus your total monthly spending.
                            Be sure to update your <AltLink to={"/profile"}>profile</AltLink> gross salary and physical address,
                            as well as your <AltLink to={"/finance"}>liabilities</AltLink> in order to effectively leverage this chart
                        </TextMain>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={3}>
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