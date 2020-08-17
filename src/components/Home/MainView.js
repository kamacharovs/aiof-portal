import FinanceList from '../FinanceList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB, USER_FINANCE } from '../../constants/actionTypes';

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const YourFinanceTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('finance', agent.User.byUsername, agent.User.byUsername(props.currentUser.username));
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'finance' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Finance Feed
        </a>
      </li>
    );
  }
  return null;
}

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.finance,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: USER_FINANCE, tab, pager, payload })
});

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFinanceTab
            token={props.token}
            tab={props.tab}
            currentUser={props.currentUser}
            onTabClick={props.onTabClick} />

        </ul>
      </div>

      <FinanceList
            token={props.token}
            pager={props.pager}
            loading={props.loading}
            assets={props.assets}
            goals={props.goals}
            liabilities={props.liabilities} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
