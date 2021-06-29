import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { Line } from 'react-chartjs-2';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { TextFieldInputAdornment, TextFieldMoneyInputAdornment, TextFieldPercInputAdornment } from '../Common/Inputs';
import { numberWithCommas } from '../Finance/Common';
import { SquarePaper, InPaper, AiofLinearProgress, TextMain } from '../../style/mui';
import { ASSET_BREAKDOWN, REDIRECT_HOME } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.finance.inProgress,
    assetBreakdown: state.finance.assetBreakdown,
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (assetBreakdown) =>
        dispatch({ type: ASSET_BREAKDOWN, payload: agent.Asset.breakdown(assetBreakdown) }),
    onRedirectHome: () =>
        dispatch({ type: REDIRECT_HOME })
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
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
    }
}));


const AssetBreakdown = props => {
    const classes = useStyles();

    const [value, setValue] = useState(15000);
    const [contribution, setContribution] = useState(500);
    const [interest, setInterest] = useState(8);
    const [hysInterest, setHysInterest] = useState(1.75);
    const [years, setYears] = useState(25);
    const [investmentFees, setInvestmentFees] = useState(0);
    const [taxDrag, setTaxDrag] = useState(0);

    const submitForm = ev => {
        ev.preventDefault();

        var assetBreakdown = {};

        assetBreakdown.value = value ? Number(value) : null;
        assetBreakdown.contribution = contribution ? Number(contribution) : null;
        assetBreakdown.interest = interest ? Number(interest) : null;
        assetBreakdown.hysInterest = hysInterest ? Number(hysInterest) : null;
        assetBreakdown.years = years ? Number(years) : null;
        assetBreakdown.investmentFees = investmentFees ? Number(investmentFees) : 0;
        assetBreakdown.taxDrag = taxDrag ? Number(taxDrag) : 0;

        props.onSubmit(assetBreakdown);
    };

    useEffect(() => {
        if (!props.currentUser) {
            props.onRedirectHome();
        }

        if (props.assetBreakdown) {
            setValue(props.assetBreakdown.value);
            setContribution(props.assetBreakdown.contribution);
            setInterest(props.assetBreakdown.interest);
            setHysInterest(props.assetBreakdown.hysInterest);
            setYears(props.assetBreakdown.years);
            setInvestmentFees(props.assetBreakdown.investmentFees);
            setTaxDrag(props.assetBreakdown.taxDrag);
        }
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Asset breakdown</title>
            </Helmet>

            <Container maxWidth="sm">
                <SquarePaper variant="outlined" square>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={submitForm}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextFieldMoneyInputAdornment
                                    label="Value"
                                    value={value}
                                    onChange={e => setValue(e.target.value)} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextFieldMoneyInputAdornment
                                    label="Contribution"
                                    value={contribution}
                                    onChange={e => setContribution(e.target.value)} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextFieldPercInputAdornment
                                    label="Interest"
                                    value={interest}
                                    onChange={e => setInterest(e.target.value)} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextFieldPercInputAdornment
                                    label="HYS interest"
                                    value={hysInterest}
                                    onChange={e => setHysInterest(e.target.value)} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextFieldInputAdornment
                                    label="Years"
                                    value={years}
                                    onChange={e => setYears(e.target.value)} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextFieldPercInputAdornment
                                    label="Tax drag"
                                    value={taxDrag}
                                    onChange={e => setTaxDrag(e.target.value)} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextFieldPercInputAdornment label="Investment fees"
                                    value={investmentFees}
                                    onChange={e => setInvestmentFees(e.target.value)} />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" className={classes.button} >
                                    Calculate
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </SquarePaper>

                <AssetBreakdownResults
                    assetBreakdown={props.assetBreakdown}
                    inProgress={props.inProgress} />

            </Container>
        </React.Fragment>
    );
}

const AssetBreakdownResults = props => {
    if (props.assetBreakdown) {
        const classes = useStyles();

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <Typography variant="h1">
                            Your results
                        </Typography>
                    </Grid>
                    <Grid container spacing={1}>
                        <TextMain>
                            Based on what you have entered into the form, we have calculated the following results:
                        </TextMain>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs>
                            <InPaper title={"Value"}
                                body={<div className={classes.green}>${numberWithCommas(props.assetBreakdown.value)}</div>} />
                        </Grid>

                        <Grid item xs>
                            <InPaper title={"Contribution"}
                                body={<div className={classes.green}>${numberWithCommas(props.assetBreakdown.contribution)}</div>} />
                        </Grid>

                        <Grid item xs>
                            <InPaper title={"Interest"}
                                body={<div className={classes.green}>{props.assetBreakdown.interest}%</div>} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs>
                            <InPaper title={"HYS interest"}
                                body={<div className={classes.green}>{props.assetBreakdown.hysInterest}%</div>} />
                        </Grid>

                        <Grid item xs>
                            <InPaper title={"Years"}
                                body={<div className={classes.green}>{props.assetBreakdown.years}</div>} />
                        </Grid>

                        <Grid item xs>
                            <InPaper title={"Frequency"}
                                body={<div className={classes.green}>{props.assetBreakdown.frequency}</div>} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <InPaper title={"Investment fees"}
                                body={<div className={classes.red}>{props.assetBreakdown.investmentFees}%</div>} />
                        </Grid>

                        <Grid item xs={4}>
                            <InPaper title={"Tax drag"}
                                body={<div className={classes.red}>{props.assetBreakdown.taxDrag}%</div>} />
                        </Grid>
                    </Grid>
                </SquarePaper>

                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <InPaper title={"Market value"}
                                body={<div className={classes.green}>${numberWithCommas(props.assetBreakdown.marketValue)}</div>} />
                        </Grid>
                        <Grid item xs>
                            <InPaper title={"With contributions"}
                                body={<div className={classes.green}>${numberWithCommas(props.assetBreakdown.marketWithContributionValue)}</div>} />
                        </Grid>
                    </Grid>
                </SquarePaper>

                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <AssetBreakdownChart breakdown={props.assetBreakdown.marketValueBreakdown}
                                title={'Market value'} />
                        </Grid>
                    </Grid>
                </SquarePaper>

                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <AssetBreakdownChart breakdown={props.assetBreakdown.marketWithContributionValueBreakdown}
                                title={'Market (with contributions) value'} />
                        </Grid>
                    </Grid>
                </SquarePaper>

                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <InPaper title={"HYS value"}
                                body={<div className={classes.green}>${numberWithCommas(props.assetBreakdown.hysValue)}</div>} />
                        </Grid>
                        <Grid item xs>
                            <InPaper title={"With contributions"}
                                body={<div className={classes.green}>${numberWithCommas(props.assetBreakdown.hysWithContributionValue)}</div>} />
                        </Grid>
                    </Grid>
                </SquarePaper>

                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <AssetBreakdownChart breakdown={props.assetBreakdown.hysValueBreakdown}
                                title={'HYS value'} />
                        </Grid>
                    </Grid>
                </SquarePaper>

                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <AssetBreakdownChart breakdown={props.assetBreakdown.hysWithContributionValueBreakdown}
                                title={'HYS (with contributions) value'} />
                        </Grid>
                    </Grid>
                </SquarePaper>
            </React.Fragment>
        )
    }
    else if (props.inProgress) {
        return (
            <AiofLinearProgress />
        );
    }
    else {
        return null;
    }
}

const AssetBreakdownChart = props => {
    if (props.breakdown) {
        const years = props.breakdown.map(x => x.year)
        const values = props.breakdown.map(x => x.value)
        const data = {
            labels: years,
            datasets: [
                {
                    label: props.title,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: values
                }
            ]
        };

        return (
            <Line data={data} />
        );
    } else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetBreakdown);