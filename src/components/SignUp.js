import React, { Component } from "react";
import './SignUp.css';
import { LinkContainer } from 'react-router-bootstrap';
import Login from './Login';
import { Form, Button } from 'react-bootstrap';
import { Route } from "react-router-dom";

export default class SignUp extends Component {
    render() {
        return (
            <>
                <div class="sign-up d-flex justify-content-center">
                    <Form>
                        <Form.Group controlId="signUpFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" />
                            <Form.Text className="text-muted">
                                Legal first name
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="signUpLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" />
                            <Form.Text className="text-muted">
                                Legal last name
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="signUpEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="signUpUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" />
                            <Form.Text className="text-muted">
                                Unique username
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="signUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
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