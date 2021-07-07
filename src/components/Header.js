import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AppMenu from './AppMenu';
import { HeaderLink, HeaderRightLink } from '../style/mui';
import { LOGOUT } from '../constants/actionTypes';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'
import ExpandMore from '@material-ui/icons/ExpandMore';

import { isCurrentUserAdmin } from "../components/Common/Functions";


const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({ type: LOGOUT }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: '3.25rem'
    },
    header: {
        backgroundColor: theme.palette.background.paper,
    },
    app: {
        flexGrow: 1
    },
    listItemText: {
        fontSize: "12px !important",
    },
    userButton: {
        color: theme.palette.text.alt,
        textTransform: 'capitalize',
    },
}));

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
            <HeaderRightLink to="/login">
                sign in
            </HeaderRightLink>
        );
    }
    return null;
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <ProfileMenu
                currentUser={props.currentUser}
                lastName={props.currentUser.lastName}
                firstName={props.currentUser.firstName}
                onClickLogout={props.onClickLogout} />
        );
    }
    return null;
};

const ProfileMenu = props => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isAdmin = isCurrentUserAdmin(props.currentUser);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Button
                className={classes.userButton}
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                {props.lastName}, {props.firstName} <ExpandMore />
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
                    <ListItem
                        button
                        onClick={handleClose}
                        component={Link}
                        to={`/profile`}>
                        <ListItemText
                            classes={{primary:classes.listItemText}}
                            primary="Profile" />
                    </ListItem>

                    <ListItem
                        button
                        onClick={handleClose}
                        component={Link}
                        to={`/finance`}>
                        <ListItemText 
                            classes={{primary:classes.listItemText}}
                            primary="Finances" />
                    </ListItem>

                    <ListItem
                        button
                        onClick={handleClose}
                        component={Link}
                        to={`/finance/assets`}>
                        <ListItemText 
                            classes={{primary:classes.listItemText}}
                            primary="Assets" />
                    </ListItem>

                    <ListItem
                        button
                        onClick={handleClose}
                        component={Link}
                        to={`/finance/goals`}>
                        <ListItemText 
                            classes={{primary:classes.listItemText}}
                            primary="Goals" />
                    </ListItem>
                </List>

                {isAdmin ? <Divider /> : null}
                {isAdmin
                    ? <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Admin
                            </ListSubheader>
                        }>
                        <ListItem
                            button
                            onClick={handleClose}
                            component={Link}
                            to={`/admin`}>
                            <ListItemText 
                                classes={{primary:classes.listItemText}}
                                primary="Manage" />
                        </ListItem>
                    </List>
                    : null
                }

                <Divider />

                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Other
                        </ListSubheader>
                    }>
                    <ListItem
                        button
                        onClick={handleClose}
                        component={Link}
                        to={`/manage/password`}>
                        <ListItemText 
                            classes={{primary:classes.listItemText}}
                            primary="Password manager" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={props.onClickLogout}>
                        <ListItemText 
                            classes={{primary:classes.listItemText}}
                            primary="Logout" />
                    </ListItem>
                </List>
            </Menu>
        </React.Fragment>
    );
}

const Header = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <AppBar position="fixed" elevation={0} className={classes.header}>
                    <Toolbar variant="dense">
                        <AppMenu
                            currentUser={props.currentUser} />

                        <div className={classes.app}>
                            <HomeView
                                appName={props.appName.toLowerCase()}
                                currentUser={props.currentUser} />
                        </div>

                        <LoggedOutView
                            currentUser={props.currentUser} />

                        <LoggedInView
                            currentUser={props.currentUser}
                            onClickLogout={props.onClickLogout} />
                    </Toolbar>
                </AppBar>
            </div>
        </React.Fragment>
    );
}

export default connect(null, mapDispatchToProps)(Header);