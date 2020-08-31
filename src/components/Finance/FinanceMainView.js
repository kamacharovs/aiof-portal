import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import agent from '../../agent';
import { AssetLiabilityChart } from './Charts';
import Subscriptions from './Subscriptions';
import { FINANCE_PAGE_LOADED, FINANCE_PAGE_UNLOADED } from '../../constants/actionTypes';
import { ContainerAiof, CoolLink, MutedH2, CustomHr } from '../../style/common';

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
    const subscriptions = this.props.finance.subscriptions;

    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} | Finance</title>
        </Helmet>
        <ContainerAiof>
          <Tabs>
            <TabList>
              <MutedH2>Finance</MutedH2>
              <CustomHr />
              <Tab>Assets vs. Liabilities</Tab>
              <Tab>Subscriptions</Tab>
            </TabList>
            <TabPanel>
              <AssetLiabilityChart assets={assets} liabilities={liabilities} />
            </TabPanel>
            <TabPanel>
              <Subscriptions subscriptions={subscriptions} />
            </TabPanel>
          </Tabs>
        </ContainerAiof>
      </React.Fragment>
    );
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(FinanceMainView);