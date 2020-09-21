import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
                    width: theme.spacing(16),
                    height: theme.spacing(16),
                },
            },
        }));
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{this.props.appName} | FI</title>
                </Helmet>
                <div className={this.classes.root}>
                    <Paper elevation={3}>
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FI);