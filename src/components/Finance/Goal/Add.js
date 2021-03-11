import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';
import 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import DirectionsCarOutlinedIcon from '@material-ui/icons/DirectionsCarOutlined';

import {
    SquarePaper, AlternateButton, VerticalTextField, VerticalSelect,
    DefaultDarkTeal, DefaultRedColor, DefaultGreenColor
} from '../../../style/mui';
import { GOAL_TRIP_TYPES, GOAL_ADD } from '../../../constants/actionTypes';
import { GENERIC, TRIP } from '../../../constants/goals';


const mapStateToProps = state => ({
    ...state.finance,
    inProgressGoalTripTypes: state.finance.inProgressGoalTripTypes,
    inProgressAddGoal: state.finance.inProgressAddGoal,
    goalTripTypes: state.finance.goalTripTypes,
});

const mapDispatchToProps = dispatch => ({
    onTripTypes: () =>
        dispatch({ type: GOAL_TRIP_TYPES, payload: agent.Goal.tripTypes() }),
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
    select: {
        minWidth: 'flex',
    },
}));

const AddGoals = props => {
    const classes = useStyles();
    const size = '70';
    const [showGeneric, setShowGeneric] = useState(false);
    const [showTrip, setShowTrip] = useState(false);
    const [showBuyAHome, setShowBuyAHome] = useState(false);

    const handleShowGeneric = () => {
        setShowGeneric(!showGeneric);
        setShowTrip(false);
        setShowBuyAHome(false);
    }
    const handleShowTrip = () => {
        setShowGeneric(false);
        setShowTrip(!showTrip);
        setShowBuyAHome(false);
    }
    const handleShowHome = () => {
        setShowGeneric(false);
        setShowTrip(false);
        setShowBuyAHome(!showBuyAHome);
    }

    useEffect(() => {
        if (!props.goalTripTypes) {
            props.onTripTypes();
        }
    }, []);

    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square>
                <div style={{ color: DefaultDarkTeal }}>
                    <h3><strong>Add</strong></h3>
                </div>
                Pick one of the following goal types to add

                <Grid container spacing={1} className={classes.root}>
                    <Grid item sm>
                        <GoalPaper text={"Generic"} handleValue={handleShowGeneric}
                            icon={<MonetizationOnOutlinedIcon style={{ fontSize: size, color: DefaultDarkTeal }} />} />
                    </Grid>

                    <Grid item sm>
                        <GoalPaper text={"Go on a trip"} handleValue={handleShowTrip}
                            icon={<WbSunnyOutlinedIcon style={{ fontSize: size, color: DefaultDarkTeal }} />} />
                    </Grid>

                    <Grid item sm>
                        <GoalPaper text={"Buy a home"} handleValue={handleShowHome}
                            icon={<HomeOutlinedIcon style={{ fontSize: size, color: DefaultDarkTeal }} />}
                            comingSoon={true} />
                    </Grid>

                    <Grid item sm>
                        <GoalPaper text={"Buy a car"} handleValue={handleShowHome}
                            icon={<DirectionsCarOutlinedIcon style={{ fontSize: size, color: DefaultDarkTeal }} />}
                            comingSoon={true} />
                    </Grid>
                </Grid>
            </SquarePaper>

            <AddGenericGoal 
                showGeneric={showGeneric} 
                handleShowGeneric={handleShowGeneric} 
                onAdd={props.onAdd}
                scrollToCurrentGoals={props.scrollToCurrentGoals} />

            <AddTripGoal 
                showTrip={showTrip} 
                handleShowTrip={handleShowTrip} 
                goalTripTypes={props.goalTripTypes} 
                onAdd={props.onAdd}
                scrollToCurrentGoals={props.scrollToCurrentGoals}
                inProgressAddGoal={props.inProgressAddGoal} />
        </React.Fragment>
    );
}

const GoalPaper = ({ text, handleValue, icon, comingSoon }) => {
    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square onClick={handleValue}>
                <Grid container spacing={3} direction="column" justify="center" alignItems="center">
                    <Grid item sm>
                        {icon}
                    </Grid>
                    <Grid item sm>
                        <div style={{ color: DefaultDarkTeal }}>
                            <strong>{comingSoon
                                ? text.toUpperCase() + " (COMING SOON)"
                                : text.toUpperCase()}</strong>
                        </div>
                    </Grid>
                </Grid>
            </SquarePaper>
        </React.Fragment>
    );
}

const AddGenericGoal = props => {
    if (props.showGeneric) {
        const [name, setName] = useState("");
        const [amount, setAmount] = useState(1000);
        const [currentAmount, setCurrentAmount] = useState(100);
        const [monthlyContribution, setMonthlyContribution] = useState(150);
        const [plannedDate, setPlannedDate] = useState(new Date());

        const isAddEnabled = name !== ""
            && amount !== null && amount >= 0
            && currentAmount !== null && currentAmount >= 0
            && monthlyContribution !== null && monthlyContribution > 0
            && plannedDate !== null;

        const handleSetValue = (e, setValue) => {
            setValue(e.target.value);
        }
        const handlePlannedDate = (date) => {
            setPlannedDate(date);
        }

        const onAdd = (ev) => {
            ev.preventDefault();

            let payload = {
                name: name,
                type: GENERIC.toLowerCase(),
                amount: Number(amount) || 0,
                currentAmount: Number(currentAmount) || 0,
                monthlyContribution: Number(monthlyContribution) || 0,
                plannedDate: plannedDate || null,
            }

            props.onAdd(payload);
            props.handleShowGeneric();
            props.scrollToCurrentGoals();
        }

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <form noValidate autoComplete="off" onSubmit={onAdd}>
                        <Grid container spacing={1}>
                            <Grid item sm>
                                <div style={{ color: DefaultDarkTeal }}>
                                    <h4><strong>Generic</strong></h4>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <TextField label="Name"
                                    value={name}
                                    onChange={e => handleSetValue(e, setName)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        label="Planned date"
                                        value={plannedDate}
                                        onChange={handlePlannedDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'planned date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <TextField label="Amount"
                                    value={amount}
                                    onChange={e => handleSetValue(e, setAmount)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                />
                            </Grid>

                            <Grid item sm>
                                <TextField label="Current amount"
                                    value={currentAmount}
                                    onChange={e => handleSetValue(e, setCurrentAmount)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                />
                            </Grid>

                            <Grid item sm>
                                <TextField label="Monthly contribution"
                                    value={monthlyContribution}
                                    onChange={e => handleSetValue(e, setMonthlyContribution)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <AlternateButton type="submit" variant="contained" disabled={!isAddEnabled} >
                                    Add
                                </AlternateButton>
                            </Grid>
                        </Grid>
                    </form>
                </SquarePaper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

const AddTripGoal = props => {
    if (props.showTrip) {
        const classes = useStyles();
        const types = props.goalTripTypes || [];

        const [name, setName] = useState("");
        const [amount, setAmount] = useState("");
        const [currentAmount, setCurrentAmount] = useState("");
        const [monthlyContribution, setMonthlyContribution] = useState("");
        const [plannedDate, setPlannedDate] = useState(new Date());
        const [destination, setDestination] = useState("");
        const [type, setType] = useState(types[0]);
        const [duration, setDuration] = useState(7);
        const [travelers, setTravelers] = useState(2);
        const [hasFlight, setHasFlight] = useState(true);
        const [flight, setFlight] = useState(0);
        const [hasHotel, setHasHotel] = useState(true);
        const [hotel, setHotel] = useState(0);
        const [hasCar, setHasCar] = useState(false);
        const [car, setCar] = useState(0);
        const [hasFood, setHasFood] = useState(false);
        const [food, setFood] = useState(0);
        const [hasActivities, setHasActivities] = useState(false);
        const [activities, setActivities] = useState(0);
        const [hasOther, setHasOther] = useState(false);
        const [other, setOther] = useState(0);

        const isAddEnabled = name !== ""
            && plannedDate !== null
            && destination !== ""
            && type !== "";
        const inProgressAddGoal = props.inProgressAddGoal;

        const handleSetValue = (e, setValue) => {
            setValue(e.target.value);
        }
        const handlePlannedDate = (date) => {
            setPlannedDate(date);
        }

        const onAdd = (ev) => {
            ev.preventDefault();

            let payload = {
                name: name,
                type: TRIP.toLowerCase(),
                amount: Number(amount) || null,
                currentAmount: Number(currentAmount) || null,
                monthlyContribution: Number(monthlyContribution) || null,
                plannedDate: plannedDate || null,
                destination: destination,
                tripType: type,
                duration: Number(duration) || null,
                travelers: Number(travelers) || null,
                flight: Number(flight) || null,
                hotel: Number(hotel) || null,
                car: Number(car) || null,
                food: Number(food) || null,
                activities: Number(activities) || null,
                other: Number(other) || null,
            }

            props.onAdd(payload);
            props.handleShowTrip();
            props.scrollToCurrentGoals();
        }

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <form noValidate autoComplete="off" onSubmit={onAdd}>
                        <Grid container spacing={1}>
                            <Grid item sm>
                                <div style={{ color: DefaultDarkTeal }}>
                                    <h4><strong>Trip</strong></h4>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                Let's start by filling out some generic details about your goal trip
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item sm>
                                <VerticalTextField
                                    header={"What is the name of this goal?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            placeholder="Vacation"
                                            value={name}
                                            onChange={e => handleSetValue(e, setName)}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <VerticalTextField
                                    header={"What is the planned date for this goal?"}
                                    required
                                    textField={
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                required
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                value={plannedDate}
                                                onChange={handlePlannedDate}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'planned date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <br/><br/>
                                Let's get into more spcific details.<br/> If you don't know the total amount, then you can skip the final amount and use
                                the specific categories below to calculate your total 
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item sm>
                                <VerticalTextField
                                    header={"What will be the final amount towards this goal?"}
                                    textField={
                                        <TextField
                                            value={amount}
                                            onChange={e => handleSetValue(e, setAmount)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm>
                                <VerticalTextField
                                    header={"What is your current amount towards this goal?"}
                                    textField={
                                        <TextField
                                            value={currentAmount}
                                            onChange={e => handleSetValue(e, setCurrentAmount)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm>
                                <VerticalTextField
                                    header={"What will your monthly contribution be towards this goal?"}
                                    textField={
                                        <TextField
                                            value={monthlyContribution}
                                            onChange={e => handleSetValue(e, setMonthlyContribution)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"Where are you going on this trip?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            placeholder="Bahamas"
                                            value={destination}
                                            onChange={e => handleSetValue(e, setDestination)}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm={4}>
                                <FormControl className={classes.select}>
                                    <VerticalSelect
                                        header={"What is the type of this trip?"}
                                        required
                                        select={<Select
                                            required
                                            value={type}
                                            onChange={e => setType(e.target.value)}
                                        >
                                            {
                                                types.map(type => {
                                                    return (
                                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"How many days will this trip last?"}
                                    textField={
                                        <TextField
                                            placeholder="e.g. 7"
                                            value={duration}
                                            onChange={e => handleSetValue(e, setDuration)}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"How many travelers are going on this trip?"}
                                    textField={
                                        <TextField
                                            placeholder="e.g. 2"
                                            value={travelers}
                                            onChange={e => handleSetValue(e, setTravelers)}
                                        />
                                    }
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item sm>
                                <br /><br/>
                                This breakdown of separate categories will help you better calculate and manage your goal.<br />
                                If you don't have specific amounts, it is always best to overestimate<br /><br />
                                <b><i>Note: </i></b>the prices below are <i>per traveler</i>
                            </Grid>
                        </Grid>

                        <YesNoSwitch title="Flight" hasValue={hasFlight} setHasValue={setHasFlight} value={flight} setValue={setFlight} setHandleValue={handleSetValue} />
                        <YesNoSwitch title="Hotel" hasValue={hasHotel} setHasValue={setHasHotel} value={hotel} setValue={setHotel} setHandleValue={handleSetValue} />
                        <YesNoSwitch title="Car" hasValue={hasCar} setHasValue={setHasCar} value={car} setValue={setCar} setHandleValue={handleSetValue} />
                        <YesNoSwitch title="Food" hasValue={hasFood} setHasValue={setHasFood} value={food} setValue={setFood} setHandleValue={handleSetValue} />
                        <YesNoSwitch title="Activities" hasValue={hasActivities} setHasValue={setHasActivities} value={activities} setValue={setActivities} setHandleValue={handleSetValue} />
                        <YesNoSwitch title="Other" hasValue={hasOther} setHasValue={setHasOther} value={other} setValue={setOther} setHandleValue={handleSetValue} />

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <AlternateButton type="submit" variant="contained" disabled={!isAddEnabled && !inProgressAddGoal} >
                                    Add
                                </AlternateButton>
                            </Grid>
                        </Grid>
                    </form>
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
                <Grid item sm={3}>
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

                <Grid item sm={4}>
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