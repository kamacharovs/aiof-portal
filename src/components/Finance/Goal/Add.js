import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';
import 'date-fns';

import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

import { SquarePaper, AlternateButton, VerticalTextField, VerticalSelect } from '../../../style/mui';
import { GOAL_TRIP_TYPES, GOAL_COLLEGE_TYPES, GOAL_ADD } from '../../../constants/actionTypes';
import {
    GENERIC, TRIP, SAVEFORCOLLEGE,
    GOAL_TRIP_TYPES_MAPPING, GOAL_COLLEGE_TYPE_MAPPING, BUYAHOME
} from '../../../constants/goals';
import { isNumber } from '../Common';


const mapStateToProps = state => ({
    ...state.finance,
    inProgressGoalTripTypes: state.finance.inProgressGoalTripTypes,
    inProgressAddGoal: state.finance.inProgressAddGoal,
    goalTripTypes: state.finance.goalTripTypes,
    goalCollegeTypes: state.finance.goalCollegeTypes,
});

const mapDispatchToProps = dispatch => ({
    onTripTypes: () =>
        dispatch({ type: GOAL_TRIP_TYPES, payload: agent.Goal.tripTypes() }),
    onCollegeTypes: () =>
        dispatch({ type: GOAL_COLLEGE_TYPES, payload: agent.Goal.collegeTypes() }),
    onAdd: (payload) =>
        dispatch({ type: GOAL_ADD, payload: agent.Goal.add(payload) }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    green: {
        color: theme.palette.success.main,
        margin: '0rem',
        padding: '0rem'
    },
    red: {
        color: theme.palette.error.main,
        margin: '0rem',
        padding: '0rem'
    },
    select: {
        minWidth: 'flex',
    },
}));

const AddGoals = props => {
    const classes = useStyles();
    const theme = useTheme();
    const size = '70';
    const [showGeneric, setShowGeneric] = useState(true);
    const [showTrip, setShowTrip] = useState(false);
    const [showBuyAHome, setShowBuyAHome] = useState(false);
    const [showBuyACar, setShowBuyACar] = useState(false);
    const [showSaveForCollege, setShowSaveForCollege] = useState(false);

    const handleShowGeneric = () => {
        setShowGeneric(!showGeneric);
        setShowTrip(false);
        setShowBuyAHome(false);
        setShowBuyACar(false);
        setShowSaveForCollege(false);
    }
    const handleShowTrip = () => {
        setShowGeneric(false);
        setShowTrip(!showTrip);
        setShowBuyAHome(false);
        setShowBuyACar(false);
        setShowSaveForCollege(false);
    }
    const handleShowHome = () => {
        setShowGeneric(false);
        setShowTrip(false);
        setShowBuyAHome(!showBuyAHome);
        setShowBuyACar(false);
        setShowSaveForCollege(false);
    }
    const handleShowBuyACar = () => {
        setShowGeneric(false);
        setShowTrip(false);
        setShowBuyAHome(false);
        setShowBuyACar(false);
        setShowSaveForCollege(false);
    }
    const handleShowSaveForCollege = () => {
        setShowGeneric(false);
        setShowTrip(false);
        setShowBuyAHome(false);
        setShowBuyACar(false);
        setShowSaveForCollege(!showSaveForCollege);
    }

    useEffect(() => {
        if (!props.goalTripTypes) {
            props.onTripTypes();
        }
    }, []);
    useEffect(() => {
        if (!props.goalCollegeTypes) {
            props.onCollegeTypes();
        }
    }, []);

    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square>
                <div style={{ color: theme.palette.secondary.dark }}>
                    <h3><strong>Add</strong></h3>
                </div>
                Pick one of the following goal types to add

                <Grid container spacing={1} className={classes.root}>
                    <Grid item sm={3}>
                        <GoalPaper text={"Generic"} handleValue={handleShowGeneric}
                            icon={<MonetizationOnOutlinedIcon style={{ fontSize: size, color: theme.palette.secondary.dark }} />} />
                    </Grid>

                    <Grid item sm={3}>
                        <GoalPaper text={"Go on a trip"} handleValue={handleShowTrip}
                            icon={<WbSunnyOutlinedIcon style={{ fontSize: size, color: theme.palette.secondary.dark }} />} />
                    </Grid>
                    
                    <Grid item sm={3}>
                        <GoalPaper text={"Buy a home"} handleValue={handleShowHome}
                            icon={<HomeOutlinedIcon style={{ fontSize: size, color: theme.palette.secondary.dark }} />}  />
                    </Grid>

                    <Grid item sm={3}>
                        <GoalPaper text={"Save for college"} handleValue={handleShowSaveForCollege}
                            icon={<SchoolOutlinedIcon style={{ fontSize: size, color: theme.palette.secondary.dark }} />} />
                    </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.root}>
                    <Grid item sm={3}>
                        <GoalPaper text={"Buy a car"} handleValue={handleShowBuyACar}
                            icon={<DirectionsCarOutlinedIcon style={{ fontSize: size, color: theme.palette.secondary.dark }} />}
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

            <AddHomeGoal
                showBuyAHome={showBuyAHome}
                handleShowHome={handleShowHome}
                onAdd={props.onAdd}
                scrollToCurrentGoals={props.scrollToCurrentGoals}
                inProgressAddGoal={props.inProgressAddGoal} />

            <AddBuyACarGoal
                showBuyACar={showBuyACar} />

            <AddSaveForCollege
                showSaveForCollege={showSaveForCollege}
                handleShowSaveForCollege={handleShowSaveForCollege}
                goalCollegeTypes={props.goalCollegeTypes}
                onAdd={props.onAdd}
                scrollToCurrentGoals={props.scrollToCurrentGoals}
                inProgressAddGoal={props.inProgressAddGoal} />
        </React.Fragment>
    );
}

const GoalPaper = ({ text, handleValue, icon, comingSoon }) => {
    const theme = useTheme();

    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square onClick={handleValue}>
                <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
                    <Grid item sm>
                        {icon}
                    </Grid>
                    <Grid item sm>
                        <div style={{ color: theme.palette.secondary.dark }}>
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
        const theme = useTheme();
        const date = new Date();
        const defaultPlannedDate = new Date(date.setMonth(date.getMonth() + 3));

        const [name, setName] = useState("");
        const [amount, setAmount] = useState(1000);
        const [currentAmount, setCurrentAmount] = useState(100);
        const [monthlyContribution, setMonthlyContribution] = useState(150);
        const [plannedDate, setPlannedDate] = useState(defaultPlannedDate);

        const isAddEnabled = name !== ""
            && isNumber(amount)
            && isNumber(currentAmount)
            && isNumber(monthlyContribution)
            && plannedDate !== null;
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
                                <div style={{ color: theme.palette.secondary.dark }}>
                                    <h4><strong>Generic</strong></h4>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                Just fill out the details below
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
                                            placeholder="Save money"
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
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker 
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
                                        </LocalizationProvider>
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <VerticalTextField
                                    header={"What will be the final amount towards this goal?"}
                                    required
                                    textField={
                                        <TextField
                                            value={amount}
                                            required
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
                                    required
                                    textField={
                                        <TextField
                                            value={currentAmount}
                                            required
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
                                    required
                                    textField={
                                        <TextField
                                            value={monthlyContribution}
                                            required
                                            onChange={e => handleSetValue(e, setMonthlyContribution)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>
                        </Grid>

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

const AddTripGoal = props => {
    if (props.showTrip) {
        const classes = useStyles();
        const theme = useTheme();
        const types = props.goalTripTypes || [];
        const date = new Date();
        const defaultPlannedDate = new Date(date.setMonth(date.getMonth() + 6));

        const [name, setName] = useState("");
        const [amount, setAmount] = useState("");
        const [currentAmount, setCurrentAmount] = useState("");
        const [monthlyContribution, setMonthlyContribution] = useState("");
        const [plannedDate, setPlannedDate] = useState(defaultPlannedDate);
        const [destination, setDestination] = useState("");
        const [type, setType] = useState("");
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

        const isAddEnabled = name !== ""
            && isNumber(currentAmount)
            && isNumber(monthlyContribution)
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
                                <div style={{ color: theme.palette.secondary.dark }}>
                                    <h4><strong>Trip</strong></h4>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                Let's start by filling out some generic details
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item sm={4}>
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
                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is the planned date for this goal?"}
                                    required
                                    textField={
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
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
                                        </LocalizationProvider>
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <br /><br />
                                Let's get into more spcific details. If you don't know the total amount, then you can skip the final amount and use
                                the specific categories below to calculate your total
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item sm={4}>
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

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is your current amount towards this goal?"}
                                    required
                                    textField={
                                        <TextField
                                            value={currentAmount}
                                            required
                                            onChange={e => handleSetValue(e, setCurrentAmount)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What will your monthly contribution be towards this goal?"}
                                    required
                                    textField={
                                        <TextField
                                            value={monthlyContribution}
                                            required
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
                                        select={
                                            <Select
                                                required
                                                value={type}
                                                onChange={e => setType(e.target.value)}
                                            >
                                                {
                                                    types.map(t => {
                                                        return (
                                                            <MenuItem key={t} value={t}>{GOAL_TRIP_TYPES_MAPPING[t.toUpperCase()]}</MenuItem>
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
                                <br /><br />
                                This breakdown of separate categories will help you better calculate and manage your goal.
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

const AddHomeGoal = props => {
    if (props.showBuyAHome) {
        const theme = useTheme();
        const date = new Date();
        const defaultPlannedDate = new Date(date.setMonth(date.getMonth() + 2 * 12));

        const [name, setName] = useState("");
        const [amount, setAmount] = useState("");
        const [currentAmount, setCurrentAmount] = useState(5000);
        const [monthlyContribution, setMonthlyContribution] = useState(750);
        const [plannedDate, setPlannedDate] = useState(defaultPlannedDate);

        const [homeValue, setHomeValue] = useState(300000);
        const [mortgageRate, setMortgageRate] = useState(3);
        const [percentDownPayment, setPercentDownPayment] = useState(10);
        const [annualInsurance, setAnnualInsurance] = useState(500);
        const [annualPropertyTax, setAnnualPropertyTax] = useState(1);

        const isAddEnabled = name !== ""
            && isNumber(currentAmount)
            && isNumber(monthlyContribution)
            && plannedDate !== null
            && isNumber(homeValue)
            && isNumber(percentDownPayment);
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
                type: BUYAHOME.toLowerCase(),
                amount: Number(amount) || null,
                currentAmount: Number(currentAmount) || null,
                monthlyContribution: Number(monthlyContribution) || null,
                plannedDate: plannedDate || null,
                homeValue: Number(homeValue) || null,
                mortgageRate: Number(mortgageRate / 100) || null,
                percentDownPayment: Number(percentDownPayment / 100) || null,
                annualInsurance: Number(annualInsurance) || null,
                annualPropertyTax: Number(annualPropertyTax / 100) || null
            }

            props.onAdd(payload);
            props.handleShowHome();
            props.scrollToCurrentGoals();
        }

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <form noValidate autoComplete="off" onSubmit={onAdd}>
                        <Grid container spacing={1}>
                            <Grid item sm>
                                <div style={{ color: theme.palette.secondary.dark }}>
                                    <h4><strong>Save for a home</strong></h4>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                Let's start by filling out some generic details
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is the name of this goal?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            placeholder="Save for a home"
                                            value={name}
                                            onChange={e => handleSetValue(e, setName)}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is the planned date for this goal?"}
                                    required
                                    textField={
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
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
                                <br /><br />
                                Let's get into more spcific details. If you don't know the total amount, then you can skip it and
                                fill out the 'Home value', 'Mortgage downpayment'
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item sm={4}>
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

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is your current amount towards this goal?"}
                                    required
                                    textField={
                                        <TextField
                                            value={currentAmount}
                                            required
                                            onChange={e => handleSetValue(e, setCurrentAmount)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What will your monthly contribution be towards this goal?"}
                                    required
                                    textField={
                                        <TextField
                                            value={monthlyContribution}
                                            required
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
                                    header={"What is the home value?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            value={homeValue}
                                            onChange={e => handleSetValue(e, setHomeValue)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is the mortgage rate?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            value={mortgageRate}
                                            onChange={e => handleSetValue(e, setMortgageRate)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">%</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is the down payment?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            value={percentDownPayment}
                                            onChange={e => handleSetValue(e, setPercentDownPayment)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">%</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What will be the annual insurance?"}
                                    textField={
                                        <TextField
                                            value={annualInsurance}
                                            onChange={e => handleSetValue(e, setAnnualInsurance)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What will be the annual property tax?"}
                                    textField={
                                        <TextField
                                            value={annualPropertyTax}
                                            onChange={e => handleSetValue(e, setAnnualPropertyTax)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">%</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <AlternateButton type="submit" variant="contained" disabled={!isAddEnabled && !inProgressAddGoal} >
                                    Add
                                </AlternateButton>
                            </Grid>
                        </Grid>
                    </form>
                </SquarePaper>
            </React.Fragment >
        );
    } else {
        return null;
    }
}

const AddBuyACarGoal = props => {
    if (props.showBuyACar) {
        return null;
    } else {
        return null;
    }
}

const AddSaveForCollege = props => {
    if (props.showSaveForCollege) {
        const classes = useStyles();
        const theme = useTheme();
        const date = new Date();
        const types = props.goalCollegeTypes || [];
        const defaultPlannedDate = new Date(date.setMonth(date.getMonth() + 8 * 12));

        const [name, setName] = useState("");
        const [amount, setAmount] = useState("");
        const [currentAmount, setCurrentAmount] = useState(0);
        const [monthlyContribution, setMonthlyContribution] = useState(250);
        const [plannedDate, setPlannedDate] = useState(defaultPlannedDate);
        const [type, setType] = useState("");
        const [costPerYear, setCostPerYear] = useState(15000);
        const [studentAge, setStudentAge] = useState(10);
        const [years, setYears] = useState(4);
        const [collegeName, setCollegeName] = useState("");
        const [annualCostIncrease, setAnnualCostIncrease] = useState(4);
        const [beginningCollegeAge, setBeginningCollegeAge] = useState(18);

        const isAddEnabled = name !== ""
            && isNumber(currentAmount)
            && isNumber(monthlyContribution)
            && plannedDate !== null
            && type !== ""
            && isNumber(costPerYear)
            && isNumber(studentAge)
            && isNumber(years)
            && collegeName !== "";
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
                type: SAVEFORCOLLEGE.toLowerCase(),
                amount: Number(amount) || null,
                currentAmount: Number(currentAmount) || null,
                monthlyContribution: Number(monthlyContribution) || null,
                plannedDate: plannedDate || null,
                collegeType: type,
                costPerYear: Number(costPerYear),
                studentAge: Number(studentAge),
                years: Number(years),
                collegeName: collegeName || null,
                annualCostIncrease: Number(annualCostIncrease / 100) || null,
                beginningCollegeAge: Number(beginningCollegeAge) || null,
            }

            props.onAdd(payload);
            props.handleShowSaveForCollege();
            props.scrollToCurrentGoals();
        }

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <form noValidate autoComplete="off" onSubmit={onAdd}>
                        <Grid container spacing={1}>
                            <Grid item sm>
                                <div style={{ color: theme.palette.secondary.dark }}>
                                    <h4><strong>Save for college</strong></h4>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                Let's start by filling out some generic details
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is the name of this goal?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            placeholder="Save for college"
                                            value={name}
                                            onChange={e => handleSetValue(e, setName)}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is the planned date for this goal?"}
                                    required
                                    textField={
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
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
                                <br />
                                Let's get into more spcific details. If you don't know the total amount, then you can skip the final amount and we can
                                calculate the amount for you
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item sm={4}>
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

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is your current amount towards this goal?"}
                                    required
                                    textField={
                                        <TextField
                                            value={currentAmount}
                                            required
                                            onChange={e => handleSetValue(e, setCurrentAmount)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What will your monthly contribution be towards this goal?"}
                                    required
                                    textField={
                                        <TextField
                                            value={monthlyContribution}
                                            required
                                            onChange={e => handleSetValue(e, setMonthlyContribution)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <br />
                                Finally, let's gather details about the college and student
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <FormControl className={classes.select}>
                                    <VerticalSelect
                                        header={"What is the type of the college?"}
                                        required
                                        select={
                                            <Select
                                                required
                                                value={type}
                                                onChange={e => setType(e.target.value)}
                                            >
                                                {
                                                    types.map(t => {
                                                        return (
                                                            <MenuItem key={t} value={t}>{GOAL_COLLEGE_TYPE_MAPPING[t.toUpperCase()]}</MenuItem>
                                                        );
                                                    })
                                                }
                                            </Select>}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is the cost per year?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            value={costPerYear}
                                            onChange={e => handleSetValue(e, setCostPerYear)}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"What is the student's age?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            value={studentAge}
                                            onChange={e => handleSetValue(e, setStudentAge)}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm={4}>
                                <VerticalTextField
                                    header={"How many years is the student attending college for?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            value={years}
                                            onChange={e => handleSetValue(e, setYears)}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <VerticalTextField
                                    header={"What is the name of this college?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            value={collegeName}
                                            onChange={e => handleSetValue(e, setCollegeName)}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm>
                                <VerticalTextField
                                    header={"What is the annual cost of tuition increase?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            value={annualCostIncrease}
                                            onChange={e => handleSetValue(e, setAnnualCostIncrease)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">%</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm>
                                <VerticalTextField
                                    header={"At what age is the student starting college?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            value={beginningCollegeAge}
                                            onChange={e => handleSetValue(e, setBeginningCollegeAge)}
                                        />
                                    } />
                            </Grid>
                        </Grid>

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