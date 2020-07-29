import React, { Component } from "react";
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Route } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import './SignUp.css';
import Login from './Login';
import { createUser } from "../actions/user";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            confirmEmail: '',
            username: '',
            password: '',
        };
    }

    handleFirstNameChange(e) {
        this.setState({
            firstName: e.target.value,
        });
    };

    handleLastNameChange(e) {
        this.setState({
            lastName: e.target.value,
        });
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value,
        });
    }

    handleConfirmEmailChange(e) {
        this.setState({
            confirmEmail: e.target.value,
        });
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value,
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
    
        if (!this.state.username) {
          return this.setState({ error: 'Username is required' });
        }
    
        if (!this.state.password) {
          return this.setState({ error: 'Password is required' });
        }
    
        this.props.createUser(this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.username
        )
      }

    render() {
        return (
            <>
                <div className="sign-up d-flex justify-content-center">
                    <Form>
                        <Form.Group controlId="signUpFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text"
                                value={this.state.firstName}
                                onChange={e => this.handleFirstNameChange(e)} />
                            <Form.Text className="text-muted">
                                Legal first name
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="signUpLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text"
                                value={this.state.lastName}
                                onChange={e => this.handleLastNameChange(e)} />
                            <Form.Text className="text-muted">
                                Legal last name
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="signUpEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                                value={this.state.email}
                                onChange={e => this.handleEmailChange(e)} />
                            <Form.Text className="text-muted">
                                Email address
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="signUpConfirmEmail">
                            <Form.Label>Confirm Email address</Form.Label>
                            <Form.Control type="email"
                                value={this.state.confirmEmail}
                                onChange={e => this.handleConfirmEmailChange(e)} />
                            <Form.Text className="text-muted">
                                Confirm Email address
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="signUpUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                value={this.state.username}
                                onChange={e => this.handleUsernameChange(e)} />
                            <Form.Text className="text-muted">
                                Unique username
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="signUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                value={this.state.password}
                                onChange={e => this.handlePasswordChange(e)} />
                        </Form.Group>

                        <Button variant="primary" type="submit"
                            onClick={e => this.handleSubmit(e)} >
                            Submit
                        </Button>
                        <p className="forgot-password text-right">
                            Already registered <LinkContainer to="/login"><a href="/login">sign in?</a></LinkContainer>
                        </p>
                    </Form>
                </div>

                <Route path='/login' component={Login} />
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
      username: state.user.username,
      user: state.user.user,
      isCreated: state.user.isCreated
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      createUser: (firstName, lastName, email, username) => {
        dispatch(createUser(firstName, lastName, email, username));
      },
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp);