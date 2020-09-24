import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const anchor = 'left';

export const FIDrawer = props => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button key="time-to-fi" component={Link} to="/fi/time">
                    <ListItemIcon><CreditCardIcon /></ListItemIcon>
                    <ListItemText primary="Time to FI" />
                </ListItem>

                <ListItem button key="compound-interest" component={Link} to="/fi/compound/interest">
                    <ListItemIcon><CreditCardIcon /></ListItemIcon>
                    <ListItemText primary="Compound interest" />
                </ListItem>
                
                <ListItem button key="added-time" component={Link} to="/fi/added/time">
                    <ListItemIcon><CreditCardIcon /></ListItemIcon>
                    <ListItemText primary="Added time" />
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    return (
        <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(true)} style={{color: props.color, fontSize: "0.75rem"}}>FI calculators</Button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(false)}>
                {list}
            </Drawer>
        </React.Fragment>
    );
}
