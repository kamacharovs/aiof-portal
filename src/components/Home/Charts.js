import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { USER } from '../../constants/common';

const mapStateToProps = state => ({
    ...state.home,
  });
  
  const mapDispatchToProps = dispatch => ({
    
  });

class Charts extends React.Component {
    render() {
        const user = Cookies.get(USER);
        if (user) {
            return null;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Charts);