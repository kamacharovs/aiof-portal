import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Container from '@material-ui/core/Container';


const mapStateToProps = state => {
    return {
        appName: state.common.appName,
        appDescription: state.common.appDescription,
    }
};

const PrivacyPolicy = props => {
    const appName = props.appName.toLowerCase();

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Privacy policy </title>
            </Helmet>

            <Container maxWidth="xl">
                <h1>{appName} Privacy Policy</h1>
                <h3>Effective: November 3, 2020</h3>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, null)(PrivacyPolicy);