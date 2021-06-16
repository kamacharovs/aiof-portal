import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { withStyles, makeStyles, useTheme, withTheme, createMuiTheme } from '@material-ui/core/styles';
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
    common: {
      black: '#000',
      white: '#fff'
    },
    primary: {
      main: '#5469d4',
      dark: '#1a1f36',
    },
    secondary: {
      main: '#d6ecff',
      light: '#00989c',
      dark: '#137a8f',
    },
    error: {
      main: '#b21f00',
      light: '#d07866',
    },
    success: {
      main: '#1ea672',
      light: '#78c9aa',
    },
    text: {
      main: '#697386',
      header: '#3c4257',
      default: '#ffffff',
      primary: '#000',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    }
  },
  typography: {
    fontFamily: [
      'Montserrat'
    ].join(','),
    h1: {
      color: '#3c4257',
      fontSize: '28px',
      fontWeight: '700',
      lineHeight: '32px',
      marginBottom: '8px',
    },
    button: {
      textTransform: 'none'
    }
  },
});


export const commonStyles = makeStyles((theme) => ({
  p: {
    margin: '0rem',
    padding: '0rem',
  },
  inPaper: {
    fontSize: '24px !important',
  },
  inBodyPaperDiv: {
    backgroundColor: theme.palette.secondary.dark,
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
    color: theme.palette.secondary.dark
  },
  verticalHeaderRequired: {
    fontSize: '0.75rem',
    color: theme.palette.error.main,
    padding: '0',
    marginLeft: '2px',
    marginRight: '0',
    marginTop: '0',
    marginBottom: '0',
  },
  altText: {
    color: theme.palette.text.main,
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '16px',
  }
}));

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

export const AlternateButton = withTheme(styled(Button)({
  background: props => props.theme.palette.secondary.dark,
  color: props => props.theme.palette.common.white,
  '&:hover': {
    background: props => props.theme.palette.secondary.light
  }
}));

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
              <PAlt7>{props.subTitle}</PAlt7>
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
export const AltCancelButton = props => {
  const theme = useTheme();

  return (
    <Tooltip title="Cancel">
      <IconButton
        style={{ color: theme.palette.primary.main }}
        onClick={props.onClick}>
        <ClearIcon />
      </IconButton>
    </Tooltip>
  );
}

export const AltTextButton = props => {
  const theme = useTheme();

  return (
    <Button
      variant="text"
      size="small"
      onClick={props.onClick}
      style={{
        color: theme.palette.primary.main,
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


/*
Good old styled
*/
export const H5Alt6 = withTheme(styled.h5`
  color: ${props => props.theme.palette.text.header};
  font-size: 14px;
  font-weight: 550;
  line-height: 20px;

  margin-bottom: 6px;
`);

export const PAlt7 = withTheme(styled.p`
  color: ${props => props.theme.palette.text.main};
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`);

export const GreenP = styled.p`
   color: green;
   margin: 0rem;
   padding: 0rem;
`;
export const RedP = styled.p`
   color: red;
   margin: 0rem;
   padding: 0rem;
`;

export const CustomHr = styled.hr`
  width: 90%;
`;
export const Hr50 = styled.hr`
  width: 50% !important;
  opacity: 0.5 !important;
  margin-left: 0px !important;
`;
export const Hr75 = styled.hr`
  width: 75% !important;
  opacity: 0.5 !important;
  margin-left: 0px !important;
`;
export const HrPreview = styled.hr`
  border-top: 1px solid;
  margin-top: 0.25rem;
  color: #ebebeb;
  opacity: 90%;
`;
export const HrFlat = styled.hr`
  width: 50% !important;
  opacity: 0.5 !important;
  padding: 0px !important;
  padding-bottom: 2px !important;
  margin: 0px !important;
`;

export const MutedH2 = styled.h2`
   color: #999 !important;
   margin: 0 0 8px !important;
   text-transform: uppercase;
   font-size: 14px;
`;
export const H1Preview = styled.h1`
   margin: 0 0 8px !important;
   text-transform: uppercase;
   font-size: 1rem;
   font-weight: 900;
`;
export const H1AssetPreview = withTheme(styled.h1`
   margin: 0 0 8px !important;
   text-transform: uppercase;
   font-size: 1rem;
   font-weight: 900;
   color: ${props => props.theme.palette.success.main}
`);
export const H1LiabilityPreview = withTheme(styled.h1`
   margin: 0 0 8px !important;
   text-transform: uppercase;
   font-size: 1rem;
   font-weight: 900;
   color: ${props => props.theme.palette.error.main}
`);


export const AltLink = withTheme(styled(Link)`
  color: ${props => props.theme.palette.primary.main};
  display: inline-block;
  font-size: 12px;
  font-weight: 550;
  line-height: 20px;
  padding: 0px;

  &:hover {
    text-decoration: none;
    color: #00000;
  }
  &:hover::after {
    width: 100%;
    transition: width .3s;
  }

  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }

  &.outer {
    display: block;
  }
`);

export const CoolLink = styled(Link)`
  margin-bottom: 10px;
  display: inline-block;
  color: #000;
  text-decoration: none;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 1px;
    background: #000;
    transition: width .3s;
  };

  &:hover {
    text-decoration: none;
    color: inherit;
  }

  &:hover::after {
    width: 100%;
    transition: width .3s;
  }

  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }

  &.outer {
    display: block;
  }
`;
export const CoolExternalLink = styled.a`
  margin-bottom: 10px;
  display: inline-block;
  color: #000;
  text-decoration: none;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 1px;
    background: #000;
    transition: width .3s;
  };

  &:hover {
    text-decoration: none;
    color: inherit;
  }

  &:hover::after {
    width: 100%;
    transition: width .3s;
  }

  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }

  &.outer {
    display: block;
  }
`;

export const HeaderLink = styled(Link)`
  font-family: titillium web,sans-serif;
  font-size: 1.5rem !important;
  padding-top: 0 !important;
  margin-right: 2rem !important;
  color: ${ColorAlt} !important;
  padding-bottom: 0rem;
  line-height: inherit;
  white-space: nowrap;
  float: left;

  &:hover {
    text-decoration: none;
    color: inherit;
  }

  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;
export const HeaderRightLink = styled(HeaderLink)`
  font-size: 1.25rem !important;
`;

export const RoundBorderBox = styled.div`
  background: #fff;
  display: block;
  border: 1px solid #e8e8e8;
  border-radius: 6px !important;
  box-shadow: 0 8px 14px 0 rgba(0,0,0,.06);
  min-width: 264px;
  margin-bottom: 0.5rem;
`;
export const RoundGrayBorderBox = styled.div`
  background: #ebebeb;
  display: block;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  box-shadow: 0 8px 14px 0 rgba(0,0,0,.06);
  min-width: 264px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 0.5rem;
`;
export const RoundBorderBoxText = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;
export const AiofBox = styled.div`
  background: #fff;
  display: block;
  border: 1px solid #e8e8e8;
  border-radius: 6px !important;
  box-shadow: 0 8px 14px 0 rgba(0,0,0,.06);
  min-width: 264px;
  margin-bottom: 0.5rem;
  padding: 1rem;
`;


export const TinyPadding = styled.div`
  padding: 0.25rem;
`;

export const AiofBannerImage = styled.div`
  background-color: ${ColorAlt4};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 128px;
  z-index: 1;
  text-align: left;
`;
export const AiofBanner = styled.div`
  background-color: ${ColorAlt4};
  padding: 3rem;
  padding-top: 10rem;
  margin-bottom: 1rem;
  font-weight: 900;

  position: relative;
  top: 0;
  left: 0;
  transform: skewy(3deg);
  right: 0;
  height: 300px;
  z-index: 2;
`;

export const ThinText = styled.p`
  font-weight: 100;
`;

export const AiofToastContainer = withTheme(styled(ToastContainer)`
  width: 100%;
  margin: 0px;
  padding: 0px;
  font-size: 0.75rem;

  .Toastify__toast-container {
    position: fixed;
    margin: 0px;
  }
  .Toastify__toast {
    border-radius: 0px;
    margin: 0px;
  }
  .Toastify__toast--error {
    background-color: ${props => props.theme.palette.error.main}
  }
  .Toastify__toast--warning {}
  .Toastify__toast--success {
    background-color: ${props => props.theme.palette.success.main}
  }
  .Toastify__toast-body {}
  .Toastify__progress-bar {}
`);