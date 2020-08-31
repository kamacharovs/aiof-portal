import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../agent';
import FinanceList from './FinanceList';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';
import { Subscriptions } from './Finance/Subscriptions';

import '../style/tabs.css';
import { ContainerAiof, CustomHr, Hr50, MutedH2 } from '../style/common';

const UserInfo = {
  textAlign: "center",
  background: "#f3f3f3",
  display: "block",
  paddingTop: "5rem",
  paddingBottom: "2.5rem",
  fontWeight: "700",
  lineHeight: "1.5",
  color: "#212529",
}

const EditProfileSettings = props => {
  if (props.isUser
    && props.username) {
    return (
      <Link
        to={`/@${props.username}/settings`}
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

const ProfileMain = props => {
  const profile = props.profile;
  const innerProfile = profile.profile;

  const gender = innerProfile ? innerProfile.gender : null;
  const dateOfBirth = innerProfile ? innerProfile.profiledateOfBirth : null;
  const age = innerProfile ? innerProfile.age : null;
  const maritalStatus = innerProfile ? innerProfile.maritalStatus : null;
  const occupation = innerProfile ? innerProfile.occupation : null;
  const occupationIndustry = innerProfile ? innerProfile.occupationIndustry : null;
  const grossSalary = innerProfile ? innerProfile.grossSalary : null;
  const educationLevel = innerProfile ? innerProfile.educationLevel : null;
  const residentialStatus = innerProfile ? innerProfile.residentialStatus : null;
  const householdIncome = innerProfile ? innerProfile.householdIncome : null;
  const householdAdults = innerProfile ? innerProfile.householdAdults : null;
  const householdChildren = innerProfile ? innerProfile.householdChildren : null;
  const retirementContributionsPreTax = innerProfile ? innerProfile.retirementContributionsPreTax : null;

  return (
    <Container fluid>
      <h1>Profile</h1>
      <p className="text-muted">
        Tell us about yourself so we can improve the financial advice we provide
      </p>
      <br />
      <h2>About Me</h2>
      <Hr50 />

      <Row>
        <Col xs="6">
          Gender
                </Col>
        <Col xs="6">
          <b>{gender}</b>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          Date of birth
                </Col>
        <Col xs="6">
          <b>{dateOfBirth}</b>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          Age
                </Col>
        <Col xs="6">
          <b>{age}</b>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          Marital status
                </Col>
        <Col xs="6">
          <b>{maritalStatus}</b>
        </Col>
      </Row>
      <Hr50 />

      <Row>
        <Col xs="6">
          Occupation
                </Col>
        <Col xs="6">
          <b>{occupation}</b>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          Occupation industry
                </Col>
        <Col xs="6">
          <b>{occupationIndustry}</b>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          Gross salary
                </Col>
        <Col xs="6">
          <b>{grossSalary}</b>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          Education level
                </Col>
        <Col xs="6">
          <b>{educationLevel}</b>
        </Col>
      </Row>
      <Hr50 />

      <Row>
        <Col xs="6">
          Residential status
                </Col>
        <Col xs="6">
          <b>{residentialStatus}</b>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          Household income
                </Col>
        <Col xs="6">
          <b>{householdIncome}</b>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          Household adults
                </Col>
        <Col xs="6">
          <b>{householdAdults}</b>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          Household children
                </Col>
        <Col xs="6">
          <b>{householdChildren}</b>
        </Col>
      </Row>
      <Hr50 />

      <Row>
        <Col sm="6">
          Retirement contributions pre-tax
                </Col>
        <Col sm="6">
          <b>{retirementContributionsPreTax}</b>
        </Col>
      </Row>
      <Hr50 />
    </Container>
  );
};

const mapStateToProps = state => ({
  ...state.profile,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

class Profile extends React.Component {
  componentDidMount() {
    if (this.props.currentUser) {
      this.props.onLoad(Promise.all([
        agent.UserProfile.get(this.props.currentUser.username)
      ]));
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const profile = this.props.profile;

    if (!this.props.currentUser) {
      return null;
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} | Profile</title>
        </Helmet>
        <div style={UserInfo}>
          <Container>
            <Row>
              <Col xs="12">

                <h4>{profile.lastName}, {profile.firstName}</h4>
                <p>{profile.email}</p>

                <EditProfileSettings username={profile.username} isUser={profile} />

              </Col>
            </Row>
          </Container>
        </div>
        <ContainerAiof>
          <Tabs>
            <TabList>
              <MutedH2>Settings</MutedH2>
              <CustomHr />
              <Tab>Profile</Tab>
              <Tab>Finances</Tab>
              <Tab>Notifications</Tab>
              <Tab>Subscriptions</Tab>
            </TabList>
            <TabPanel>
              <ProfileMain profile={profile} />
            </TabPanel>
            <TabPanel>
              <ProfileFinanceList profile={profile} />
            </TabPanel>
            <TabPanel>
              <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel>
              <Subscriptions subscriptions={profile.subscriptions} />
            </TabPanel>
          </Tabs>
        </ContainerAiof>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
