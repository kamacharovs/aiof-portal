import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FunctionsTwoToneIcon from '@material-ui/icons/FunctionsTwoTone';
import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import UpdateTwoToneIcon from '@material-ui/icons/UpdateTwoTone';
import QueryBuilderTwoToneIcon from '@material-ui/icons/QueryBuilderTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import AssessmentTwoToneIcon from '@material-ui/icons/AssessmentTwoTone';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import MoneyIcon from '@material-ui/icons/Money';

import { DefaultColor } from '../style/common';


const mapStateToProps = state => {
  return {
    currentUser: state.common.currentUser
  }
};

const mapDispatchToProps = dispatch => ({
});

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  button: {
    color: DefaultColor
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

const AppMenu = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fiCalculatorsOpen, setCalculatorsOpen] = useState(false);
  const [assetOpen, setAssetOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleFiCalculatorsOpen = () => {
    setCalculatorsOpen(!fiCalculatorsOpen)
  }
  const handleAssetClick = () => {
    setAssetOpen(!assetOpen);
  };
  const handlePropertyOpen = () => {
    setPropertyOpen(!propertyOpen);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton
        className={classes.button}
        aria-label="open drawer"
        onClick={handleOpen}
        edge="start"
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        className={classes.drawer}
        variant="temporary"
        open={open}
        onClose={handleClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key="time-to-fi" component={Link} to="/">
              <ListItemIcon><CreditCardIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>

          <Divider />

          <List subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Retirement
              </ListSubheader>
          }>
              <ListItem button component={Link} to="/retirement/common/investments">
                <ListItemIcon>
                  <MoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Common investments" />
              </ListItem>
          </List>

          <Divider />

          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Financial Independence
              </ListSubheader>
            }>
            <ListItem button onClick={handleFiCalculatorsOpen}>
              <ListItemIcon>
                <FunctionsTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Calculators" />
              {fiCalculatorsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={fiCalculatorsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} component={Link} to="/fi/time">
                  <ListItemIcon>
                    <QueryBuilderTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Time" />
                </ListItem>

                <ListItem button className={classes.nested} component={Link} to="/fi/added/time">
                  <ListItemIcon>
                    <UpdateTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Added time" />
                </ListItem>

                <ListItem button className={classes.nested} component={Link} to="/fi/compound/interest">
                  <ListItemIcon>
                    <TrendingUpTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Compound interest" />
                </ListItem>

                <ListItem button className={classes.nested} component={Link} to="/fi/bmi">
                  <ListItemIcon>
                    <DirectionsRunIcon />
                  </ListItemIcon>
                  <ListItemText primary="BMI" />
                </ListItem>

                <ListItem button className={classes.nested} component={Link} to="/fi/coast/savings">
                  <ListItemIcon>
                    <BeachAccessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Coast FIRE" />
                </ListItem>
              </List>
            </Collapse>
          </List>

          <Divider />

          <List
            subheader={
              <ListSubheader component="div">
                Property
              </ListSubheader>
            }>
            <ListItem button onClick={handlePropertyOpen}>
              <ListItemIcon>
                <FunctionsTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Calculators" />
              {propertyOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={propertyOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                <ListItem button className={classes.nested} component={Link} to="/property/mortgage">
                  <ListItemIcon>
                    <HomeTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mortgage" />
                </ListItem>

              </List>
            </Collapse>
          </List>

          <Divider />

          {props.currentUser ?
            <List
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Finances
              </ListSubheader>
              }>
              <ListItem button onClick={handleAssetClick}>
                <ListItemIcon>
                  <HomeTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Asset" />
                {assetOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={assetOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                  <ListItem button className={classes.nested} component={Link} to="/asset/breakdown">
                    <ListItemIcon>
                      <AssessmentTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Breakdown" />
                  </ListItem>

                </List>
              </Collapse>
            </List>
            : null}
        </div>
      </Drawer>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);