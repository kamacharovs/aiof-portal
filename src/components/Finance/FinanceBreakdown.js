import React, { useEffect } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    hr: {
        borderTop: '1px solid',
        marginTop: '0.25rem',
        color: '#ebebeb',
        opacity: '90%'
    },
    green: {
        color: 'green',
        margin: '0rem',
        padding: '0rem'
    },
    red: {
        color: 'red',
        margin: '0rem',
        padding: '0rem'
    }
}));

const FinanceBreakdown = props => {
    const classes = useStyles();

    return (
        <React.Fragment>

        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceBreakdown);