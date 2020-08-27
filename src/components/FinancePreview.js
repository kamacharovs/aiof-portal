import React from 'react';
import { RoundBorderBox, TinyPadding } from '../style/common';

export const AssetPreview = props => {
  const asset = props.asset;

  return (
    <RoundBorderBox>
      <TinyPadding>
        <p>
          <b>{asset.name}</b><br />
        </p>
        <p className="text-muted">
          <i>type: </i>{asset.typeName} <br />
          <i>value: </i>${asset.value}
        </p>
      </TinyPadding>
    </RoundBorderBox>
  );
}

export const LiabilityPreview = props => {
  const liability = props.liability;

  return (
    <RoundBorderBox>
      <TinyPadding>
        <p>
          <b>{liability.name}</b><br />
        </p>
        <p className="text-muted">
          <i>type: </i>{liability.typeName} <br />
          <i>value: </i>${liability.value}
        </p>
      </TinyPadding>
    </RoundBorderBox>
  );
}

export const GoalPreview = props => {
  const goal = props.goal;

  return (
    <RoundBorderBox>
      <TinyPadding>
        <p>
          <b>{goal.name}</b><br />
        </p>
        <p className="text-muted">
          <i>type: </i>{goal.typeName} <br />
          <i>amount: </i>${goal.amount} <br />
          <i>current amount: </i>${goal.currentAmount} <br />
          <i>contribution: </i>${goal.contribution} <br />
          <i>contribution frequency: </i>{goal.contributionFrequencyName} <br />
          <i>planned date: </i>{goal.plannedDate}
        </p>
      </TinyPadding>
    </RoundBorderBox>
  );
}
