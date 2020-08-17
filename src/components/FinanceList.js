import React from 'react';
import AssetPreview from './FinancePreview';

const FinanceList = props => {
  if (props.token) {
    if (!props.assets
      || !props.goals
      || !props.liabilities) {
      return null;
    }

    if (props.assets.length === 0) {
      return (
        <div className="article-preview">
          No assets... yet.
        </div>
      );
    }
    if (props.goals.length === 0) {
      return (
        <div className="article-preview">
          No goals... yet.
        </div>
      );
    }
    if (props.liabilities.length === 0) {
      return (
        <div className="article-preview">
          No liabilities... yet.
        </div>
      );
    }

    return (
      <div>
        {
          props.assets.map(asset => {
            return (
              <AssetPreview asset={asset} />
            );
          })
        }
        <br/>
      </div>
    );
  }

  return null;
};

export default FinanceList;
