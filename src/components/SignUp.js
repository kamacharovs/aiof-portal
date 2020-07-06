import React, { Component } from "react";
import './SignUp.css';
import { LinkContainer } from 'react-router-bootstrap';
import Login from './Login';
import { Form, Button } from 'react-bootstrap';
import { Route } from "react-router-dom";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
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

    // Make API call when the Component loads
    async registerUserAsync() {
        await fetch('http://localhost:5000/aiof/user/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.username
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    user: result
                });
            },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
        alert(this.state.user)
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
                                We'll never share your email with anyone else.
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
                            onClick={this.registerUserAsync()} >
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