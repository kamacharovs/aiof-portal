import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { SquarePaper, PAlt7 } from '../../style/mui';


const BannerView = props => {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs>
          <SquarePaper variant="outlined" square>
            <Typography variant="h1">Welcome to {props.appFullName}</Typography>
            <PAlt7>
              We provide personal finance tools and information to make your life easier
            </PAlt7>
          </SquarePaper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BannerView;
