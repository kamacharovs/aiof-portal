import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { SquarePaper, AiofVerticalTabs, AiofVerticalTab } from '../../style/mui';
import {
    REDIRECT_LOGIN, PROFILE_GET_USER_PROFILE, PROFILE_UPSERT_USER_PROFILE, PROFILE_GET_OPTIONS,
    USER_DEPENDENTS, USER_DEPENDENT_RELATIONSHIPS, USER_DEPENDENT_ADD, USER_DEPENDENT_DELETE
} from '../../constants/actionTypes';
import { success, error } from '../Common/AiofToast';
import Dependents from './Dependents';
import Profile from './Profile';
import AddressView from './Address';


const mapStateToProps = state => ({
    ...state.profile,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.profile.inProgress,
    profile: state.profile.profile,
    options: state.profile.options,
    inProgressDependents: state.profile.inProgressDependents,
    dependents: state.profile.dependents,
    inProgressDependentRelationships: state.profile.inProgressDependentRelationships,
    dependentRelationships: state.profile.dependentRelationships,
    inProgressDependentAdd: state.profile.inProgressDependentAdd,
    dependentAdded: state.profile.dependentAdded,
    inProgressDependentDelete: state.profile.inProgressDependentDelete,
    dependentDeleted: state.profile.dependentDeleted,
});

const mapDispatchToProps = dispatch => ({
    onRedirectLogin: () =>
        dispatch({ type: REDIRECT_LOGIN }),
    onProfile: () =>
        dispatch({ type: PROFILE_GET_USER_PROFILE, payload: agent.User.profile() }),
    onProfileOptions: () =>
        dispatch({ type: PROFILE_GET_OPTIONS, payload: agent.UserProfile.options() }),
    onProfileUpsert: (payload) =>
    {
        dispatch({ type: PROFILE_UPSERT_USER_PROFILE, payload: agent.User.profileUpsert(payload) });
        success(`Successfully updated profile`);
    },
    onDependents: () =>
        dispatch({ type: USER_DEPENDENTS, payload: agent.User.dependents() }),
    onDependentRelationships: () =>
        dispatch({ type: USER_DEPENDENT_RELATIONSHIPS, payload: agent.User.dependentRelationships() }),
    onDependentAdd: (payload) => 
    {
        dispatch({ type: USER_DEPENDENT_ADD, payload: agent.User.dependentAdd(payload) });
        success(`Successfully added dependent`);
    },
    onDependentDelete: (id) =>
    {
        dispatch({ type: USER_DEPENDENT_DELETE, payload: agent.User.dependentDelete(id) });
        error(`Deleted dependent`);
    },
});

const ProfileMainView = props => {
    if (props.currentUser) {
        const [tab, setTab] = useState(0);

        const handleTabChange = (e, newTab) => {
            setTab(newTab);
        };

        useEffect(() => {
            props.onProfile();
            props.onProfileOptions();
            props.onDependents();
            props.onDependentRelationships();
        }, []);

        useEffect(() => {
            if (props.dependents) {
                props.onDependents();
            }
        }, [props.dependentAdded]);

        useEffect(() => {
            if (props.dependents && props.dependentDeleted === true) {
                props.onDependents();
            }
        }, [props.dependentDeleted]);

        const handleOnDependentAdd = (payload) => {
            props.onDependentAdd(payload);
        }
        const handleOnDependentDelete = (id) => {
            props.onDependentDelete(id);
        }
        const handleOnProfileUpsert = (payload) => {
            props.onProfileUpsert(payload);
        }

        const tabs = {
            0: <Profile
                currentUser={props.currentUser}
                profile={props.profile}
                options={props.options}
                onProfileUpsert={handleOnProfileUpsert}
                inProgress={props.inProgress} />,
            1: <AddressView
                />,
            2: <Dependents
                dependents={props.dependents}
                dependentRelationships={props.dependentRelationships}
                handleOnAdd={handleOnDependentAdd}
                handleOnDelete={handleOnDependentDelete}
                inProgressDependents={props.inProgressDependents}
                inProgressDependentRelationships={props.inProgressDependentRelationships}
                inProgressDependentAdd={props.inProgressDependentAdd}
                inProgressDependentDelete={props.inProgressDependentDelete} />
        }

        return (
            <React.Fragment>
                <Helmet>
                    <title>{props.appName} | Profile</title>
                </Helmet>

                <Container maxWidth="md">
                    <SquarePaper variant="outlined" square>
                        <Grid container spacing={3}>
                            <Grid item sm={2} style={{ paddingRight: 0 }}>
                                <AiofVerticalTabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={tab}
                                    onChange={handleTabChange}
                                    aria-label="profile tabs"
                                    stype={{ padding: 0 }}
                                >
                                    <AiofVerticalTab label="Profile" />
                                    <AiofVerticalTab label="Address" />
                                    <AiofVerticalTab label="Dependents" />
                                </AiofVerticalTabs>
                            </Grid>
                            <Grid item sm style={{ paddingLeft: 1 }}>
                                {tabs[tab] || null}
                            </Grid>
                        </Grid>
                    </SquarePaper>
                </Container>
            </React.Fragment>
        );
    } else {
        props.onRedirectLogin();
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMainView);