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
import FunctionsTwoToneIcon from '@material-ui/icons/FunctionsTwoTone';
import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import UpdateTwoToneIcon from '@material-ui/icons/UpdateTwoTone';
import QueryBuilderTwoToneIcon from '@material-ui/icons/QueryBuilderTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import AssessmentTwoToneIcon from '@material-ui/icons/AssessmentTwoTone';


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
  const [fiCalculatorsOpen, setCalculatorsOpen] = React.useState(true);
  const [assetOpen, setAssetOpen] = React.useState(true);

  const handleFiCalculatorsOpen = () => {
    setCalculatorsOpen(!fiCalculatorsOpen)
  }
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
              </List>
            </Collapse>
          </List>

          <Divider />

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

        </div>
      </Drawer>
    </div>
  );
}
