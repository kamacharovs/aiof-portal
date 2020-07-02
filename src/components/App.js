import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import Login from './Login';
import Home from './Home';
import { Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Route } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

export default function App() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <LinkContainer to="/home"><Navbar.Brand href="">Home</Navbar.Brand></LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/login"><Nav.Link href="">Login</Nav.Link></LinkContainer>
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
      <Route exact path='/home' component={Home} />
      <Route path='/login' component={Login} />
    </Navbar>
  );
}
