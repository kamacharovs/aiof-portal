import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'

import CreditCardIcon from '@material-ui/icons/CreditCard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const LeftSidebar = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [assetOpen, setAssetOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleAssetClick = () => {
    setAssetOpen(!assetOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key="time-to-fi" component={Link} to="/">
              <ListItemIcon><CreditCardIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>

          <Divider />

          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Financial Independence
              </ListSubheader>
            }>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="FI" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} component={Link} to="/fi/time">
                  <ListItemIcon>
                    <CreditCardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Time" />
                </ListItem>

                <ListItem button className={classes.nested} component={Link} to="/fi/added/time">
                  <ListItemIcon>
                    <CreditCardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Added time" />
                </ListItem>

                <ListItem button className={classes.nested} component={Link} to="/fi/compound/interest">
                  <ListItemIcon>
                    <CreditCardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Compound interest" />
                </ListItem>
              </List>
            </Collapse>
          </List>

          <Divider />

          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Asset
              </ListSubheader>
            }>
            <ListItem button onClick={handleAssetClick}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="Asset" />
              {assetOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={assetOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} component={Link} to="/asset/breakdown">
                  <ListItemIcon>
                    <CreditCardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Breakdown" />
                </ListItem>
              </List>
            </Collapse>
          </List>

        </div>
      </Drawer>
    </div>
  );
}
