import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import House from '../../style/icons/House_4.svg';
import { SquarePaper, AltLoader, CoolExternalLink } from '../../style/mui';
import { UTILITY_USEFUL_DOCUMENTATION_BY_PAGE } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    finance: state.finance,
    usefulDocumentationsInProgress: state.utility.usefulDocumentationsInProgress,
    usefulDocumentations: state.utility.usefulDocumentations,
});

const mapDispatchToProps = dispatch => ({
    onUsefulDocumentations: () =>
        dispatch({ type: UTILITY_USEFUL_DOCUMENTATION_BY_PAGE, payload: agent.Utility.usefulDocumentationByPage("finance") }),
});

const UsefulDocumentationView = props => {
    if (props.currentUser) {
        const docs = props.usefulDocumentations ? props.usefulDocumentations : [];

        useEffect(() => {
            props.onUsefulDocumentations();
        }, []);

        return (
            <SquarePaper variant="outlined" square>
                <Grid container>
                    <Grid item xs>
                        <img src={House} alt="House" style={{ width: "5rem", height: "5rem" }} />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs>
                        <Typography variant="h6">
                            Useful documentations
                        </Typography>
                    </Grid>
                </Grid>

                {
                    props.usefulDocumentationsInProgress
                        ? <AltLoader
                            inProgress={props.usefulDocumentationsInProgress}
                            size={"32px"} />
                        : <Grid container>
                            <Grid item xs>
                                <ul>
                                    {
                                        docs.map(d => {
                                            return (
                                                <li key={d.publicKey}><CoolExternalLink href={d.url} target="_blank">{d.name}</CoolExternalLink></li>
                                            );
                                        })
                                    }
                                </ul>
                            </Grid>
                        </Grid>
                }
            </SquarePaper>
        );
    } else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsefulDocumentationView);