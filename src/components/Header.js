import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  LOGOUT
} from '../constants/actionTypes';
import { HeaderLink } from '../style/common';
import { AppMenu } from './AppMenu';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ExpandMore from '@material-ui/icons/ExpandMore';

import { DefaultColor } from '../style/common';


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
        <ProfileMenu lastName={props.currentUser.lastName} firstName={props.currentUser.firstName} onClickLogout={props.onClickLogout}/>
      </Nav>
    );
  }
  return null;
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  button: {
    color: DefaultColor,
    textTransform: 'capitalize',
  },
}));

const ProfileMenu = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {props.lastName}, {props.firstName} <ExpandMore/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={props.onClickLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="sm" sticky="top" >
      
        <AppMenu />

          <HomeView currentUser={this.props.currentUser} appName={this.props.appName.toLowerCase()} />

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} onClickLogout={this.props.onClickLogout} />
        
      </Navbar>
    );
  }
}

export default connect(null, mapDispatchToProps)(Header);
