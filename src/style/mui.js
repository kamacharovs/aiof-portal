import React from 'react';

import { withStyles, makeStyles, styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { ThinText } from '../style/common';


export const DefaultFont = 'Montserrat';
export const DefaultColor = '#5cb85c';
export const DefaultRedColor = "#b21f00";
export const DefaultGreenColor = 'green';
export const DefaultWhiteColor = '#fafafa';
export const DefaultAlternateColor = "#137a8f";
export const DefaultAlternateColor2 = "#00989c";
export const DefaultAlternateColor3 = "#22b59b";
export const DefaultAlternateLinearGradient = "linear-gradient(45deg, #137a8f 90%, #00989c 30%)"
export const DefaultHrColor = '#ebebeb';
export const DefaultDarkTeal = '#137a8f';
export const DefaultWhite = '#ffffff';

export const DefaultPaperPadding = '1.5rem';
export const DefaultPaperMargin = '1rem';
export const DefaultPaperFontSize = '.8125rem';


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
  },
  verticalHeader: {
    fontSize: '0.75rem',
    letterSpacing: '0.000125rem',
    padding: '0',
    margin: '0',
    color: DefaultAlternateColor
  },
  verticalHeaderRequired: {
    fontSize: '0.75rem',
    color: DefaultRedColor,
    padding: '0',
    marginLeft: '2px',
    marginRight: '0',
    marginTop: '0',
    marginBottom: '0',
  }
});

export const AiofPaper = styled(Paper)({
  padding: DefaultPaperPadding,
  marginTop: DefaultPaperMargin,
  fontSize: DefaultPaperFontSize,
});
export const SquarePaper = styled(Paper)({
  padding: DefaultPaperPadding,
  marginTop: DefaultPaperMargin,
  fontSize: DefaultPaperFontSize,
})
export const FullPaper = styled(Paper)({
  paddingLeft: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: DefaultPaperPadding,
  marginLeft: 0,
  marginTop: DefaultPaperMargin,
  marginRight: 0,
  marginBottom: DefaultPaperMargin,
  fontSize: DefaultPaperFontSize,
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

export const AiofCircularProgress = withStyles({
  root: {
    color: DefaultColor
  }
})(CircularProgress)
export const AlternateCircularProgress = withStyles({
  root: {
    color: DefaultAlternateColor
  }
})(CircularProgress)

export const AlternateButton = styled(Button)({
  background: DefaultAlternateColor,
  color: DefaultWhite,
  '&:hover': {
    background: DefaultAlternateColor2
  }
});

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


/*
Vertical layouts
*/
export const VerticalTextField = ({ header, textField, required }) => {
  const classes = commonStyles();

  return (
    <Grid container spacing={1} direction="column" justify="flex-start" alignItems="flex-start">
      <Grid item sm>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" className={classes.verticalHeader} noWrap>
            <strong>{header}</strong>
          </Typography>

          <Typography variant="h6" className={classes.verticalHeaderRequired} noWrap>
            {required ? "*" : null}
          </Typography>
        </div>
      </Grid>
      <Grid item sm>
        {textField}
      </Grid>
    </Grid>
  );
}

export const VerticalSelect = ({ header, select, required }) => {
  const classes = commonStyles();

  return (
    <Grid container spacing={1} direction="column" justify="flex-start" alignItems="flex-start">
      <Grid item sm>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" className={classes.verticalHeader} noWrap>
            <strong>{header}</strong>
          </Typography>

          <Typography variant="h6" className={classes.verticalHeaderRequired} noWrap>
            {required ? "*" : null}
          </Typography>
        </div>
      </Grid>
      <Grid item sm>
        {select}
      </Grid>
    </Grid>
  );
}


/*
Tabs
*/
export const AiofVerticalTabs = withStyles({
  root: {
    alignContent: 'left',
    justifyContent: 'left',
  },
  indicator: {
    backgroundColor: DefaultAlternateColor,
  },
})(Tabs);

export const AiofVerticalTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    '&:hover': {
      color: DefaultAlternateColor,
      opacity: 1,
    },
    '&$selected': {
      color: DefaultAlternateColor,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: DefaultAlternateColor,
    },
  },
  selected: {},
}))((props) => <Tab {...props} />);