import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { AssetLiabilityChart } from './Charts';
import { AssetsPreview } from './Previews';
import Subscriptions from './Subscriptions';
import { FINANCE_PAGE_LOADED } from '../../constants/actionTypes';
import { ContainerAiof } from '../../style/common';

const mapStateToProps = state => ({
  ...state.finance,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  finance: state.finance,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: FINANCE_PAGE_LOADED, payload }),
});

class FinanceMainView extends React.Component {
  componentDidMount() {
    if (this.props.currentUser) {
      this.props.onLoad(Promise.all([
        agent.UserProfile.get(this.props.currentUser.username)
      ]));
    }
  }

  componentWillUnmount() {
  }

  render() {
    const assets = this.props.finance.assets;
    const liabilities = this.props.finance.liabilities;
    const goals = this.props.finance.goals;
    const subscriptions = this.props.finance.subscriptions;

    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} | Finance</title>
        </Helmet>
        <ContainerAiof>
          <AssetLiabilityChart assets={assets} liabilities={liabilities} />
            
          <Subscriptions subscriptions={subscriptions} />

          <AssetsPreview assets={assets} />
        </ContainerAiof>
      </React.Fragment>
    );
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(FinanceMainView);