import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, USER } from '../../constants/common';

const mapStateToProps = state => ({
    ...state.home,
  });
  
  const mapDispatchToProps = dispatch => ({
    
  });

class Charts extends React.Component {
    render() {
        return <h1>Cookie: {Cookies.get(USER)}</h1>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Charts);