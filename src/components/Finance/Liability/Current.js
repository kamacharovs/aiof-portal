import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../../agent';

import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { AddEditDeleteTimeline } from '../../Common/Timelines';
import { LiabilityTextPaper } from '../../Common/Papers';
import { success, error } from '../../Common/AiofToast';
import { LIABILITIES, REDIRECT_LOGIN } from '../../../constants/actionTypes';
import { elevatedPaperTheme, theme, AlternateCircularProgress } from '../../../style/mui';


const mapStateToProps = state => ({
    ...state.finance,
    inProgressAssets: state.finance.inProgressAssets,
    inProgressDeleteAsset: state.finance.inProgressDeleteAsset,
});

const mapDispatchToProps = dispatch => ({
    onDelete: (id) =>
        dispatch({ type: ASSET_DELETE, payload: agent.Asset.delete(id) }),
});

const CurrentLiabilitiesView = props => {
    var liabilities = props.liabilities || [];
    var inPrgoress = props.inProgressLiabilities;

    return (
        <React.Fragment>
            <InProgressBar
                inPrgoress={inPrgoress} />

            {
                liabilities && inPrgoress === false
                    ? liabilities.map(l => {
                        return (
                            <Grid item xs={6} key={l.publicKey}>
                                <LiabilityTextPaper liability={l} />
                            </Grid>
                        );
                    })
                    : null
            }
        </React.Fragment>
    );
}

const InProgressBar = props => {
    if (props.inPrgoress) {
        return (
            <Grid container spacing={0} direction="column" justifyContent="center" alignItems="center">
                <Grid item xs align="center">
                    <br />
                    <AlternateCircularProgress />
                </Grid>
            </Grid>
        );
    }
    else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLiabilitiesView);