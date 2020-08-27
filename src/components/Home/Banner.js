import React from 'react';
import { AiofBanner } from '../../style/common';

const Banner = props => {
  if (props.token) {
    return null;
  }
  return (
    <AiofBanner>
        <h1>
          {props.appName.toLowerCase()}
        </h1>
        <p>All in one finance place</p>
    </AiofBanner>
  );
};

export default Banner;
