import React, { useState } from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';

import { SquarePaper, DefaultRedColor, DefaultGreenColor } from '../../../style/mui';
import { GOAL_ADD } from '../../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.finance.inProgress,
    inProgressAddGoal: state.finance.inProgressAddGoal,
    goals: state.finance.goals
});

const mapDispatchToProps = dispatch => ({
    onAdd: (payload) =>
        dispatch({ type: GOAL_ADD, payload: agent.Goal.add(payload) }),
});

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

const AddBaseGoal = props => {
    if (props.showBase) {
        const classes = useStyles();

    } else {
        return null;
    }
}

const AddTripGoal = props => {
    if (props.showTrip) {
        const [destination, setDestination] = useState('');
        const [duration, setDuration] = useState(7);
        const [travelers, setTravelers] = useState(2);
        const [hasFlight, setHasFlight] = useState(false);
        const [flight, setFlight] = useState(0);
        const [hasHotel, setHasHotel] = useState(false);
        const [hotel, setHotel] = useState(0);
        const [hasCar, setHasCar] = useState(false);
        const [car, setCar] = useState(0);
        const [hasFood, setHasFood] = useState(false);
        const [food, setFood] = useState(0);
        const [hasActivities, setHasActivities] = useState(false);
        const [activities, setActivities] = useState(0);
        const [hasOther, setHasOther] = useState(false);
        const [other, setOther] = useState(0);

        const handleSetValue = (e, setValue) => {
            setValue(e.target.value);
        }

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

                    <Grid container spacing={1}>
                        <Grid item sm>
                            <hr/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item sm>
                            <TextField label="Destination"
                                placeholder="Bahamas"
                                value={destination}
                                onChange={e => handleSetValue(e, setDestination)}
                                helperText="The name of your destination"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item sm>
                            <TextField label="Duration"
                                value={duration}
                                onChange={e => handleSetValue(e, setDuration)}
                                helperText="The number of days of your duration"
                            />
                        </Grid>

                        <Grid item sm>
                            <TextField label="Travelers"
                                value={travelers}
                                onChange={e => handleSetValue(e, setTravelers)}
                                helperText="The number of travelers in your trip"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item sm>
                            <hr/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item sm>
                            This breakdown of separate categories will help you better calculate and manage your goal
                        </Grid>
                    </Grid>

                    <YesNoSwitch title="Flight" hasValue={hasFlight} setHasValue={setHasFlight} value={flight} setValue={setFlight} setHandleValue={handleSetValue} />
                    <YesNoSwitch title="Hotel" hasValue={hasHotel} setHasValue={setHasHotel} value={hotel} setValue={setHotel} setHandleValue={handleSetValue} />
                    <YesNoSwitch title="Car" hasValue={hasCar} setHasValue={setHasCar} value={car} setValue={setCar} setHandleValue={handleSetValue} />
                    <YesNoSwitch title="Food" hasValue={hasFood} setHasValue={setHasFood} value={food} setValue={setFood} setHandleValue={handleSetValue} />
                    <YesNoSwitch title="Activities" hasValue={hasActivities} setHasValue={setHasActivities} value={activities} setValue={setActivities} setHandleValue={handleSetValue} />
                    <YesNoSwitch title="Other" hasValue={hasOther} setHasValue={setHasOther} value={other} setValue={setOther} setHandleValue={handleSetValue} />

                </SquarePaper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

const YesNoSwitch = ({ title, hasValue, setHasValue, value, setValue, setHandleValue }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={1} className={classes.root}>
                <Grid item sm>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={hasValue}
                                onChange={e => setHasValue(!hasValue)}
                                name={hasValue.toString()}
                                color="primary"
                            />
                        }
                        label={title}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item sm>
                    {hasValue ?
                        <TextField
                            value={value}
                            onChange={e => setHandleValue(e, setValue)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }} />
                        : null}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGoals);