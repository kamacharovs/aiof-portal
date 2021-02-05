import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { CoolLink } from '../../style/common';
import { SquarePaper, InBodyPaper } from '../../style/mui';
import House from '../../style/icons/House_4.svg';
import Calculator from '../../style/icons/Calculator.svg';
import mainImage from '../../style/imgs/aiof-main.png';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    marginTop: '1rem'
  },
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

const Banner2 = props => {
  if (props.token) {
    return null;
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <SquarePaper variant="outlined" square>
          <h2>Welcome to <strong>{props.appFullName}</strong></h2>
          We provide personal finance tools and information to make your life easier
        </SquarePaper>
      </Container>

      <Container maxWidth="xl" className={classes.container}>
        <InBodyPaper
          title={"Housing"}
          subTitle={"United States"}
          body={
            <React.Fragment>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <img src={House} alt="House" style={{ maxWidth: "8rem", maxHeight: "8rem" }} />
                </Grid>
                <Grid item xs>
                  <strong>3 surprising facts about mortgages</strong>
                  <ul>
                    <li>Underwriters don't care about your assets</li>
                    <li>Having no credit score can hurt you</li>
                    <li>Your debt ratio isn't based on how much money you bring home</li>
                  </ul>

                  <strong>We can help</strong>
                  <ul>
                    <li><CoolLink to="/property/mortgage" className="nav-link">Mortgage calculator</CoolLink></li>
                  </ul>
                </Grid>
              </Grid>
            </React.Fragment>
          }>
        </InBodyPaper>
      </Container>

      <Container maxWidth="xl" className={classes.container}>
        <InBodyPaper
          title={"Financial independence"}
          subTitle={"United States"}
          body={
            <React.Fragment>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <img src={Calculator} alt="Calculator" style={{ maxWidth: "10rem", maxHeight: "10rem" }} />
                </Grid>
                <Grid item xs>
                  <strong>Benefits of financial independence</strong>
                  <ul>
                    <li>You will be much less stressed out</li>
                    <li>You will have more energy for self-improvement</li>
                    <li>You will have more opportunities to think long term</li>
                    <li>Thinking long term can be beneficial for your investments as well</li>
                  </ul>

                  <strong>We can help with these calculators</strong>
                  <ul>
                    <li><CoolLink to="/fi/time" className="nav-link">Time to Financial Independence (FI)</CoolLink></li>
                    <li><CoolLink to="/fi/added/time" className="nav-link">Added time to Financial Independence (FI)</CoolLink></li>
                    <li><CoolLink to="/fi/compound/interest" className="nav-link">Compound interest</CoolLink></li>
                    <li><CoolLink to="/fi/bmi" className="nav-link">BMI</CoolLink></li>
                    <li><CoolLink to="/fi/coast/savings" className="nav-link">Coast Financial Independence/Retire Early (FIRE)</CoolLink></li>
                  </ul>
                </Grid>
              </Grid>
            </React.Fragment>
          }>
        </InBodyPaper>
      </Container>
    </React.Fragment>
  );
}

export default Banner2;
