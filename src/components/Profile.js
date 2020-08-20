import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../agent';
import FinanceList from './FinanceList';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';

const LinkStyle = {
  fontSize: "16px"
}

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

const ProfileFinanceList = profile => {
  return (
    <FinanceList
      assets={profile.assets}
      goals={profile.goals}
      liabilities={profile.liabilities} />
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
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.UserProfile.get(this.props.currentUser.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const profile = this.props.profile;
    const currentUser = this.props.currentUser;

    if (!profile) {
      return null;
    }

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <h4>{profile.lastName}, {profile.firstName}</h4>
                <p>{profile.email}</p>

                <EditProfileSettings isUser={profile} />

              </div>
            </div>
          </div>
        </div>

        <Container>
          <Row>
            <Col md="3">
              Settings
              <br />
              <hr />
              <Link to={`/@${currentUser.username}/profile`} className="nav-link active"
                style={LinkStyle}>
                Profile
              </Link>
              <Link to={`/@${currentUser.username}/notifications`} className="nav-link"
                style={LinkStyle}>
                Notifications
              </Link>
              <Link to={`/@${currentUser.username}/finances`} className="nav-link"
                style={LinkStyle}>
                Finances
              </Link>
            </Col>
            <Col>

            <Container>
                <Row>
                    <h1>Profile</h1>
                    <br />
                    <p className="text-muted">
                        Tell us about yourself so we can improve the financial advice we provide
                    </p>
                    <br />
                    <h2>About Me</h2>
                </Row>
                <Row>
                    Gender:
                </Row>
                <hr />
                <Row>
                    Marital Status:
                </Row>
                <hr />
                <Row>
                    Education Level:
                </Row>
                <hr />
                <Row>
                    Gross Salary:
                </Row>
            </Container>

            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
