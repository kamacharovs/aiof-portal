import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AppMenu from './AppMenu';
import { LOGOUT } from '../constants/actionTypes';
import { HeaderLink, HeaderRightLink } from '../style/common';
import { DefaultColor } from '../style/common';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'
import ExpandMore from '@material-ui/icons/ExpandMore';


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
        <HeaderRightLink to="/login">
          Sign in
        </HeaderRightLink>
      </Nav>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <Nav className="ml-auto">
        <ProfileMenu currentUser={props.currentUser} lastName={props.currentUser.lastName} firstName={props.currentUser.firstName} onClickLogout={props.onClickLogout}/>
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
    <React.Fragment>
      <Button className={classes.button} aria-controls="user-menu" aria-haspopup="true" onClick={handleClick}>
        {props.lastName}, {props.firstName} <ExpandMore/>
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Account management
              </ListSubheader>
            }>
            <ListItem button onClick={handleClose} component={Link} to={`/@${props.currentUser.username}`}>
              <ListItemText primary="Profile" />
            </ListItem>

            <ListItem button onClick={handleClose} component={Link} to={`/@${props.currentUser.username}/finance`}>
              <ListItemText primary="Finances" />
            </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem button onClick={props.onClickLogout}>
              <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Menu>
    </React.Fragment>
  );
}

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="sm" sticky="top">
      
          <AppMenu />

          <HomeView currentUser={this.props.currentUser} appName={this.props.appName.toLowerCase()} />

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} onClickLogout={this.props.onClickLogout} />
        
      </Navbar>
    );
  }
}

export default connect(null, mapDispatchToProps)(Header);