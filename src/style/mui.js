import React from 'react';

import { withStyles, makeStyles, styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import { ThinText } from '../style/common';


export const DefaultColor = '#5cb85c';
export const DefaultRedColor = "#b21f00";
export const DefaultGreenColor = 'green';
export const DefaultWhiteColor = '#fafafa';
export const DefaultAlternateColor = "#137a8f";
export const DefaultHrColor = '#ebebeb';
export const DefaultDarkTeal = '#137a8f';

export const commonStyles = makeStyles({
  p: {
    margin: '0rem',
    padding: '0rem',
  },
  inPaper: {
    fontSize: '24px !important',
  },
  inBodyPaperDiv: {
    backgroundColor: DefaultDarkTeal,
    color: '#ffffff',
    padding: '.25rem',
  },
  inBodyPaperBody: {
    fontSize: '14px !important',
    padding: '.25rem',
  },
  inBodyPaperSubTitle: {
    fontSize: '16px !important',
  }
});

export const AiofPaper = styled(Paper)({
  padding: '1rem',
  marginTop: '1rem',
  fontSize: '.8125rem',
});
export const SquarePaper = styled(Paper)({
  padding: '1.5rem',
  marginTop: '1rem',
  fontSize: '.8125rem',
})

export const LoginPaper = styled(Paper)({
  padding: '1rem 4rem 1rem 4rem',
  marginTop: '1rem',
  fontSize: '.8125rem'
});

export const AiofLinearProgress = withStyles({
  root: {
    width: '100%',
    marginTop: '1rem',
    backgroundColor: 'transparent',
  },
  barColorPrimary: {
    backgroundColor: DefaultColor
  }
})(LinearProgress)

const InPaperInternal = styled(Paper)({
  padding: '1rem',
  marginTop: '1rem',
  fontSize: '.8125rem',
});
export const InPaper = props => {
  const classes = commonStyles();

  let prefix = props.prefix ? props.prefix : null;
  let body = props.body ? props.body : "";

  return (
    <React.Fragment>
      <InPaperInternal variant="outlined" square>
        <Grid container spacing={1}>
          <Grid item xs>
            <div>
              {props.title}
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs>
            <div className={classes.inPaper}>
              {prefix}{body}
            </div>
          </Grid>
        </Grid>
      </InPaperInternal>
    </React.Fragment>
  );
}

const InBodyPaperInternal = styled(Paper)({
  paddingBottom: '.5rem',
  fontSize: '.8125rem',
});
export const InBodyPaper = props => {
  const classes = commonStyles();

  let body = props.body ? props.body : "";

  return (
    <React.Fragment>
      <InBodyPaperInternal variant="outlined" square>
        <Grid container spacing={1}>
          <Grid item xs>
            <div className={classes.inBodyPaperDiv}>
              <div className={classes.inBodyPaperSubTitle}><strong>{props.title}</strong></div>
              <ThinText>{props.subTitle}</ThinText>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs>
            <div className={classes.inBodyPaperBody}>
              {body}
            </div>
          </Grid>
        </Grid>
      </InBodyPaperInternal>
    </React.Fragment>
  );
}