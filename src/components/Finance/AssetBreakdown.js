import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { numberWithCommas } from '../Finance/Common';
import { GreenP, RedP } from '../../style/common';
import { AiofPaper } from '../../style/mui';
import { ASSET_BREAKDOWN } from '../../constants/actionTypes';
import { Line } from 'react-chartjs-2';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    assetBreakdown: state.finance.assetBreakdown,
});

const mapDispatchToProps = dispatch => ({
    onSubmit: assetBreakdown =>
        dispatch({ type: ASSET_BREAKDOWN, payload: agent.Asset.breakdown(assetBreakdown) })
});


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
        if (this.props.assetBreakdown) {
            this.setState({
                value: this.props.assetBreakdown[0].value,
                contribution: this.props.assetBreakdown[0].contribution,
                interest: this.props.assetBreakdown[0].interest,
                hysInterest: this.props.assetBreakdown[0].hysInterest,
                years: this.props.assetBreakdown[0].years,
                investmentFees: this.props.assetBreakdown[0].investmentFees,
                taxDrag: this.props.assetBreakdown[0].taxDrag,
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
                    <AiofPaper elevation={3}>
                        <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.submitForm}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <TextField label="Value"
                                            value={this.state.value}
                                            onChange={this.updateState('value')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }} />
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <TextField label="Contribution"
                                            value={this.state.contribution}
                                            onChange={this.updateState('contribution')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }} />
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <TextField label="Interest"
                                            value={this.state.interest}
                                            onChange={this.updateState('interest')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">%</InputAdornment>
                                            }} />
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <TextField label="HYS interest"
                                            value={this.state.hysInterest}
                                            onChange={this.updateState('hysInterest')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">%</InputAdornment>
                                            }} />
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <TextField label="Years"
                                            value={this.state.years}
                                            onChange={this.updateState('years')} />
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <TextField label="Tax drag"
                                            value={this.state.taxDrag}
                                            onChange={this.updateState('taxDrag')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">%</InputAdornment>
                                            }} />
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={this.classes.margin}>
                                        <TextField label="Investment fees"
                                            value={this.state.investmentFees}
                                            onChange={this.updateState('investmentFees')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">%</InputAdornment>
                                            }} />
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
                    </AiofPaper>

                    <AssetBreakdownResults assetBreakdown={this.props.assetBreakdown} />

                </Container>
            </React.Fragment>
        );
    }
}


const AssetBreakdownResults = props => {
    if (props.assetBreakdown) {
        return (
            <React.Fragment>
                <AiofPaper elevation={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <b>Value</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.assetBreakdown.value)}</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>Contribution</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.assetBreakdown.contribution)}</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>Interest</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>{props.assetBreakdown.interest}%</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>HYS interest</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>{props.assetBreakdown.hysInterest}%</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>Years</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>{props.assetBreakdown.years}</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>Frequency</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>{props.assetBreakdown.frequency}</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>Investment fees</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <RedP>{props.assetBreakdown.investmentFees}%</RedP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>Tax drag</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <RedP>{props.assetBreakdown.taxDrag}%</RedP>
                        </Grid>
                    </Grid>
                </AiofPaper>

                <AiofPaper elevation={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <b>Market value</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.assetBreakdown.marketValue)}</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>Market (begin) value</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.assetBreakdown.marketBeginValue)}</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>Market (with contribution) value</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.assetBreakdown.marketWithContributionValue)}</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>Market (begin with contribution) value</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.assetBreakdown.marketBeginWithContributionValue)}</GreenP>
                        </Grid>
                    </Grid>

                    <AssetBreakdownChart breakdown={props.assetBreakdown.marketValueBreakdown} title={'Market value'} />
                </AiofPaper>

                <AiofPaper elevation={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <b>HYS value</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.assetBreakdown.hysValue)}</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>HYS (begin) value</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.assetBreakdown.hysBeginValue)}</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>HYS (with contribution) value</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.assetBreakdown.hysWithContributionValue)}</GreenP>
                        </Grid>

                        <Grid item xs={6}>
                            <b>HYS (begin with contribution) value</b>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <GreenP>${numberWithCommas(props.assetBreakdown.hysBeginWithContributionValue)}</GreenP>
                        </Grid>
                    </Grid>

                    <AssetBreakdownChart breakdown={props.assetBreakdown.marketWithContributionValueBreakdown} title={'Market (with contributions) value'} />
                </AiofPaper>
            </React.Fragment>
        )
    }
    return null
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