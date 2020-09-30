import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  LOGOUT
} from '../constants/actionTypes';
import { HeaderLink } from '../style/common';


const HomeView = props => {
  if (props.currentUser) {
    return (
      <HeaderLink to="/">
        {props.appName}
      </HeaderLink>
    );
  }
  else {
    return (
      <HeaderLink to="/login">
        {props.appName}
      </HeaderLink>
    );
  }
}

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <Nav className="ml-auto">
        <Link to="/login" className="nav-link">Sign in</Link>
      </Nav>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <Nav className="ml-auto">
        <Link to="/login" className="nav-link" onClick={props.onClickLogout}>Log out</Link>
        <Link to={`/@${props.currentUser.username}/finance`} className="nav-link">Finance</Link>
        <Link to={`/@${props.currentUser.username}`} className="nav-link">{props.currentUser.lastName}, {props.currentUser.firstName}</Link>
      </Nav>
    );
  }
  return null;
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
});

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="sm" sticky="top" >
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <HomeView currentUser={this.props.currentUser} appName={this.props.appName.toLowerCase()} />

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} onClickLogout={this.props.onClickLogout} />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(null, mapDispatchToProps)(Header);
