import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader'

import CreditCardIcon from '@mui/icons-material/CreditCard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FunctionsTwoToneIcon from '@mui/icons-material/FunctionsTwoTone';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import UpdateTwoToneIcon from '@mui/icons-material/UpdateTwoTone';
import QueryBuilderTwoToneIcon from '@mui/icons-material/QueryBuilderTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MoneyIcon from '@mui/icons-material/Money';
import CodeIcon from '@mui/icons-material/Code';


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
    display: "flex",
  },
  button: {
    color: theme.palette.text.alt
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  drawerBottomPush: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
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
        size="large">
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
            <ListItem button key="home" component={Link} to="/">
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

        <div className={classes.drawerBottomPush}>
        <List>
            <ListItem button key="developer" component={Link} to="/developer">
              <ListItemIcon><CodeIcon /></ListItemIcon>
              <ListItemText primary="Developer" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);