import React, { useState, useEffect } from 'react';
import 'date-fns';

import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { SquarePaper, AlternateButton, PAlt7 } from '../../style/mui';
import { RectSkeleton } from '../Common/Sekeleton';
import { formatDate, getAge } from '../Finance/Common';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing(1),
    },
    hr: {
        borderTop: '1px solid',
        marginTop: '0.25rem',
        color: '#ebebeb',
        opacity: '90%'
    },
    textField: {
        marginTop: '-6px'
    },
    select: {
        marginTop: '-30px'
    },
    green: {
        color: 'green',
        margin: '0rem',
        padding: '0rem'
    },
    tinyMutedText: {
        color: '#999',
        margin: '0 0 8px',
        fontSize: '12px'
    },
    mutedText: {
        color: '#999',
        margin: '0 0 8px',
        fontSize: '14px'
    }
}));

const Profile = props => {
    const classes = useStyles();
    const empty = "Unspecified";
    const defaultDate = "01/01/1990";
    const zero = "0";
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [age, setAge] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [occupation, setOccupation] = useState("");
    const [occupationIndustry, setOccupationIndustry] = useState("");
    const [grossSalary, setGrossSalary] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [residentialStatus, setResidentialStatus] = useState("");
    const [householdIncome, setHouseholdIncome] = useState("");
    const [householdAdults, setHouseholdAdults] = useState("");
    const [householdChildren, setHouseholdChildren] = useState("");
    const [retirementContributionsPreTax, setRetirementContributionsPreTax] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);

    const educationLevels = props.options ? props.options.educationLevels : [];
    const maritalStatuses = props.options ? props.options.maritalStatuses : [];
    const residentialStatuses = props.options ? props.options.residentialStatuses : [];
    const genders = props.options ? props.options.genders : [];
    const householdAdultsSelect = props.options ? props.options.householdAdults : [];
    const householdChildrenSelect = props.options ? props.options.householdChildren : [];

    const handleSelectChange = (e, setField) => {
        setField(e.target.value);
    }
    const handleDateOfBirthChange = date => {
        setDateOfBirth(date);
        setAge(getAge(date));
        setIsUpdated(true);
    };

    const handleUpdate = () => {
        if (props.currentUser) {
            var payload = {
                gender,
                dateOfBirth,
                age: Number(age),
                maritalStatus,
                occupation,
                occupationIndustry,
                grossSalary: Number(grossSalary),
                educationLevel: educationLevel === "" ? null : educationLevel,
                residentialStatus,
                householdIncome: Number(householdIncome),
                householdAdults: Number(householdAdults),
                householdChildren: Number(householdChildren),
                retirementContributionsPreTax: Number(retirementContributionsPreTax)
            };

            props.onProfileUpsert(payload);
        }
    }

    useEffect(() => {
        if (props.profile && props.options) {
            setGender(props.profile.gender);
            setDateOfBirth(props.profile.dateOfBirth);
            setAge(props.profile.age);
            setMaritalStatus(props.profile.maritalStatus);
            setOccupation(props.profile.occupation);
            setOccupationIndustry(props.profile.occupationIndustry);
            setGrossSalary(props.profile.grossSalary);
            setEducationLevel(props.profile.educationLevel);
            setResidentialStatus(props.profile.residentialStatus);
            setHouseholdIncome(props.profile.householdIncome);
            setHouseholdAdults(props.profile.householdAdults);
            setHouseholdChildren(props.profile.householdChildren);
            setRetirementContributionsPreTax(props.profile.retirementContributionsPreTax);
        }
    }, [props.profile, props.options]);

    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={12}>
                        <Grid container spacing={1} className={classes.root}>
                            <Grid item xs={12}>
                                {
                                    props.inProgress
                                        ? <RectSkeleton height={100} />
                                        :
                                        <SquarePaper variant="outlined" square>
                                            <Typography variant="h1">{props.currentUser.lastName + ", " + props.currentUser.firstName}</Typography>
                                            <PAlt7 className={classes.tinyMutedText}>{formatDate(props.currentUser.created)}</PAlt7>
                                            <PAlt7 className={classes.tinyMutedText}>{props.currentUser.email}</PAlt7>
                                            <br />
                                            <PAlt7>
                                                Tell us about yourself so we can improve the financial advice we provide
                                            </PAlt7>
                                        </SquarePaper>
                                }
                            </Grid>

                            <Grid item xs={12}>
                                {
                                    props.inProgress
                                        ? <RectSkeleton height={400} />
                                        :
                                        <SquarePaper variant="outlined" square>
                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Gender</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Select
                                                        fullWidth
                                                        className={classes.textField}
                                                        value={gender || ""}
                                                        onChange={e => handleSelectChange(e, setGender)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    >
                                                        {
                                                            genders.map(g => {
                                                                return (
                                                                    <MenuItem key={g.publicKey} value={g.name}>{g.name}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </Select>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Date of birth</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker className={classes.textField}
                                                            disableToolbar
                                                            fullWidth
                                                            variant="inline"
                                                            format="MM/dd/yyyy"
                                                            margin="normal"
                                                            value={dateOfBirth ? dateOfBirth : defaultDate}
                                                            onChange={handleDateOfBirthChange}
                                                            onFocus={() => setIsUpdated(true)}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Age</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={age ? Number(age) : zero}
                                                        onChange={e => setAge(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Marital status</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Select
                                                        fullWidth
                                                        className={classes.textField}
                                                        value={maritalStatus || ""}
                                                        onChange={e => handleSelectChange(e, setMaritalStatus)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    >
                                                        {
                                                            maritalStatuses.map(ms => {
                                                                return (
                                                                    <MenuItem key={ms.publicKey} value={ms.name}>{ms.name}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </Select>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Education level</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Select
                                                        fullWidth
                                                        className={classes.textField}
                                                        value={educationLevel || ""}
                                                        onChange={e => handleSelectChange(e, setEducationLevel)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    >
                                                        {
                                                            educationLevels.map(el => {
                                                                return (
                                                                    <MenuItem key={el.publicKey} value={el.name}>{el.name}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </Select>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Residential status</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Select
                                                        fullWidth
                                                        className={classes.textField}
                                                        value={residentialStatus || ""}
                                                        onChange={e => handleSelectChange(e, setResidentialStatus)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    >
                                                        {
                                                            residentialStatuses.map(rs => {
                                                                return (
                                                                    <MenuItem key={rs.publicKey} value={rs.name}>{rs.name}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </Select>
                                                </Grid>
                                            </Grid>
                                        </SquarePaper>
                                }
                            </Grid>

                            <Grid item xs={12}>
                                {
                                    props.inProgress
                                        ? <RectSkeleton height={400} />
                                        :
                                        <SquarePaper variant="outlined" square>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Occupation</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={occupation || empty}
                                                        onChange={e => setOccupation(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Occupation industry</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={occupationIndustry || empty}
                                                        onChange={e => setOccupationIndustry(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Gross salary</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={grossSalary ? Number(grossSalary) : zero}
                                                        onChange={e => setGrossSalary(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Household income</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={householdIncome ? Number(householdIncome) : zero}
                                                        onChange={e => setHouseholdIncome(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Household adults</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Select
                                                        fullWidth
                                                        className={classes.textField}
                                                        value={householdAdults || ""}
                                                        onChange={e => handleSelectChange(e, setHouseholdAdults)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    >
                                                        {
                                                            householdAdultsSelect.map(hha => {
                                                                return (
                                                                    <MenuItem key={hha.publicKey} value={hha.value}>{hha.name}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </Select>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Household children</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Select
                                                        fullWidth
                                                        className={classes.textField}
                                                        value={householdChildren || ""}
                                                        onChange={e => handleSelectChange(e, setHouseholdChildren)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    >
                                                        {
                                                            householdChildrenSelect.map(hhc => {
                                                                return (
                                                                    <MenuItem key={hhc.publicKey} value={hhc.value}>{hhc.name}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </Select>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Retirement contributions pre tax</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={retirementContributionsPreTax ? Number(retirementContributionsPreTax) : zero}
                                                        onChange={e => setRetirementContributionsPreTax(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </SquarePaper>
                                }
                            </Grid>

                            <Grid item xs={12}>
                                {
                                    props.inProgress
                                        ? <RectSkeleton height={100} />
                                        :
                                        <SquarePaper variant="outlined" square>
                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <AlternateButton 
                                                        variant="contained" 
                                                        disabled={!isUpdated} 
                                                        onClick={handleUpdate}>
                                                        Update
                                                    </AlternateButton>
                                                </Grid>

                                                <Grid item xs={6}>
                                                </Grid>
                                            </Grid>
                                        </SquarePaper>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default Profile;