import React from 'react';
import mainImage from '../../style/imgs/aiof-main.png';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  main: {
    backgroundImage: `url(${mainImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '400px',
  }
}));

const Banner = props => {
  if (props.token) {
    return null;
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.main} />
    </React.Fragment>
  );
};

export default Banner;
