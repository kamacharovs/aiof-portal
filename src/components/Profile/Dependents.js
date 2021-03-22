import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { isNumber, numberWithCommas } from '../Finance/Common';
import {
    SquarePaper, AlternateCircularProgress, VerticalTextField,
    AlternateButton, DefaultDarkTeal, DefaultPaperPadding
} from '../../style/mui';


const useStyles = makeStyles((theme) => ({
    avatar: {
        color: 'white',
        backgroundColor: DefaultDarkTeal,
    },
    view: {
        padding: DefaultPaperPadding,
    },
    deleteIconButton: {
        padding: 0
    }
}));

const Dependents = props => {
    const dependents = props.dependents;

    if (props.dependents) {
        const classes = useStyles();
        const totalDependents = dependents.length || 0;

        return (
            <React.Fragment>
                <Container maxWidth="xl">
                    <SquarePaper variant="outlined" square>
                        <CurrentDependentsOverview
                            totalDependents={totalDependents} />

                        <div className={classes.view}>
                            {
                                dependents.map(d => {
                                    return (
                                        <DependentView
                                            key={d.publicKey}
                                            dependent={d}
                                            onDelete={props.handleOnDelete}
                                            inProgressDependentDelete={props.inProgressDependentDelete} />
                                    );
                                })
                            }
                        </div>

                        <AddDependent
                            onAdd={props.handleOnAdd}
                            inProgressDependents={props.inProgressDependents}
                            inProgressDependentAdd={props.inProgressDependentAdd}
                            inProgressDependentDelete={props.inProgressDependentDelete} />

                        <InProgressBar
                            inProgressDependents={props.inProgressDependents}
                            inProgressDependentAdd={props.inProgressDependentAdd}
                            inProgressDependentDelete={props.inProgressDependentDelete} />
                    </SquarePaper>
                </Container>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

const CurrentDependentsOverview = props => {
    const totalDependents = props.totalDependents || 0;

    return (
        <h3>{totalDependents} {totalDependents === 1 ? "dependent" : "dependents"}</h3>
    );
}

const DependentView = props => {
    const dependent = props.dependent;
    const inProgressDependentDelete = props.inProgressDependentDelete;

    if (dependent && !inProgressDependentDelete) {
        const classes = useStyles();

        return (
            <SquarePaper variant="outlined" square>
                <Grid container>
                    <Grid item sm={1}>
                        <Avatar className={classes.avatar}>
                            {dependent.firstName[0]}{dependent.lastName[0]}
                        </Avatar>
                    </Grid>
                    <Grid item sm={10}>
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
                        <IconButton
                            aria-label="delete"
                            className={classes.deleteIconButton}
                            onClick={e => props.onDelete(dependent.id)}>
                            <DeleteIcon style={{ fontSize: '20', color: DefaultDarkTeal }} />
                        </IconButton>
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
    const inProgressDependentAdd = props.inProgressDependentAdd;
    const inProgressDependentDelete = props.inProgressDependentDelete;

    if (!props.inProgressDependents && !inProgressDependentAdd && !inProgressDependentDelete) {
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [age, setAge] = useState(10);
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
                        <Grid container spacing={1}>
                            <Grid item sm>
                                <div style={{ color: DefaultDarkTeal }}>
                                    <h4><strong>Add</strong></h4>
                                </div>
                            </Grid>
                        </Grid>

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
                                <br />
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
                                <br />
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
                                <VerticalTextField
                                    header={"What is your dependent's relationship to you?"}
                                    required
                                    textField={
                                        <TextField
                                            required
                                            placeholder="Son"
                                            value={userRelationship}
                                            onChange={e => handleSetValue(e, setUserRelationship)}
                                        />
                                    } />
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
    if (props.inProgressDependents || props.inProgressDependentAdd || props.inProgressDependentDelete) {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                justify="center"
                alignItems="center">
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

export default Dependents;