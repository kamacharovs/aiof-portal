import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Bar, Line } from 'react-chartjs-2';

import { assetSnapshotsAvgByMonth } from '../Common/Functions';
import { numberWithCommas } from '../Finance/Common';
import { BorderlessSquarePaper, AltLoader, ColorAlt2, ColorAlt4, ColorAlt8 } from '../../style/mui';
import { H5Alt6, PAlt7, AltLink } from '../../style/common';


const defaultClipSize = "24px";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    green: {
        color: theme.palette.success.main,
        fontSize: '1.25rem',
        margin: '0rem',
        padding: '0rem',
        paddingBottom: '0.25rem',
    },
    red: {
        color: theme.palette.error.main,
        fontSize: '1.25rem',
        margin: '0rem',
        padding: '0rem',
        paddingBottom: '0.25rem',
    },
}));

export const AssetPaper = props => {
    const classes = useStyles();
    const title = props.title ? props.title : "Asset balance";
    const footerTitle = props.footerTitle ? props.footerTitle : "Total asset value";
    const total = props.total ? props.total : 0;
    const totalValue = props.totalValue && props.currentUser ? props.totalValue : 0;

    return (
        <React.Fragment>
            <BorderlessSquarePaper variant="outlined" square>
                <Grid item xs>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <H5Alt6>{title} ({total})</H5Alt6>
                        </Grid>

                        <Grid item xs>
                            <Grid container justify="flex-end">
                                <AltLink to={"/finance/assets"}>View</AltLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs>
                    {props.inProgress
                        ? <AltLoader
                            inProgress={props.inProgress}
                            size={defaultClipSize} />
                        : <div className={classes.green}>
                            ${numberWithCommas(Math.round(totalValue * 100) / 100)}
                        </div>
                    }
                </Grid>

                <Grid item xs>
                    <PAlt7>
                        {footerTitle}
                    </PAlt7>
                </Grid>
            </BorderlessSquarePaper>
        </React.Fragment>
    );
}

export const LiabilityPaper = props => {
    const classes = useStyles();
    const title = props.title ? props.title : "Liability balance";
    const footerTitle = props.footerTitle ? props.footerTitle : "Total liability value";
    const total = props.total ? props.total : 0;
    const totalValue = props.totalValue && props.currentUser ? props.totalValue : 0;
    const totalMonthlyPayment = props.totalMonthlyPayment && props.currentUser ? props.totalMonthlyPayment : 0;

    return (
        <React.Fragment>
            <BorderlessSquarePaper variant="outlined" square>
                <Grid item xs>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <H5Alt6>{title} ({total})</H5Alt6>
                        </Grid>

                        <Grid item xs>
                            <Grid container justify="flex-end">
                                <AltLink to={"/finance"}>View</AltLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs>
                    {props.inProgress
                        ? <AltLoader
                            inProgress={props.inProgress}
                            size={defaultClipSize} />
                        :
                        <div className={classes.red}>
                            ${totalValue !== 0 ? "-" : null}{numberWithCommas(Math.round(totalValue * 100) / 100)}
                        </div>
                    }
                </Grid>
                <Grid item xs>
                    <PAlt7>
                        {footerTitle}
                    </PAlt7>
                </Grid>

                <Grid item xs>
                    {props.inProgress
                        ? <AltLoader
                            inProgress={props.inProgress}
                            size={defaultClipSize} />
                        :
                        <div className={classes.red}>
                            ${totalMonthlyPayment !== 0 ? "-" : null}{numberWithCommas(Math.round(totalMonthlyPayment * 100) / 100)}
                        </div>
                    }
                </Grid>
                <Grid item xs>
                    <PAlt7>
                        Total monthly payments
                    </PAlt7>
                </Grid>
            </BorderlessSquarePaper>
        </React.Fragment>
    );
}

export const GoalPaper = props => {
    const classes = useStyles();
    const title = props.title ? props.title : "Goals";
    const footerTitle = props.footerTitle ? props.footerTitle : "Total goals";
    const total = props.total && props.currentUser ? props.total : 0;
    const totalmonthlyContribution = props.totalmonthlyContribution && props.currentUser ? props.totalmonthlyContribution : 0;

    return (
        <React.Fragment>
            <BorderlessSquarePaper variant="outlined" square>
                <Grid item xs>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <H5Alt6>{title}</H5Alt6>
                        </Grid>

                        <Grid item xs>
                            <Grid container justify="flex-end">
                                <AltLink to={"/finance/goals"}>View</AltLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs>
                    {props.inProgress
                        ? <AltLoader
                            inProgress={props.inProgress}
                            size={defaultClipSize} />
                        :
                        <div className={classes.green}>
                            {total}
                        </div>
                    }
                </Grid>
                <Grid item xs>
                    <PAlt7>
                        {footerTitle}
                    </PAlt7>
                </Grid>

                <Grid item xs>
                    {props.inProgress
                        ? <AltLoader
                            inProgress={props.inProgress}
                            size={defaultClipSize} />
                        :
                        <div className={classes.green}>
                            ${numberWithCommas(Math.round(totalmonthlyContribution * 100) / 100)}
                        </div>
                    }
                </Grid>
                <Grid item xs>
                    <PAlt7>
                        Total monthly contributions
                    </PAlt7>
                </Grid>
            </BorderlessSquarePaper>
        </React.Fragment>
    );
}

export const DependentPaper = props => {
    const title = props.title ? props.title : "Dependents";
    const footerTitle = props.footerTitle ? props.footerTitle : "Total dependents";
    const total = props.total && props.currentUser ? props.total : 0;

    return (
        <React.Fragment>
            <BorderlessSquarePaper variant="outlined" square>
                <Grid item xs>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <H5Alt6>{title}</H5Alt6>
                        </Grid>

                        <Grid item xs>
                            <Grid container justify="flex-end">
                                <AltLink to={"/profile"}>View</AltLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs>
                    {props.inProgress
                        ? <AltLoader
                            inProgress={props.inProgress}
                            size={defaultClipSize} />
                        : total
                    }
                </Grid>
                <Grid item xs>
                    <PAlt7>
                        {footerTitle}
                    </PAlt7>
                </Grid>
            </BorderlessSquarePaper>
        </React.Fragment>
    );
}

export const AssetsSnapshotsChartPaper = props => {
    if (props.assets
        && props.assets.length > 0) {
        var assetsData = assetSnapshotsAvgByMonth(props.assets);
        var assetsLabels = assetsData.map(a => a.month);
        var assetsAvgs = assetsData.map(a => a.avg);

        const data = {
            labels: assetsLabels,
            datasets: [
                {
                    label: `Avg assets value by month (${new Date().getFullYear()})`,
                    data: assetsAvgs,
                    fill: true,
                    backgroundColor: ColorAlt2,
                    borderColor: ColorAlt2,
                },
            ],
        };

        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };

        return <Line
            data={data}
            options={options} />;
    } else {
        return null;
    }
}

export const AssetsAndLiabilitiesTotalChartPaper = props => {
    if (props.assets
        && props.liabilities) {
        const assetsSum = props.assets.map(a => a.value)
            .reduce((sum, current) => sum + current, 0);
        const liabilitiesSum = props.liabilities.map(a => a.value)
            .reduce((sum, current) => sum + current, 0);

        const data = {
            labels: ["Assets", "Liabilities"],
            datasets: [
                {
                    backgroundColor: [ColorAlt4, ColorAlt8],
                    hoverBackgroundColor: [ColorAlt4, ColorAlt8],
                    data: [assetsSum, liabilitiesSum]
                }
            ]
        }
        const options = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ]
            }
        }

        return (
            <React.Fragment>
                <BorderlessSquarePaper variant="outlined" square>
                    <Grid container>
                        <Grid item xs>
                            <Bar
                                data={data || []}
                                height={300}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                </BorderlessSquarePaper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export const MonthlyIncomeSpendingChartPaper = props => {
    const monthlyIncome = props.monthlyIncome || 0;
    const monthlySpending = props.monthlySpending || 0;

    const data = {
        labels: ["Monthly income", "Monthly spending"],
        datasets: [
            {
                backgroundColor: [ColorAlt4, ColorAlt8],
                hoverBackgroundColor: [ColorAlt4, ColorAlt8],
                data: [monthlyIncome, monthlySpending]
            }
        ]
    }
    const options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ]
        }
    }

    return (
        <React.Fragment>
            <BorderlessSquarePaper variant="outlined" square>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Bar
                            data={data || []}
                            height={300}
                            options={options}
                        />
                    </Grid>
                </Grid>
            </BorderlessSquarePaper>
        </React.Fragment>
    );

}
