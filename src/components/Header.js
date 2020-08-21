import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const bg = "dark"
const variant = "dark"
const pullright = "true"
const navbarStyle = {"borderRadius": "0"}

const HomeView = props => {
  if (props.currentUser) {
    return (
      <Link to="/" className="navbar-brand">
        {props.appName}
      </Link>
    );
  }
  else {
    return (
      <Link to="/login" className="navbar-brand">
        {props.appName}
      </Link>
    );
  }
}

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
          <Link to={`/@${props.currentUser.username}`} className="nav-link"> {props.currentUser.lastName}, {props.currentUser.firstName}</Link>
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

            <HomeView currentUser={this.props.currentUser} appName={this.props.appName.toLowerCase()} />

            <LoggedOutView currentUser={this.props.currentUser} />

            <LoggedInView currentUser={this.props.currentUser} />

          </div>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
