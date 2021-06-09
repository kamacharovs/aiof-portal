import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { numberWithCommas } from '../Finance/Common';
import { BorderlessSquarePaper, AltLoader, ColorAlt4, ColorAlt8 } from '../../style/mui';
import { H5Alt6, PAlt7, AltLink } from '../../style/common';


const defaultClipSize = "24px";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    green: {
        color: ColorAlt4,
        fontSize: '1rem',
        margin: '0rem',
        padding: '0rem',
        paddingBottom: '0.25rem',
    },
    red: {
        color: ColorAlt8,
        fontSize: '1rem',
        margin: '0rem',
        padding: '0rem',
        paddingBottom: '0.25rem',
    },
}));

export const AssetPaper = props => {
    const classes = useStyles();
    const title = props.title ? props.title : "Asset balance";
    const footerTitle = props.footerTitle ? props.footerTitle : "Total asset value";
    const totalAssets = props.totalAssets ? props.totalAssets : 0;
    const totalAssetValue = props.totalAssetValue && props.currentUser ? props.totalAssetValue : 0;

    return (
        <React.Fragment>
            <BorderlessSquarePaper variant="outlined" square>
                <Grid item xs>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <H5Alt6>{title}</H5Alt6>
                            <PAlt7>{totalAssets}</PAlt7>
                        </Grid>

                        <Grid item xs={2}>
                            <AltLink to={"/finance/assets"}>View</AltLink>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs>
                    {props.inProgress
                        ? <AltLoader
                            inProgress={props.inProgress}
                            size={defaultClipSize} />
                        : <div className={classes.green}>
                            ${numberWithCommas(Math.round(totalAssetValue * 100) / 100)}
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
    const totalValue = props.totalValue && props.currentUser ? props.totalValue : 0;
    const totalMonthlyPayment = props.totalMonthlyPayment && props.currentUser ? props.totalMonthlyPayment : 0;

    return (
        <React.Fragment>
            <BorderlessSquarePaper variant="outlined" square>
                <Grid item xs>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <H5Alt6>{title}</H5Alt6>
                        </Grid>

                        <Grid item xs={2}>
                            <AltLink to={"/finance"}>View</AltLink>
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
                        <Grid item xs={8}>
                            <H5Alt6>{title}</H5Alt6>
                        </Grid>

                        <Grid item xs={2}>
                            <AltLink to={"/finance/goals"}>View</AltLink>
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
                        <Grid item xs={8}>
                            <H5Alt6>{title}</H5Alt6>
                        </Grid>

                        <Grid item xs={2}>
                            <AltLink to={"/profile"}>View</AltLink>
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