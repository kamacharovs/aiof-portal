import React from 'react';

const Banner = ({ appName, token }) => {
  if (token !== 'undefined') {
    return null;
  }
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">
          {appName.toLowerCase()}
        </h1>
        <p>All in one finance place</p>
      </div>
    </div>
  );
};

export default Banner;
