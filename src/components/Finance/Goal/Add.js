import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';

import { SquarePaper, InPaper, DefaultRedColor, DefaultGreenColor, DefaultHrColor } from '../../../style/mui';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    green: {
        color: DefaultGreenColor,
        margin: '0rem',
        padding: '0rem'
    },
    red: {
        color: DefaultRedColor,
        margin: '0rem',
        padding: '0rem'
    },
}));

const AddGoals = props => {
    const classes = useStyles();
    const size = '80';
    const [showTrip, setShowTrip] = useState(false);

    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square>
                <h5><strong>Add a Goal</strong></h5>
                <hr />

                <Grid container spacing={1} className={classes.root}>
                    <Grid item sm>
                        <Button color="default" size="large">
                            <MonetizationOnOutlinedIcon style={{ fontSize: size }} />
                            Generic
                        </Button>
                    </Grid>

                    <Grid item sm>
                        <Button color="default" size="large" onClick={() => setShowTrip(!showTrip)}>
                            <WbSunnyOutlinedIcon style={{ fontSize: size }} />
                            Go on a trip
                        </Button>
                    </Grid>

                    <Grid item sm>
                        <Button color="default" size="large">
                            <HomeOutlinedIcon style={{ fontSize: size }} />
                            Buy a home
                        </Button>
                    </Grid>
                </Grid>
            </SquarePaper>

            <AddTripGoal showTrip={showTrip} />
        </React.Fragment>
    );
}

const AddTripGoal = props => {
    if (props.showTrip) {
        const classes = useStyles();
        const [hasFlight, setHasFlight] = useState(false);
        const [flight, setFlight] = useState(0);
        const [hasHotel, setHasHotel] = useState(false);
        const [hotel, setHotel] = useState(0);

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <Grid item sm>
                            <strong>Trip</strong>
                            <br />
                            You can check which of the following your trip has and input the appropriate amount
                        </Grid>
                    </Grid>

                    <YesNoButtonGroup title="Flight" selectedValue={hasFlight} setValue={setHasFlight} hasValue={hasFlight} value={flight} />
                    <YesNoButtonGroup title="Hotel" selectedValue={hasHotel} setValue={setHasHotel} hasValue={hasHotel} value={hotel} />

                </SquarePaper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

const YesNoButtonGroup = props => {
    const title = props.title;
    const selectedValue = props.selectedValue;
    const setValue = props.setValue;
    const hasValue = props.hasValue;
    const value = props.value;

    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item sm>
                    <strong>{title}</strong>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item sm>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <ToggleButton
                            value={true}
                            selected={selectedValue}
                            onChange={() => {
                                setValue(true);
                            }}
                        >
                            Yes
                                </ToggleButton>

                        <ToggleButton
                            value={false}
                            selected={!selectedValue}
                            onChange={() => {
                                setValue(false);
                            }}
                        >
                            No
                                </ToggleButton>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item sm>
                    {hasValue ?
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AttachMoneySharpIcon />
                            </Grid>
                            <Grid item>
                                <TextField label=""
                                    value={value}
                                    onChange={e => setValue(e.target.Value)} />
                            </Grid>
                        </Grid>
                        : null}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AddGoals;