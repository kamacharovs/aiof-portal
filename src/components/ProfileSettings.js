import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import agent from '../agent';
import { connect } from 'react-redux';
import Select from 'react-select';
import ListErrors from './ListErrors';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';
import { TinyFormLabel } from '../style/common';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const maritalStatusOptions = [
  { value: 'Single', label: 'Single' },
  { value: 'Married', label: 'Married' },
  { value: 'Living together', label: 'Living together' },
  { value: 'No longer married', label: 'No longer married' },
]

const householdAdultsOptions = [
  { value: '0', label: '0 Adults' },
  { value: '1', label: '1 Adult' },
  { value: '2', label: '2 Adults' },
  { value: '3', label: '3 Adults' },
  { value: '4', label: '4 Adults' },
  { value: '5', label: '5 Adults' },
  { value: '6', label: '6+ Adults' },
]
const householdChildrenOptions = [
  { value: '0', label: '0 Children' },
  { value: '1', label: '1 Child' },
  { value: '2', label: '2 Children' },
  { value: '3', label: '3 Children' },
  { value: '4', label: '4 Children' },
  { value: '5', label: '5 Children' },
  { value: '6', label: '6+ Children' },
]

class ProfileSettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      gender: '',
      maritalStatus: '',
      occupation: null,
      occupationIndustry: null,
      grossSalary: null,
      educationLevel: '',
      householdIncome: null,
      householdAdults: '',
      householdChildren: '',
      retirementContributionsPreTax: null,
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };
    this.updateSelectState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.value });
      this.setState(newState);
    };

    this.handleGenderChange = gender => {
      this.setState(
        { gender }
      );
    };
    this.handleMaritalStatusChange = maritalStatus => {
      this.setState(
        { maritalStatus }
      );
    };
    this.handleHouseholdAdultsChange = householdAdults => {
      this.setState(
        { householdAdults }
      );
    };
    this.handleHouseholdChildrenChange = householdChildren => {
      this.setState(
        { householdChildren }
      );
    }

    this.submitForm = ev => {
      ev.preventDefault();

      const settings = Object.assign({}, this.state);

      settings.gender = settings.gender ? settings.gender.value : null;
      settings.maritalStatus = settings.maritalStatus ? settings.maritalStatus.value : null;
      settings.householdIncome = settings.householdIncome ? Number(settings.householdIncome) : null;
      settings.householdAdults = settings.householdAdults ? parseInt(settings.householdAdults.value, 10) : null;
      settings.householdChildren = settings.householdChildren ? parseInt(settings.householdChildren.value, 10) : null;
      settings.retirementContributionsPreTax = settings.retirementContributionsPreTax ? Number(settings.retirementContributionsPreTax) : null;

      this.props.onSubmitForm(this.props.currentUser.username, settings);
    };
  }

  componentDidMount() {
    if (this.props.currentUser && this.props.profile) {
      Object.assign(this.state, {
        gender: this.props.profile.gender,
        maritalStatus: this.props.profile.maritalStatus,
        occupation: this.props.profile.occupation,
        occupationIndustry: this.props.profile.occupationIndustry,
        grossSalary: this.props.profile.grossSalary,
        educationLevel: this.props.profile.educationLevel,
        householdIncome: this.props.profile.householdIncome,
        householdAdults: this.props.profile.householdAdults,
        householdChildren: this.props.profile.householdChildren,
        retirementContributionsPreTax: this.props.profile.retirementContributionsPreTax,
      });
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.currentUser && nextProps.profile) {
      this.setState(Object.assign({}, this.state, {
        gender: nextProps.profile.gender,
        maritalStatus: nextProps.profile.maritalStatus,
        occupation: nextProps.profile.occupation,
        occupationIndustry: nextProps.profile.occupationIndustry,
        grossSalary: nextProps.profile.grossSalary,
        educationLevel: nextProps.profile.educationLevel,
        householdIncome: nextProps.profile.householdIncome,
        householdAdults: nextProps.profile.householdAdults,
        householdChildren: nextProps.profile.householdChildren,
        retirementContributionsPreTax: nextProps.profile.retirementContributionsPreTax,
      }));
    }
  }

  render() {
    return (
      <Form onSubmit={this.submitForm}>
        <Row>
          <Col sm="4">
            <Form.Group>
              <TinyFormLabel>Gender</TinyFormLabel>
              <Select
                value={this.state.gender}
                onChange={this.handleGenderChange}
                options={genderOptions}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm="4">
            <Form.Group>
              <TinyFormLabel>Occupation</TinyFormLabel>
              <Form.Control type="text"
                value={this.state.occupation}
                onChange={this.updateState('occupation')} />
            </Form.Group>
          </Col>
          <Col sm="4">
            <Form.Group>
              <TinyFormLabel>Occupation industry</TinyFormLabel>
              <Form.Control type="text"
                value={this.state.occupationIndustry}
                onChange={this.updateState('occupationIndustry')} />
            </Form.Group>
          </Col>
        </Row>
        <hr/>

        <Row>
          <Col sm="4">
            <Form.Group>
              <TinyFormLabel>Marital status</TinyFormLabel>
              <Select
                value={this.state.maritalStatus}
                onChange={this.handleMaritalStatusChange}
                options={maritalStatusOptions}
              />
            </Form.Group>
          </Col>
          <Col sm="4">
            <Form.Group>
              <TinyFormLabel>Education level</TinyFormLabel>
              <Form.Control type="text"
                value={this.state.educationlevel}
                onChange={this.updateState('educationlevel')} />
            </Form.Group>
          </Col>
        </Row>
        <hr/>

        <Row>
          <Col sm="4">
            <Form.Group>
              <TinyFormLabel>Household income</TinyFormLabel>
              <Form.Control type="text"
                value={this.state.householdIncome}
                onChange={this.updateState('householdIncome')}
                placeholder="i.e. 50000" />
              <Form.Text className="text-muted">
                Please provide your total household income
              </Form.Text>
            </Form.Group>
          </Col>
          <Col sm="4">
            <Form.Group>
              <TinyFormLabel>Household Adults</TinyFormLabel>
              <Select
                value={this.state.householdAdults}
                onChange={this.handleHouseholdAdultsChange}
                options={householdAdultsOptions}
              />
            </Form.Group>
          </Col>
          <Col sm="4">
            <Form.Group>
              <TinyFormLabel>Household Children</TinyFormLabel>
              <Select
                value={this.state.householdChildren}
                onChange={this.handleHouseholdChildrenChange}
                options={householdChildrenOptions}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr/>

        <Row>
          <Col sm="4">
          <Form.Group>
              <TinyFormLabel>Retirement contribution</TinyFormLabel>
              <Form.Control type="text"
                value={this.state.retirementContributionsPreTax}
                onChange={this.updateState('retirementContributionsPreTax')}
                placeholder="i.e. 500" />
              <Form.Text className="text-muted">
                Please provide your pre-tax retirement contribution
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="outline-primary" size="sm" type="submit"
          disabled={this.props.inProgress}>
          Update Settings
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser,
  profile: state.profile.profile
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: (username, settings) =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.UserProfile.upsert(username, settings) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

class ProfileSettings extends React.Component {
  render() {
    if (!this.props.currentUser) {
      return null;
    }

    return (
      <div className="settings-page">
        <div className="container page">
          <Row>
            <Col sm="12">

              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors}></ListErrors>

              <ProfileSettingsForm
                currentUser={this.props.currentUser}
                profile={this.props.profile}
                onSubmitForm={this.props.onSubmitForm} />

              <hr />

              <Button variant="outline-danger" size="sm"
                onClick={this.props.onClickLogout}>
                Or click here to logout
              </Button>

            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
