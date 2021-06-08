import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { numberWithCommas } from '../Finance/Common';
import { BorderlessSquarePaper, Alt2Loader, ColorAlt4, ColorAlt8 } from '../../style/mui';
import { H5Alt6, PAlt7 } from '../../style/common';


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
    const totalAssetValue = props.totalAssetValue ? props.totalAssetValue : 0;

    return (
        <React.Fragment>
            <BorderlessSquarePaper variant="outlined" square>
                <Grid item xs>
                    <H5Alt6>{title}</H5Alt6>
                </Grid>

                <Grid item xs>
                    {props.inProgress
                        ? <Alt2Loader
                            inProgress={props.inProgress}
                            size={"24px"} />
                        :
                        <div className={classes.green}>
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
    const totalLiabilityValue = props.totalLiabilityValue ? props.totalLiabilityValue : 0;

    return (
        <React.Fragment>
            <BorderlessSquarePaper variant="outlined" square>
                <Grid item xs>
                    <H5Alt6>{title}</H5Alt6>
                </Grid>

                <Grid item xs>
                    {props.inProgress
                        ? <Alt2Loader
                            inProgress={props.inProgress}
                            size={"24px"} />
                        :
                        <div className={classes.red}>
                            ${totalLiabilityValue !== 0 ? "-" : null}{numberWithCommas(Math.round(totalLiabilityValue * 100) / 100)}
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