import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mapStateToProps = state => ({
    ...state.settings,
    currentUser: state.common.currentUser,
    profile: state.profile.profile
  });
  
  const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({ type: LOGOUT }),
    onSubmitForm: (username, settings) =>
      dispatch({ type: SETTINGS_SAVED, payload: agent.UserProfile.upsert(username, settings) }),
    onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
  });

class AssetEditor extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            typeName: '',
            value: '',
        };

        this.updateState = field => ev => {
            const state = this.state;
            const newState = Object.assign({}, state, { [field]: ev.target.value });
            this.setState(newState);
        };

        this.submitForm = ev => {
            ev.preventDefault();

            const asset = Object.assign({}, this.state);

            asset.name = asset.name ? asset.assets : null;
            asset.typeName = asset.typeName ? asset.typeName : null;
            asset.value = asset.value ? Number(asset.value) : null;

            //this.props.onSubmitForm(this.props.currentUser.username, settings);
        };
    }

    componentDidMount() {
        if (this.props.currentUser && this.props.state) {
            Object.assign(this.state, {
                name: this.props.state.name || '',
                typeName: this.props.state.typeName || '',
                value: this.props.state.value || '',
            });
        }
    }

    componentDidUpdate(nextProps) {
        if (nextProps.currentUser && nextProps.profile) {
            this.setState(Object.assign({}, this.state, {
                name: nextProps.state.name,
                typeName: nextProps.state.typeName,
                value: nextProps.state.value,
            }));
        }
    }

    render() {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetEditor);