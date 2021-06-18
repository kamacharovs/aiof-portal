import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import config from '../../config';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import House from '../../style/icons/House_4.svg';
import Calculator from '../../style/icons/Calculator.svg';
import {
    BorderlessSquarePaper, SquarePaper, InBodyPaper,
    AltCheckCircle, AltClearIcon,
    PAlt7, AltLink, CoolExternalLink 
} from '../../style/mui';
import { CompletedChip, IncompleteChip } from '../../style/chips';
import { HOME_GETTING_STARTED_UPDATE } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    ...state.home,
    profile: state.finance.profile,
    inProgress: state.finance.inProgress,
    inProgressAssets: state.finance.inProgressAssets,
});

const mapDispatchToProps = dispatch => ({
    onGettingStartedShowUpdate: (field, value) =>
        dispatch({ type: HOME_GETTING_STARTED_UPDATE, field, value }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    heading: {
        fontSize: '14px',
        color: theme.palette.primary.dark,
        font: 'inherit',
        fontWeight: 900,
        flexBasis: '95%',
        flexShrink: 0,
    },
}));

const GettingStartedView = props => {
    if (props.currentUser) {
        const [showUpdateProfile, setShowUpdateProfile] = useState();
        const [showAddAssets, setShowAddAssets] = useState();
        const [showAddLiabilities, setShowAddLiabilities] = useState();
        const [showAddGoals, setShowAddGoals] = useState();
        
        const inProgress = props.inProgress;
        const inProgressAssets = props.inProgressAssets;
        const settings = props.settings;

        const profile = props.profile;
        const profileComplete = profile
            ? profile.gender !== null
                && profile.occupation !== null
                && (profile.grossSalary !== null && profile.grossSalary !== 0)
                && profile.educationLevel !== null
                && profile.residentialStatus !== null
                && profile.physicalAddress !== null
            : false;

        const assets = props.assets || [];
        const assetsLength = assets.length;
        const assetsMinimum = config.gettingStartedMinimumAssets;
        const assetsComplete = assetsLength >= assetsMinimum;

        const liabilities = props.liabilities || [];
        const liabilitiesLength = liabilities.length;
        const liabilitiesMinimum = config.gettingStartedMinimumLiabilities;
        const liabilitiesComplete = liabilitiesLength >= liabilitiesMinimum;

        const goals = props.goalsBase || [];
        const goalsLength = goals.length;
        const goalsMinimum = config.gettingStartedMinimumGoals;
        const goalsComplete = goalsLength >= goalsMinimum;
        
        const handleSetShow = (showName, showValue, setShow) => {
            setShow(showValue);
            props.onGettingStartedShowUpdate(showName, showValue);
        }

        useEffect(() => {
            var stateShowUpdateProfile = getShow(inProgress, settings, "showUpdateProfile", profileComplete);
            var stateShowAddLiabilities = getShow(inProgress, settings, "showAddLiabilities", liabilitiesComplete);
            var stateShowAddGoals = getShow(inProgress, settings, "showAddGoals", goalsComplete);

            setShowUpdateProfile(stateShowUpdateProfile);
            setShowAddLiabilities(stateShowAddLiabilities);
            setShowAddGoals(stateShowAddGoals);
        }, [props.inProgress]);
        
        useEffect(() => {
            var stateShowAddAssets = getShow(inProgressAssets, settings, "showAddAssets", assetsComplete);    
            setShowAddAssets(stateShowAddAssets);
        }, [props.inProgressAssets])

        return (
            <React.Fragment>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <SquarePaper variant="outlined" square>
                            <Grid container>
                                <Grid item xs>
                                <Typography variant="h1">Getting started</Typography>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs>
                                    <ProfileCheckmark
                                        inProgress={inProgress}
                                        profile={profile}
                                        profileComplete={profileComplete}
                                        showUpdateProfile={showUpdateProfile}
                                        showName={"showUpdateProfile"}
                                        setShowUpdateProfile={setShowUpdateProfile}
                                        handleSetShow={handleSetShow} />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs>
                                    <Assets
                                        inProgress={inProgress && inProgressAssets}
                                        assets={props.assets}
                                        assetsComplete={assetsComplete}
                                        assetsMinimum={assetsMinimum}
                                        showAddAssets={showAddAssets}
                                        showName={"showAddAssets"}
                                        setShowAddAssets={setShowAddAssets}
                                        handleSetShow={handleSetShow} />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs>
                                    <Liabilities
                                        inProgress={inProgress}
                                        liabilities={props.liabilities}
                                        liabilitiesComplete={liabilitiesComplete}
                                        liabilitiesMinimum={liabilitiesMinimum}
                                        showAddLiabilities={showAddLiabilities}
                                        showName={"showAddLiabilities"}
                                        setShowAddLiabilities={setShowAddLiabilities}
                                        handleSetShow={handleSetShow} />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs>
                                    <Goals
                                        inProgress={inProgress}
                                        goals={props.goalsBase}
                                        goalsComplete={goalsComplete}
                                        goalsMinimum={goalsMinimum}
                                        showAddGoals={showAddGoals}
                                        showName={"showAddGoals"}
                                        setShowAddGoals={setShowAddGoals}
                                        handleSetShow={handleSetShow} />
                                </Grid>
                            </Grid>
                        </SquarePaper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <Housing />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs>
                        <FinancialIndependence />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

const ProfileCheckmark = props => {
    const classes = useStyles();

    const profile = props.profile;

    if (profile) {
        const profileComplete = props.profileComplete;

        return (
            <BorderlessSquarePaper variant="outlined" square>
                <Grid container spacing={0}>
                    <Grid item xs>
                        <div className={classes.heading}>
                            <AltLink to={"/profile"}>Update your profile {profileComplete === false
                                ? <IncompleteChip inProgress={props.inProgress} />
                                : <CompletedChip inProgress={props.inProgress} />
                            }</AltLink>
                        </div>
                    </Grid>

                    <Grid item xs>
                        <Grid container justify="flex-end">
                            <ShowDynamic
                                show={props.showUpdateProfile}
                                showName={props.showName}
                                setShow={props.setShowUpdateProfile}
                                handleSetShow={props.handleSetShow} />
                        </Grid>
                    </Grid>
                </Grid>

                {props.showUpdateProfile
                    ? <React.Fragment>
                        <Grid container spacing={0}>
                            <Grid item xs>
                                <br />
                                <PAlt7>
                                    Filling out your finanial profile will help us get a better understanding of your financial state and
                                    will enhance the accuracy of your results and recommendations. You can find your profile under your name
                                    on the top right corner or by clicking on the header above
                                </PAlt7>
                            </Grid>
                        </Grid>

                        <CheckmarkDynamic fieldValue={profile.gender} fieldName={"Gender"} />
                        <CheckmarkDynamic fieldValue={profile.occupation} fieldName={"Occupation"} />
                        <CheckmarkDynamic fieldValue={profile.grossSalary} fieldName={"Gross salary"} />
                        <CheckmarkDynamic fieldValue={profile.educationLevel} fieldName={"Education level"} />
                        <CheckmarkDynamic fieldValue={profile.residentialStatus} fieldName={"Residential status"} />
                        <CheckmarkDynamic fieldValue={profile.physicalAddress} fieldName={"Physical address"} />
                    </React.Fragment>
                    : null}
            </BorderlessSquarePaper>
        );
    } else {
        return null;
    }
}

const FinancialIndependence = props => {
    return (
        <InBodyPaper
            title={"Financial independence"}
            subTitle={"United States"}
            body={
                <React.Fragment>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <img src={Calculator} alt="Calculator" style={{ maxWidth: "10rem", maxHeight: "10rem" }} />
                        </Grid>
                        <Grid item xs>
                            <strong>Benefits of financial independence</strong>
                            <ul>
                                <li>You will be much less stressed out</li>
                                <li>You will have more energy for self-improvement</li>
                                <li>You will have more opportunities to think long term</li>
                                <li>Thinking long term can be beneficial for your investments as well</li>
                            </ul>

                            <strong>We can help with these calculators</strong>
                            <ul>
                                <li><AltLink to="/fi/time" className="nav-link">Time to Financial Independence (FI)</AltLink></li>
                                <li><AltLink to="/fi/added/time" className="nav-link">Added time to Financial Independence (FI)</AltLink></li>
                                <li><AltLink to="/fi/compound/interest" className="nav-link">Compound interest</AltLink></li>
                                <li><AltLink to="/fi/bmi" className="nav-link">BMI</AltLink></li>
                                <li><AltLink to="/fi/coast/savings" className="nav-link">Coast Financial Independence/Retire Early (FIRE)</AltLink></li>
                            </ul>
                        </Grid>
                    </Grid>
                </React.Fragment>
            }>
        </InBodyPaper>
    );
}

const Housing = props => {
    return (
        <InBodyPaper
            title={"Housing"}
            subTitle={"United States"}
            body={
                <React.Fragment>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <img src={House} alt="House" style={{ maxWidth: "8rem", maxHeight: "8rem" }} />
                        </Grid>
                        <Grid item xs>
                            <strong>3 surprising facts about mortgages</strong>
                            <ul>
                                <li>Underwriters don't care about your assets</li>
                                <li>Having no credit score can hurt you</li>
                                <li>Your debt ratio isn't based on how much money you bring home</li>
                            </ul>

                            <strong>We can help</strong>
                            <ul>
                                <li><AltLink to="/property/mortgage" className="nav-link">Mortgage calculator</AltLink></li>
                            </ul>
                        </Grid>
                    </Grid>
                </React.Fragment>
            }>
        </InBodyPaper>
    );
}

const Assets = props => {
    const classes = useStyles();

    const assetsMinimum = props.assetsMinimum;
    const assetsComplete = props.assetsComplete;

    return (
        <BorderlessSquarePaper variant="outlined" square>
            <Grid container spacing={0}>
                <Grid item xs>
                    <div className={classes.heading}>
                        <AltLink to={"/finance/assets"}>Add assets {assetsComplete === false
                            ? <IncompleteChip inProgress={props.inProgress} />
                            : <CompletedChip inProgress={props.inProgress} />
                        }</AltLink>
                    </div>
                </Grid>

                <Grid item xs>
                    <Grid container justify="flex-end">
                        <ShowDynamic
                            show={props.showAddAssets}
                            showName={props.showName}
                            setShow={props.setShowAddAssets}
                            handleSetShow={props.handleSetShow} />
                    </Grid>
                </Grid>
            </Grid>

            {props.showAddAssets
                ? <React.Fragment>
                    <Grid container spacing={0}>
                        <Grid item xs>
                            <br />
                            <PAlt7>
                                A financial asset is a liquid asset that gets its value from a contractual right or ownership claim.
                                Car, cash, house, bonds, investment, and stocks are all are examples of financial assets.
                                <br /><br />
                                Unlike land, property, commodities, or other tangible physical assets, financial assets do not necessarily
                                have inherent physical worth or even a physical form. Rather, their value reflects factors of supply and
                                demand in the marketplace in which they trade, as well as the degree of risk they carry.
                                <br /><br />
                                <CoolExternalLink href="https://www.investopedia.com/terms/f/financialasset.asp" target="_blank">Source can be found here</CoolExternalLink>
                            </PAlt7>
                        </Grid>
                    </Grid>

                    <CheckmarkDynamic fieldValue={assetsComplete ? "completed" : null} fieldName={`At least ${assetsMinimum} assets`} />
                </React.Fragment>
                : null}
        </BorderlessSquarePaper>
    );
}

const Liabilities = props => {
    const classes = useStyles();

    const liabilitiesMinimum = props.liabilitiesMinimum;
    const liabilitiesComplete = props.liabilitiesComplete;

    return (
        <BorderlessSquarePaper variant="outlined" square>
            <Grid container spacing={0}>
                <Grid item xs>
                    <div className={classes.heading}>
                        <AltLink to={"/finance"}>Add liabilities {liabilitiesComplete === false
                            ? <IncompleteChip inProgress={props.inProgress} />
                            : <CompletedChip inProgress={props.inProgress} />
                        }</AltLink>
                    </div>
                </Grid>

                <Grid item xs>
                    <Grid container justify="flex-end">
                        <ShowDynamic
                            show={props.showAddLiabilities}
                            showName={props.showName}
                            setShow={props.setShowAddLiabilities}
                            handleSetShow={props.handleSetShow} />
                    </Grid>
                </Grid>
            </Grid>

            {props.showAddLiabilities
                ? <React.Fragment>
                    <Grid container spacing={0}>
                        <Grid item xs>
                            <br />
                            <PAlt7>
                                A liability is something a person or company owes, usually a sum of money. Liabilities are settled over time
                                through the transfer of economic benefits including money, goods, or services. Recorded on the right side of the balance sheet,
                                liabilities include loans, accounts payable, mortgages, deferred revenues, bonds, warranties, and accrued expenses.
                                <br /><br />
                                <CoolExternalLink href="https://www.investopedia.com/terms/l/liability.asp" target="_blank">Source can be found here</CoolExternalLink>
                            </PAlt7>
                        </Grid>
                    </Grid>

                    <CheckmarkDynamic fieldValue={liabilitiesComplete ? "completed" : null} fieldName={`At least ${liabilitiesMinimum} ${liabilitiesMinimum > 1 ? "liabilities" : "liability"}`} />
                </React.Fragment>
                : null}
        </BorderlessSquarePaper>
    );
}

const Goals = props => {
    const classes = useStyles();

    const goalsMinimum = props.goalsMinimum;
    const goalsComplete = props.goalsComplete;

    return (
        <BorderlessSquarePaper variant="outlined" square>
            <Grid container spacing={0}>
                <Grid item xs>
                    <div className={classes.heading}>
                        <AltLink to={"/finance/goals"}>Add goals {goalsComplete === false
                            ? <IncompleteChip inProgress={props.inProgress} />
                            : <CompletedChip inProgress={props.inProgress} />
                        }</AltLink>
                    </div>
                </Grid>

                <Grid item xs>
                    <Grid container justify="flex-end">
                        <ShowDynamic
                            show={props.showAddGoals}
                            showName={props.showName}
                            setShow={props.setShowAddGoals}
                            handleSetShow={props.handleSetShow} />
                    </Grid>
                </Grid>
            </Grid>

            {props.showAddGoals
                ? <React.Fragment>
                    <Grid container spacing={0}>
                        <Grid item xs>
                            <br />
                            <PAlt7>
                                How to set financial goals for your future? Setting short-term, midterm, and long-term financial goals is an important step toward
                                becoming financially secure. If you aren’t working toward anything specific, you’re likely to spend more than you should.
                                You’ll then come up short when you need money for unexpected bills, not to mention when you want to retire.
                                You might get stuck in a vicious cycle of credit card debt and feel like you never have enough cash to get properly insured,
                                leaving you more vulnerable than you need to be to handle some of life’s major risks.
                                <br /><br />
                                <CoolExternalLink href="https://www.investopedia.com/articles/personal-finance/100516/setting-financial-goals/" target="_blank">Source can be found here</CoolExternalLink>
                            </PAlt7>
                        </Grid>
                    </Grid>

                    <CheckmarkDynamic fieldValue={goalsComplete ? "completed" : null} fieldName={`At least ${goalsMinimum} ${goalsMinimum > 1 ? "goals" : "goal"}`} />
                </React.Fragment>
                : null}
        </BorderlessSquarePaper>
    );
}

const CheckmarkDynamic = props => {
    return (
        <Grid container spacing={0}>
            <Grid item xs>
                {props.fieldValue ? <AltCheckCircle /> : <AltClearIcon />} {props.fieldName}
            </Grid>
        </Grid>
    );
}

const ShowDynamic = props => {
    const theme = useTheme();

    return (
        <Tooltip title={props.show === true ? "Hide" : "Show"}>
            <IconButton
                style={{ color: theme.palette.primary.dark, padding: "0px" }}
                onClick={() => props.handleSetShow(props.showName, !props.show, props.setShow)}>
                {props.show === true
                    ? <ExpandLessIcon />
                    : <ExpandMoreIcon />}
            </IconButton>
        </Tooltip>
    );
}

function getShow(inProgress, settings, area, areaComplete) {
    if (inProgress === true || inProgress === undefined) { return false; }
    else if (settings && settings[area] !== null) { return settings[area]; }
    else {
        return !areaComplete;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GettingStartedView);