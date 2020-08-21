import React from 'react';
import { Form, Button } from 'react-bootstrap';
import agent from '../agent';
import { connect } from 'react-redux';
import ListErrors from './ListErrors';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';

class ProfileSettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      occupation: '',
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const settings = Object.assign({}, this.state);
      
      this.props.onSubmitForm(this.props.currentUser.username, settings);
    };
  }

  componentDidMount() {
    if (this.props.currentUser && this.props.profile) {
      Object.assign(this.state, {
        email: this.props.currentUser.email,
        occupation: this.props.profile.occupation,
      });
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.currentUser && nextProps.profile) {
      this.setState(Object.assign({}, this.state, {
        email: nextProps.currentUser.email,
        occupation: nextProps.profile.occupation,
      }));
    }
  }

  render() {
    return (
      <Form onSubmit={this.submitForm}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"
            value={this.state.email}
            onChange={this.updateState('email')} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Occupation</Form.Label>
          <Form.Control type="text"
            value={this.state.occupation}
            onChange={this.updateState('occupation')} />
        </Form.Group>

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
    dispatch({ type: SETTINGS_SAVED, payload: agent.UserProfile.upsert(username, settings)}),
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
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

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

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
