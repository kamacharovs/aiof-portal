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
      email: ''
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

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        email: this.props.currentUser.email
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        email: nextProps.currentUser.email
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
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button variant="primary" size="lg" type="submit"
          disabled={this.props.inProgress}>
          Update Settings
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: (username, settings) =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.UserProfile.upsert(username, settings) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

class ProfileSettings extends React.Component {
  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors}></ListErrors>

              <ProfileSettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.props.onClickLogout}>
                Or click here to logout.
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
