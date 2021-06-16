import React, { useState } from 'react';
import { connect } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { RectSkeleton } from '../Common/Sekeleton';
import { H1Alt6 } from '../../style/common';
import { commonStyles, SquarePaper } from '../../style/mui';
import { PROFILE_UPSERT_ADDRESS } from '../../constants/actionTypes';
import agent from '../../agent';


const mapStateToProps = state => ({
    ...state.profile,
    inProgressAddressUpsert: state.profile.inProgressAddressUpsert,
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (address) =>
        dispatch({ type: PROFILE_UPSERT_ADDRESS, payload: agent.User.profilePhysicalAddressUpsert(address) })
});

const AddressView = props => {
    if (props.profile) {
        const classes = commonStyles();

        const physicalAddress = props.profile.physicalAddress;
        const inProgress = props.inProgressAddressUpsert;

        const defaultValue = "";
        const localStreetLine1 = physicalAddress ? physicalAddress.streetLine1 || defaultValue : defaultValue;
        const localStreetLine2 = physicalAddress ? physicalAddress.streetLine2 || defaultValue : defaultValue;
        const localCity = physicalAddress ? physicalAddress.city || defaultValue : defaultValue;
        const localState = physicalAddress ? physicalAddress.state || defaultValue : defaultValue;
        const localZipCode = physicalAddress ? physicalAddress.zipCode || defaultValue : defaultValue;
        const localCountry = physicalAddress ? physicalAddress.country || defaultValue : defaultValue;

        const [streetLine1, setStreetLine1] = useState(localStreetLine1);
        const [streetLine2, setStreetLine2] = useState(localStreetLine2);
        const [city, setCity] = useState(localCity);
        const [state, setState] = useState(localState);
        const [zipCode, setZipCode] = useState(localZipCode);
        const [country, setCountry] = useState(localCountry);
        const [isUpdated, setIsUpdated] = useState(false);

        const handleIsUpdated = (currentFieldValue, newFieldValue) => {
            if (currentFieldValue !== newFieldValue) {
                setIsUpdated(false);
            } else {
                setIsUpdated(true);
            }
        }

        const onSubmitForm = ev => {
            ev.preventDefault();

            var address = {};
            address.streetLine1 = streetLine1 ? streetLine1 : null;
            address.streetLine2 = streetLine2 ? streetLine2 : null;
            address.city = city ? city : null;
            address.state = state ? state : null;
            address.zipCode = zipCode ? zipCode : null;
            address.country = country ? country : null;

            props.onSubmit(address);
        };

        return (
            <React.Fragment>
                <Container maxWidth="md">
                    <form noValidate autoComplete="off" onSubmit={onSubmitForm}>
                        <SquarePaper variant="outlined" square>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <H1Alt6>Physical address</H1Alt6>
                                    <div className={classes.altText}>
                                        {physicalAddress ?
                                            <React.Fragment>
                                                {localStreetLine1}
                                                {physicalAddress.streetLine2 ? `, ${physicalAddress.streetLine2}` : null}<br />
                                                {physicalAddress.city}, {physicalAddress.state} {physicalAddress.zipCode}
                                            </React.Fragment>
                                            : "Please fill out the form below to add your physical address"}
                                    </div>
                                </Grid>
                            </Grid>
                        </SquarePaper>

                        {
                            inProgress
                                ? <RectSkeleton height={300} />
                                :
                                <SquarePaper variant="outlined" square>
                                    <Grid container spacing={3}>
                                        <Grid item xs>
                                            <b>Street Line 1</b>
                                            <TextField
                                                fullWidth
                                                value={streetLine1}
                                                placeholder="123 Main Street"
                                                onChange={e => setStreetLine1(e.target.value)}
                                                onFocus={e => handleIsUpdated(localStreetLine1, e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs>
                                            <b>Street Line 2</b>
                                            <TextField
                                                fullWidth
                                                value={streetLine2}
                                                placeholder="101"
                                                onChange={e => setStreetLine2(e.target.value)}
                                                onFocus={e => handleIsUpdated(localStreetLine2, e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item xs>
                                            <b>City</b>
                                            <TextField
                                                fullWidth
                                                value={city}
                                                placeholder="Charlotte"
                                                onChange={e => setCity(e.target.value)}
                                                onFocus={e => handleIsUpdated(localCity, e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs>
                                            <b>State</b>
                                            <TextField
                                                fullWidth
                                                value={state}
                                                placeholder="NC"
                                                onChange={e => setState(e.target.value)}
                                                onFocus={e => handleIsUpdated(localState, e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item xs>
                                            <b>Zip Code</b>
                                            <TextField
                                                fullWidth
                                                value={zipCode}
                                                placeholder="28210"
                                                onChange={e => setZipCode(e.target.value)}
                                                onFocus={e => handleIsUpdated(localZipCode, e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs>
                                            <b>Country</b>
                                            <TextField
                                                fullWidth
                                                value={country}
                                                placeholder="USA"
                                                onChange={e => setCountry(e.target.value)}
                                                onFocus={e => handleIsUpdated(localCountry, e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </SquarePaper>
                        }

                        <SquarePaper variant="outlined" square>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="outlined"
                                        disabled={!isUpdated}>
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </SquarePaper>
                    </form>
                </Container>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressView);