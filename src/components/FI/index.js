import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CoolLink } from '../../style/common';
import { FIDrawer } from './Drawer';

const mapStateToProps = state => ({
    ...state.fi,
    appName: state.common.appName,
});

const mapDispatchToProps = dispatch => ({
});

class FI extends React.Component {
    constructor() {
        super();

        this.classes = makeStyles((theme) => ({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                '& > *': {
                    margin: theme.spacing(1),
                    padding: theme.spacing(1),
                    width: theme.spacing(16),
                    height: theme.spacing(16),
                },
            },
        }));
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{this.props.appName} | FI</title>
                </Helmet>
                <Container maxWidth="sm">
                    <div className={this.classes.root}>
                        <Paper elevation={3}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <CoolLink to="/fi/time">Time to FI</CoolLink>
                                        </li>
                                        <li className="nav-item">
                                            <CoolLink to="/fi/compound/interest">Compound Interest</CoolLink>
                                        </li>
                                        <li className="nav-item">
                                            <FIDrawer></FIDrawer>
                                        </li>
                                    </ul>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FI);