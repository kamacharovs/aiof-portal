import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Login from './Login';
import SignUp from './SignUp';

class Navigation extends Component {
    render() {
        return (
            <>
                <Navbar bg="light" variant="light" expand="lg" sticky="top">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/home"><Nav.Link href="/home">Home</Nav.Link></LinkContainer >
                            <LinkContainer to="/portal"><Nav.Link href="/portal">Portal</Nav.Link></LinkContainer >
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ml-auto">
                            {this.props?.isLoggedIn === true ?
                                <Navbar.Text>
                                    Signed in as: <b>{this.props?.username}</b>
                                </Navbar.Text>
                                :
                                <>
                                    <LinkContainer to="/login"><Nav.Link href="/login" >Login</Nav.Link></LinkContainer >
                                    <LinkContainer to="/signup"><Nav.Link href="/signup">Sign up</Nav.Link></LinkContainer >
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Route path='/home' render={() => (this.props?.isLoggedIn ? (this.props?.history.push("/home")) : (<Login />))} />
                <Route path='/portal' render={() => (this.props?.isLoggedIn ? (this.props?.history.push("/portal")) : (<Login />))} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={SignUp} />
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.user.username,
        user: state.user.user,
        isLoggedIn: state.user.isLoggedIn
    };
};

export default connect(
    mapStateToProps
)(Navigation)