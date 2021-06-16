import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { Line } from 'react-chartjs-2';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { numberWithCommas } from '../Finance/Common';
import { SquarePaper, InPaper, AiofLinearProgress, DefaultRedColor, DefaultGreenColor, ThinText } from '../../style/mui';
import { ASSET_BREAKDOWN, REDIRECT_HOME } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.finance.inProgress,
    assetBreakdown: state.finance.assetBreakdown,
});

const mapDispatchToProps = dispatch => ({
    onSubmit: assetBreakdown =>
        dispatch({ type: ASSET_BREAKDOWN, payload: agent.Asset.breakdown(assetBreakdown) }),
    onRedirectHome: () =>
        dispatch({ type: REDIRECT_HOME })
});

const useStyles = makeStyles((theme) => ({
    green: {
        color: DefaultGreenColor,
        margin: '0rem',
        padding: '0rem'
    },
    red: {
        color: DefaultRedColor,
        margin: '0rem',
        padding: '0rem'
    }
}));


class AssetBreakdown extends React.Component {
    constructor() {
        super();

        this.state = {
            value: 15000,
            contribution: 500,
            interest: 8,
            hysInterest: 1.75,
            years: 25,
            investmentFees: 0,
            taxDrag: 0,
        };

        this.classes = makeStyles((theme) => ({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            margin: {
                margin: theme.spacing(1),
            },
            withoutLabel: {
                marginTop: theme.spacing(3),
            },
            p: {
                padding: '0rem',
                margin: '0rem',
            },
            textField: {
                width: '25ch',
            },
        }));

        this.updateState = field => ev => {
            const state = this.state;
            const newState = Object.assign({}, state, { [field]: ev.target.value });
            this.setState(newState);
        };

        this.submitForm = ev => {
            ev.preventDefault();

            const assetBreakdown = Object.assign({}, this.state);

            assetBreakdown.value = assetBreakdown.value ? Number(assetBreakdown.value) : null;
            assetBreakdown.contribution = assetBreakdown.contribution ? Number(assetBreakdown.contribution) : null;
            assetBreakdown.interest = assetBreakdown.interest ? Number(assetBreakdown.interest) : null;
            assetBreakdown.hysInterest = assetBreakdown.hysInterest ? Number(assetBreakdown.hysInterest) : null;
            assetBreakdown.years = assetBreakdown.years ? Number(assetBreakdown.years) : null;
            assetBreakdown.investmentFees = assetBreakdown.investmentFees ? Number(assetBreakdown.investmentFees) : 0;
            assetBreakdown.taxDrag = assetBreakdown.taxDrag ? Number(assetBreakdown.taxDrag) : 0;

            this.props.onSubmit(assetBreakdown);
        };
    }

    componentDidMount() {
        if (!this.props.currentUser) {
            this.props.onRedirectHome();
        }

        if (this.props.assetBreakdown) {
            this.setState({
                value: this.props.assetBreakdown.value,
                contribution: this.props.assetBreakdown.contribution,
                interest: this.props.assetBreakdown.interest,
                hysInterest: this.props.assetBreakdown.hysInterest,
                years: this.props.assetBreakdown.years,
                investmentFees: this.props.assetBreakdown.investmentFees,
                taxDrag: this.props.assetBreakdown.taxDrag,
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{this.props.appName} | Asset breakdown</title>
                </Helmet>

                <Container maxWidth="sm">
                    <SquarePaper variant="outlined" square>
                        <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.submitForm}>
                            <Grid container spacing={3}>

                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <AttachMoneyIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField label="Value"
                                                    value={this.state.value}
                                                    onChange={this.updateState('value')} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <AttachMoneyIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField label="Contribution"
                                                    value={this.state.contribution}
                                                    onChange={this.updateState('contribution')} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <TrendingUpIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField label="Interest"
                                                    value={this.state.interest}
                                                    onChange={this.updateState('interest')} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <TrendingUpIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField label="HYS interest"
                                                    value={this.state.hysInterest}
                                                    onChange={this.updateState('hysInterest')} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <ArrowUpwardIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField label="Years"
                                                    value={this.state.years}
                                                    onChange={this.updateState('years')} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <TrendingUpIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField label="Tax drag"
                                                    value={this.state.taxDrag}
                                                    onChange={this.updateState('taxDrag')} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <TrendingUpIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField label="Investment fees"
                                                    value={this.state.investmentFees}
                                                    onChange={this.updateState('investmentFees')} />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" className={this.classes.button} >
                                        Calculate
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </SquarePaper>

                    <AssetBreakdownResults assetBreakdown={this.props.assetBreakdown} inProgress={this.props.inProgress} />

                </Container>
            </React.Fragment>
        );
    }
}


const AssetBreakdownResults = props => {
    if (props.assetBreakdown) {
        const classes = useStyles();

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <h4>
                            <strong>Your results</strong>
                        </h4>
                    </Grid>
                    <Grid container spacing={1}>
                        <ThinText>
                            Based on what you have entered into the form, we have calculated the following results:
                        </ThinText>
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


class AssetBreakdownChart extends React.Component {
    render() {
        if (this.props.breakdown) {
            const years = this.props.breakdown.map(x => x.year)
            const values = this.props.breakdown.map(x => x.value)
            const data = {
                labels: years,
                datasets: [
                    {
                        label: this.props.title,
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
        }
        return null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetBreakdown);