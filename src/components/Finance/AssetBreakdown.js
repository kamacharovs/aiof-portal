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
import { AiofPaper } from '../../style/mui';
import { ASSET_BREAKDOWN } from '../../constants/actionTypes';

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
            assetBreakdown.investmentFees = assetBreakdown.investmentFees ? Number(assetBreakdown.investmentFees) : null;
            assetBreakdown.taxDrag = assetBreakdown.taxDrag ? Number(assetBreakdown.taxDrag) : null;

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
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" className={this.classes.button} >
                                    Calculate
                                </Button>
                            </Grid>

                        </form>
                    </AiofPaper>
                </Container>

            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetBreakdown);