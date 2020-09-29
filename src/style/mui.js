import { makeStyles, styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
