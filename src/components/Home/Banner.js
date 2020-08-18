import React from 'react';

const Banner = props => {
  if (props.token) {
    return null;
  }
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">
          {props.appName.toLowerCase()}
        </h1>
        <p>All in one finance place</p>
      </div>
    </div>
  );
};

export default Banner;
