import { withStyles, makeStyles, styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';


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
});

export const AiofPaper = styled(Paper)({
  padding: '1rem',
  marginTop: '1rem',
  fontSize: '.8125rem'
});

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
