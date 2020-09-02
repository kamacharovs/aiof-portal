import React from 'react';
import { AiofBanner, AiofBannerImage } from '../../style/common';

const Banner = props => {
  if (props.token) {
    return null;
  }
  return (
    <AiofBannerImage>
      <AiofBanner>
        <p>All in one finance place</p>
      </AiofBanner>
    </AiofBannerImage>
  );
};

export default Banner;
