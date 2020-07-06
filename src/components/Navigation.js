import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
        };
    }

    render() {
        return (
            <>
                <Navbar bg="light" variant="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto"> 
                            <LinkContainer to="/home"><Nav.Link href="/home">Home</Nav.Link></LinkContainer >
                            <LinkContainer to="/login"><Nav.Link href="/login">Login</Nav.Link></LinkContainer >
                            <LinkContainer to="/signup"><Nav.Link href="/signup">Sign up</Nav.Link></LinkContainer >
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Text>
                            {this.state.user?.username ? "Signed in as: <i>" + this.state.user.username + "</i>" : null}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>

                <Route exact path='/home' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={SignUp} />
            </>
        );
    }
}
