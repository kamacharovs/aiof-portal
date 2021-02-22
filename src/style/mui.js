import React from 'react';

import { withStyles, makeStyles, styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';


export const DefaultFont = 'Montserrat';
export const DefaultColor = '#5cb85c';
export const DefaultRedColor = "#b21f00";
export const DefaultGreenColor = 'green';
export const DefaultWhiteColor = '#fafafa';
export const DefaultAlternateColor = "#137a8f";
export const DefaultHrColor = '#ebebeb';

export const commonStyles = makeStyles({
  p: {
    margin: '0rem',
    padding: '0rem',
  },
  inPaper: {
    fontSize: '24px !important',
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