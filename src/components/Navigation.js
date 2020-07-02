import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import Login from './Login';
import Home from './Home';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Route } from "react-router-dom";
import { IndexLinkContainer } from 'react-router-bootstrap'

class Navigation extends Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <IndexLinkContainer to="/home"><Navbar.Brand href="#">Home</Navbar.Brand></IndexLinkContainer >
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <IndexLinkContainer to="/login"><Nav.Link href="#">Login</Nav.Link></IndexLinkContainer >
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Text>
                            Signed in as: <a href="#login">Mark Otto</a>
                        </Navbar.Text>
                    </Navbar.Collapse>

                </Navbar>
                <Route exact path='/home' component={Home} />
                <Route path='/login' component={Login} />
            </>
        );
    }
}

export default Navigation;