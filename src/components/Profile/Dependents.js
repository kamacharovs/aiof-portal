import React, { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { isNumber, numberWithCommas } from '../Finance/Common';
import {
    SquarePaper, AlternateCircularProgress, VerticalTextField, VerticalSelect,
    AlternateButton
} from '../../style/mui';
import { RectSkeleton } from '../Common/Sekeleton';


const useStyles = makeStyles((theme) => ({
    avatar: {
        color: 'white',
        backgroundColor: theme.palette.secondary.dark,
    },
    deleteIconButton: {
        padding: 0
    },
    select: {
        minWidth: 'flex',
    },
}));

const Dependents = props => {
    const dependents = props.dependents;

    if (props.dependents) {
        const totalDependents = dependents.length || 0;
        const dependentRelationships = props.dependentRelationships || [];

        return (
            <React.Fragment>
                <Container maxWidth="xl">
                    <CurrentDependentsOverview
                        totalDependents={totalDependents} />

                    {
                        dependents.map(d => {
                            return (
                                <DependentView
                                    key={d.publicKey}
                                    dependent={d}
                                    onDelete={props.handleOnDelete}
                                    inProgressDependents={props.inProgressDependents}
                                    inProgressDependentRelationships={props.inProgressDependentRelationships}
                                    inProgressDependentAdd={props.inProgressDependentAdd}
                                    inProgressDependentDelete={props.inProgressDependentDelete} />
                            );
                        })
                    }

                    <AddDependent
                        dependentRelationships={dependentRelationships}
                        onAdd={props.handleOnAdd}
                        inProgressDependents={props.inProgressDependents}
                        inProgressDependentRelationships={props.inProgressDependentRelationships}
                        inProgressDependentAdd={props.inProgressDependentAdd}
                        inProgressDependentDelete={props.inProgressDependentDelete} />

                    <InProgressBar
                        inProgressDependents={props.inProgressDependents}
                        inProgressDependentRelationships={props.inProgressDependentRelationships}
                        inProgressDependentAdd={props.inProgressDependentAdd}
                        inProgressDependentDelete={props.inProgressDependentDelete} />
                </Container>
            </React.Fragment>
        );
    } else {
        const inProgress = props.inProgressDependents
            || props.inProgressDependentRelationships
            || props.inProgressDependentAdd
            || props.inProgressDependentDelete;

        return (
            <React.Fragment>
                <Container maxWidth="xl">
                    {
                        inProgress
                            ? <React.Fragment>
                                <RectSkeleton height={100} />
                                <RectSkeleton height={400} />
                                <RectSkeleton height={400} />
                            </React.Fragment>
                            : null
                    }
                </Container>
            </React.Fragment>
        );
    }
}

const CurrentDependentsOverview = props => {
    const totalDependents = props.totalDependents || 0;

    return (
        <SquarePaper variant="outlined" square>
            <Typography variant="h1">{totalDependents} {totalDependents === 1 ? "dependent" : "dependents"}</Typography>
        </SquarePaper>
    );
}

const DependentView = props => {
    const theme = useTheme();
    const dependent = props.dependent;
    const inProgressDependents = props.inProgressDependents;
    const inProgressDependentRelationships = props.inProgressDependentRelationships;
    const inProgressDependentAdd = props.inProgressDependentAdd;
    const inProgressDependentDelete = props.inProgressDependentDelete;

    if (dependent && !inProgressDependents && !inProgressDependentAdd
        && !inProgressDependentDelete && !inProgressDependentRelationships) {
        const classes = useStyles();

        return (
            <SquarePaper variant="outlined" square>
                <Grid container>
                    <Grid item sm={2}>
                        <Avatar className={classes.avatar}>
                            {dependent.firstName[0]}{dependent.lastName[0]}
                        </Avatar>
                    </Grid>
                    <Grid item sm={9}>
                        <Grid container
                            spacing={0}
                            direction="column">
                            <Grid item sm>
                                <strong>{dependent.firstName} {dependent.lastName}</strong>
                            </Grid>
                            <Grid item sm>
                                <i>{dependent.userRelationship} ({dependent.age})</i>
                            </Grid>
                            <Grid item sm>
                                <i>${numberWithCommas(dependent.amountOfSupportProvided)} / year</i>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={1}>
                        <Tooltip title="Delete">
                            <IconButton
                                aria-label="delete"
                                className={classes.deleteIconButton}
                                onClick={e => props.onDelete(dependent.id)}
                                size="large">
                                <DeleteIcon style={{ fontSize: '20', color: theme.palette.secondary.dark }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </SquarePaper>
        );
    } else {
        return null;
    }
}

const AddDependent = props => {
    const inProgressDependents = props.inProgressDependents;
    const inProgressDependentRelationships = props.inProgressDependentRelationships;
    const inProgressDependentAdd = props.inProgressDependentAdd;
    const inProgressDependentDelete = props.inProgressDependentDelete;

    if (!inProgressDependents && !inProgressDependentAdd
        && !inProgressDependentDelete && !inProgressDependentRelationships) {
        const dependentRelationships = props.dependentRelationships;
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [age, setAge] = useState("");
        const [email, setEmail] = useState("");
        const [amountOfSupportProvided, setAmountOfSupportProvided] = useState("");
        const [userRelationship, setUserRelationship] = useState("");

        const isAddEnabled = firstName !== ""
            && lastName !== ""
            && isNumber(age)
            && isNumber(amountOfSupportProvided)
            && userRelationship !== "";

        const handleSetValue = (e, setValue) => {
            setValue(e.target.value);
        }

        const onAdd = (ev) => {
            ev.preventDefault();

            let payload = {
                firstName: firstName,
                lastName: lastName,
                age: Number(age),
                email: email || null,
                amountOfSupportProvided: Number(amountOfSupportProvided),
                userRelationship: userRelationship
            }

            props.onAdd(payload);
        }

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <form noValidate autoComplete="off" onSubmit={onAdd}>
                        <Grid container spacing={3}>
                            <Grid item sm>
                                <VerticalTextField
                                    header={"What is the first name of your dependent?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            placeholder="John"
                                            value={firstName}
                                            onChange={e => handleSetValue(e, setFirstName)}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm>
                                <VerticalTextField
                                    header={"What is the last name of your dependent?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            placeholder="Doe"
                                            value={lastName}
                                            onChange={e => handleSetValue(e, setLastName)}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <VerticalTextField
                                    header={"What is the age of your dependent?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            placeholder="10"
                                            value={age}
                                            onChange={e => handleSetValue(e, setAge)}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm>
                                <VerticalTextField
                                    header={"What is the email of your dependent?"}
                                    textField={
                                        <TextField
                                            placeholder="john.doe@email.com"
                                            value={email}
                                            onChange={e => handleSetValue(e, setEmail)}
                                        />
                                    } />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <VerticalTextField
                                    header={"What is the yearly amount of support you provide to your dependent?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            placeholder="15000"
                                            value={amountOfSupportProvided}
                                            onChange={e => handleSetValue(e, setAmountOfSupportProvided)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                        />
                                    } />
                            </Grid>

                            <Grid item sm>
                                <VerticalSelect
                                    header={"What is your dependent's relationship to you?"}
                                    required
                                    select={
                                        <Select
                                            required
                                            value={userRelationship}
                                            onChange={e => handleSetValue(e, setUserRelationship)}
                                        >
                                            {
                                                dependentRelationships.map(dr => {
                                                    return (
                                                        <MenuItem key={dr} value={dr}>{dr}</MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item sm>
                                <AlternateButton type="submit" variant="contained" disabled={!isAddEnabled && !inProgressDependents && !inProgressDependentAdd && !inProgressDependentDelete} >
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

const InProgressBar = props => {
    if (props.inProgressDependents || props.inProgressDependentRelationships
        || props.inProgressDependentAdd || props.inProgressDependentDelete) {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Grid item xs align="center" style={{ marginTop: "1rem" }}>
                    <AlternateCircularProgress />
                </Grid>
            </Grid>
        );
    }
    else {
        return null;
    }
}

export default Dependents;