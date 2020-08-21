import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../agent';
import FinanceList from './FinanceList';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';

import '../style/tabs.css';
import { CustomHr, MutedH2 } from '../style/common';



const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const ProfileFinanceList = props => {
  return (
    <FinanceList
      assets={props.profile.assets}
      goals={props.profile.goals}
      liabilities={props.profile.liabilities} />
  );
};

const mapStateToProps = state => ({
  ...state.profile,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

class Profile extends React.Component {

  componentDidMount() {
    this.props.onLoad(Promise.all([
      agent.UserProfile.get(this.props.currentUser.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const profile = this.props.profile;
    const innerProfile = profile.profile;

    if (!profile) {
      return null;
    }

    var profilegender = innerProfile ? innerProfile.gender : null;
    var profiledateOfBirth = innerProfile ? innerProfile.profiledateOfBirth : null;
    var profileage = innerProfile ? innerProfile.age : null;
    var profileoccupation = innerProfile ? innerProfile.occupation : null;
    var profileoccupationIndustry = innerProfile ? innerProfile.occupationIndustry : null;
    var profilegrossSalary = innerProfile ? innerProfile.grossSalary : null;
    var profilemaritalStatus = innerProfile ? innerProfile.maritalStatus : null;
    var profileeducationLevel = innerProfile ? innerProfile.educationLevel : null;
    var profileresidentialStatus = innerProfile ? innerProfile.residentialStatus : null;
    var profilehouseholdIncome = innerProfile ? innerProfile.householdIncome : null;
    var profilehouseholdAdults = innerProfile ? innerProfile.householdAdults : null;
    var profilehouseholdChildren = innerProfile ? innerProfile.householdChildren : null;
    var profileretirementContributionsPreTax = innerProfile ? innerProfile.retirementContributionsPreTax : null;

    return (
      <div className="profile-page">

        <div className="user-info">
          <Container>
            <Row>
              <Col xs="12">

                <h4>{profile.lastName}, {profile.firstName}</h4>
                <p>{profile.email}</p>

                <EditProfileSettings isUser={profile} />

              </Col>
            </Row>
          </Container>
        </div>
        <div className="container page">
          <Tabs>
            <TabList>
              <MutedH2>Settings</MutedH2>
              <CustomHr/>
              <Tab>Profile</Tab>
              <Tab>Finances</Tab>
              <Tab>Notifications</Tab>
            </TabList>

            <TabPanel>
              <h1>Profile</h1>
              <p className="text-muted">
                Tell us about yourself so we can improve the financial advice we provide
              </p>
              <br/>
              <h2>About Me</h2>
              <Row>
                <Col sm="6">
                  Gender: <br/>
                  Date of birth: <br/>
                  Age: <br/>
                  Marital status: 
                </Col>
                <Col sm="6">
                  <b>{profilegender}</b><br/>
                  <b>{profiledateOfBirth}</b><br/>
                  <b>{profileage}</b><br/>
                  <b>{profilemaritalStatus}</b>
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  Occupation: <br/>
                  Occupation industry: <br/>
                  Gross salary: <br/>
                  Education level: 
                </Col>
                <Col sm="6">
                  <b>{profileoccupation}</b><br/>
                  <b>{profileoccupationIndustry}</b><br/>
                  <b>{profilegrossSalary}</b><br/>
                  <b>{profileeducationLevel}</b>
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  Residential status: <br/>
                  Household income: <br/>
                  Household adults: <br/>
                  Household children: 
                </Col>
                <Col sm="6">
                  <b>{profileresidentialStatus}</b><br/>
                  <b>{profilehouseholdIncome}</b><br/>
                  <b>{profilehouseholdAdults}</b><br/>
                  <b>{profilehouseholdChildren}</b>
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  Retirement contributions pre-tax:
                </Col>
                <Col sm="6">
                  <b>{profileretirementContributionsPreTax}</b>
                </Col>
              </Row>
              
              <hr />       
            </TabPanel>
            <TabPanel>
              <ProfileFinanceList profile={profile} />
            </TabPanel>
            <TabPanel>
              <h2>Any content 1</h2>
            </TabPanel>
          </Tabs>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
