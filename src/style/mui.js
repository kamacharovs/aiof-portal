import React from 'react';

import { withStyles, makeStyles, styled, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ClipLoader from "react-spinners/ClipLoader";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

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

/* Color palette
  Default = White
  Alt     = Roman Silver
  Alt2    = Royal Blue Light
  Alt3    = Beau Blue
  Alt4    = Green Munsell
  Alt5    = Oxford Blue
  Alt6    = Independence
  Alt7    = Slate Gray
  Alt8    = International Orange Engineering
  Alt9    = Metallic Seaweed
*/
export const ColorDefault = '#FFFFFF';
export const ColorAlt = '#8792a2';
export const ColorAlt2 = '#5469d4';
export const ColorAlt3 = '#d6ecff';
export const ColorAlt4 = '#1ea672';
export const ColorAlt5 = '#1a1f36';
export const ColorAlt6 = '#3c4257';
export const ColorAlt7 = '#697386';
export const ColorAlt8 = '#b21f00';
export const ColorAlt9 = '#137a8f';

export const DefaultPaperPadding = '1.5rem';
export const DefaultPaperMargin = '1rem';
export const DefaultPaperFontSize = '.8125rem';


export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5469d4',
    },
    secondary: {
      main: '#d6ecff',
    },
    error: {
      main: '#b21f00',
    },
    success: {
      main: '#1ea672'
    }
  },
  h1: {
    color: '#697386',
    fontSize: '28px',
    fontWeight: '700',
    lineHeight: '32px',
  },
});

export const commonStyles = makeStyles({
  p: {
    margin: '0rem',
    padding: '0rem',
  },
  inPaper: {
    fontSize: '24px !important',
  },
  inBodyPaperDiv: {
    backgroundColor: ColorAlt9,
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
    color: ColorAlt9
  },
  verticalHeaderRequired: {
    fontSize: '0.75rem',
    color: ColorAlt8,
    padding: '0',
    marginLeft: '2px',
    marginRight: '0',
    marginTop: '0',
    marginBottom: '0',
  },
  altText: {
    color: ColorAlt7,
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '16px',
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
export const BorderlessSquarePaper = styled(Paper)({
  padding: '1rem',
  fontSize: DefaultPaperFontSize,
  borderLeft: 0,
  borderRight: 0,
  borderBottom: 0,
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
Buttons
*/
export const AltButton = styled(Button)({
  background: ColorAlt2,
  color: ColorDefault,
  '&:hover': {
    background: ColorAlt2
  }
})

export const AltCancelButton = props => {
  return (
    <Tooltip title="Cancel">
      <IconButton
        style={{ color: ColorAlt2 }}
        onClick={props.onClick}>
        <ClearIcon />
      </IconButton>
    </Tooltip>
  );
}

export const AltTextButton = props => {
  return (
    <Button
      variant="text"
      size="small"
      onClick={props.onClick}
      style={{
        color: ColorAlt2,
        textTransform: "none"
      }}>
      {props.text}
    </Button>
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


/*
Loaders
*/
export const AltLoader = props => {
  const defaultSize = 50;

  const inProgress = props.inProgress ? props.inProgress : false;
  const size = props.size ? props.size : defaultSize;
  const br = props.br ? props.br : false;
  const color = props.color ? props.color : ColorAlt2;

  return (
    <div className="sweet-loading">
      {br ? <br /> : null}
      <ClipLoader
        size={size}
        color={color}
        loading={inProgress}
      />
    </div>
  );
}


/*
Icons
*/
export const AltCheckCircle = props => {
  const size = props.size ? props.size : 20;

  return (
    <CheckCircleIcon
      style={{ color: ColorAlt4, fontSize: size }} />
  );
}

export const AltClearIcon = props => {
  const size = props.size ? props.size : 20;

  return (
    <ClearIcon
      style={{ color: ColorAlt8, fontSize: size }} />
  );
}


/*
Chips
*/
export const AltChip = props => {
  return (
    <Chip
      size="small"
      label={props.label}
      color="primary"
      style={{ backgroundColor: props.color }} />
  );
}