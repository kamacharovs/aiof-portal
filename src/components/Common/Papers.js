import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import JSONPretty from 'react-json-pretty';

import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import WebIcon from '@mui/icons-material/Web';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { assetSnapshotsAvgByMonth } from '../Common/Functions';
import { numberWithCommas } from '../Finance/Common';
import {
    AltLoader, H5Alt6, PAlt7, AltLink, TextMain, APrimary,
    squarePaperTheme, borderlessPaperTheme
} from '../../style/mui';


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
    redCode: {
        color: theme.palette.error.main,
        fontSize: '.75rem',
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
            <ThemeProvider theme={borderlessPaperTheme}>
                <Paper>
                    <Grid item xs>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <H5Alt6>{title} ({total})</H5Alt6>
                            </Grid>

                            <Grid item xs>
                                <Grid container justifyContent="flex-end">
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
                </Paper>
            </ThemeProvider>
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
            <ThemeProvider theme={borderlessPaperTheme}>
                <Paper>
                    <Grid item xs>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <H5Alt6>{title} ({total})</H5Alt6>
                            </Grid>

                            <Grid item xs>
                                <Grid container justifyContent="flex-end">
                                    <AltLink to={"/finance/liabilities"}>View</AltLink>
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
                </Paper>
            </ThemeProvider>
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
            <ThemeProvider theme={borderlessPaperTheme}>
                <Paper>
                    <Grid item xs>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <H5Alt6>{title}</H5Alt6>
                            </Grid>

                            <Grid item xs>
                                <Grid container justifyContent="flex-end">
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
                </Paper>
            </ThemeProvider>
        </React.Fragment>
    );
}

export const DependentPaper = props => {
    const title = props.title ? props.title : "Dependents";
    const footerTitle = props.footerTitle ? props.footerTitle : "Total dependents";
    const total = props.total && props.currentUser ? props.total : 0;

    return (
        <React.Fragment>
            <ThemeProvider theme={borderlessPaperTheme}>
                <Paper>
                    <Grid item xs>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <H5Alt6>{title}</H5Alt6>
                            </Grid>

                            <Grid item xs>
                                <Grid container justifyContent="flex-end">
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
                            : <Typography variant="h3">{total}</Typography>
                        }
                    </Grid>
                    <Grid item xs>
                        <PAlt7>
                            {footerTitle}
                        </PAlt7>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </React.Fragment>
    );
}

export const AssetsSnapshotsChartPaper = props => {
    if (props.assets
        && props.assets.length > 0) {
        const theme = useTheme();

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
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
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
        const theme = useTheme();

        const assetsSum = props.assets.map(a => a.value)
            .reduce((sum, current) => sum + current, 0);
        const liabilitiesSum = props.liabilities.map(a => a.value)
            .reduce((sum, current) => sum + current, 0);

        const data = {
            labels: ["Assets", "Liabilities"],
            datasets: [
                {
                    backgroundColor: [theme.palette.success.main, theme.palette.error.main],
                    hoverBackgroundColor: [theme.palette.success.main, theme.palette.error.main],
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
                <ThemeProvider theme={borderlessPaperTheme}>
                    <Paper>
                        <Grid container>
                            <Grid item xs>
                                <Bar
                                    data={data || []}
                                    height={300}
                                    options={options}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </ThemeProvider>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export const MonthlyIncomeSpendingChartPaper = props => {
    const theme = useTheme();

    const monthlyIncome = props.monthlyIncome || 0;
    const monthlySpending = props.monthlySpending || 0;

    const data = {
        labels: ["Monthly income", "Monthly spending"],
        datasets: [
            {
                backgroundColor: [theme.palette.success.main, theme.palette.error.main],
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
            <ThemeProvider theme={borderlessPaperTheme}>
                <Paper>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Bar
                                data={data || []}
                                height={300}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </React.Fragment>
    );
}

export const MonthlyIncomeSpendingPieChartPaper = props => {
    const theme = useTheme();

    const monthlyIncome = props.monthlyIncome || 0;
    const monthlySpending = props.monthlySpending || 0;

    const data = {
        labels: ["Monthly income", "Monthly spending"],
        datasets: [
            {
                backgroundColor: [theme.palette.success.main, theme.palette.error.main],
                data: [monthlyIncome, monthlySpending],
                borderWidth: 1,
            }
        ]
    }
    const options = {
        maintainAspectRatio: true,
        legend: {
            display: true
        },
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={borderlessPaperTheme}>
                <Paper>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Pie
                                data={data || []}
                                height={300}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </React.Fragment>
    );
}

export const APIPaper = props => {
    const keyPoints = props.keyPoints || [];

    return (
        <React.Fragment>
            <ThemeProvider theme={squarePaperTheme}>
                <Paper>
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start">
                        <Grid item xs>
                            <Typography variant="h1">
                                {props.title}
                            </Typography>
                            <TextMain>
                                {props.description || "No description"}
                            </TextMain>
                        </Grid>

                        <Grid item xs>
                            <Typography variant="h6">
                                Version
                            </Typography>
                            <TextMain>
                                {props.version}
                            </TextMain>
                        </Grid>

                        <Grid item xs>
                            <Typography variant="h6">
                                Contact
                            </Typography>
                            <TextMain>
                                <PersonIcon color="primary" /> {props.contact.name}<br />
                                <EmailIcon color="primary" /> {props.contact.email}<br />
                                <WebIcon color="primary" /> {props.contact.url}
                            </TextMain>
                        </Grid>

                        <Grid item xs>
                            <Typography variant="h6">
                                License
                            </Typography>
                            <TextMain>
                                <APrimary href={props.license.url} target="_blank">{props.license.name}</APrimary>
                            </TextMain>
                        </Grid>

                        <Grid item xs>
                            <Typography variant="h6">
                                Base URL
                            </Typography>
                            <TextMain>
                                <APrimary href={props.url}>{props.url}</APrimary>
                            </TextMain>
                        </Grid>

                        {keyPoints.length !== 0
                            ? <Grid item xs>
                                <Typography variant="h6">
                                    Key points
                                </Typography>
                                <ul>
                                    <TextMain>
                                        {
                                            keyPoints.map(kp => {
                                                return (

                                                    <li key={kp}>{kp}</li>
                                                );
                                            })
                                        }
                                    </TextMain>
                                </ul>
                            </Grid>
                            : null}

                        <Grid item xs>
                            <APrimary href={props.page} target="_blank">Full documentation</APrimary>
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </React.Fragment>
    );
}

export const CodePaper = props => {
    const theme = useTheme();
    const id = props.id;
    const data = props.data;

    if (data) {
        return (
            <React.Fragment>
                <Paper
                    elevation={0}
                    style={{
                        backgroundColor: theme.palette.code.main,
                        padding: theme.spacing(1)
                    }}>
                    <JSONPretty
                        id={id}
                        data={data} />
                </Paper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export const LiabilityTextPaper = props => {
    const liability = props.liability;

    if (liability) {
        return (
            <React.Fragment>
                <Paper>
                    <Grid container>
                        <Grid item xs>
                            <Typography variant="h1">
                                {liability.name.toUpperCase()}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs>
                            <Typography variant="text">
                                <i>{liability.typeName.toUpperCase()}</i>
                            </Typography>
                        </Grid>
                    </Grid>

                    <hr />

                    <Grid container>
                        <MoneyGrid name={"Value"} value={liability.value} isRed={true} />
                    </Grid>
                    <br />
                    <Grid container>
                        <MoneyGrid name={"Monthly payment"} value={liability.monthlyPayment} />
                        <MoneyGrid name={"Monthly payment estimate"} value={liability.monthlyPaymentEstimate} />
                    </Grid>
                    <br />
                    <Grid container>
                        <TextGrid name={"Original term"} value={`${liability.originalTerm} months`} />
                        <TextGrid name={"Remaining term"} value={`${liability.remainingTerm} months`} />
                    </Grid>
                    <br />
                    <Grid container>
                        <TextGrid name={"Interest"} value={`${liability.interest}%`} />
                        {
                            liability.additionalPayments
                                ? <MoneyGrid name={"Additional payments"} value={liability.additionalPayments} />
                                : <TextGrid name={"Additional payments"} value={"None"} />
                        }
                    </Grid>

                    <hr />
                   
                    <Grid container>
                        <Grid item xs>
                            <Typography variant="text">
                                <Tooltip title="Delete">
                                    <IconButton
                                        aria-label="delete-liability"
                                        onClick={e => props.onDelete(liability.id)} >
                                        <DeleteIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export const MoneyGrid = props => {
    return <TextGrid
        name={props.name}
        value={props.value}
        isMoney={true}
        isRed={props.isRed} />
}
export const TextGrid = props => {
    const classes = useStyles();
    const name = props.name;
    const value = props.value;
    const isMoney = props.isMoney || false;
    const isRed = props.isRed || false;

    return (
        <Grid item xs>
            <Grid container direction="column">
                <Grid item xs>
                    <Typography variant="caption">
                        {name}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="text">
                        <b>
                            {
                                isMoney
                                    ? isRed
                                        ? <div className={classes.red}>
                                            ${numberWithCommas(Math.round(value * 100) / 100)}
                                        </div>
                                        : <div>
                                            ${numberWithCommas(Math.round(value * 100) / 100)}
                                        </div>
                                    : value
                            }
                        </b>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
