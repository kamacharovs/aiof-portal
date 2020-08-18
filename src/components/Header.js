import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const bg = "dark"
const variant = "dark"
const pullright = "true"
const navbarStyle = {"border-radius": "0"}

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <Nav pullright={pullright}>
        <Nav className="mr-auto">
          <Link to="/login" className="nav-link">Sign in</Link>
          <Link to="/register" className="nav-link">Sign up</Link>
        </Nav>
      </Nav>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <Nav pullright={pullright}>
        <Nav className="mr-auto">
          <Link to="/editor" className="nav-link"><i className="ion-compose"></i>&nbsp;New Post</Link>
          <Link to="/settings" className="nav-link"><i className="ion-gear-a"></i>&nbsp;Settings</Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
          <Link to={`/@${props.currentUser.username}`} className="nav-link"> {props.currentUser.username}</Link>
        </Nav>
      </Nav>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <Navbar bg={bg} variant={variant} expand="sm" sticky="top" style={navbarStyle} >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <div className="container">

            <Link to="/" className="navbar-brand">
              {this.props.appName.toLowerCase()}
            </Link>

            <LoggedOutView currentUser={this.props.currentUser} />

            <LoggedInView currentUser={this.props.currentUser} />

          </div>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
